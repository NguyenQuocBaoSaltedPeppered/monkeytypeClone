const message = require("../config/message.config.json");
const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} = require("http-status-codes");
const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const authService = require("../Services/auth.Services");
dotenv.config();

let refreshTokens = [];
const authController = {
  //CHECKUSERNAME
  checkusername: async (req, res) => {
    const validateResult = await authService.validateUsername(
      req.body.username
    );
    if (!validateResult) {
      return res.status(StatusCodes.CONFLICT).json(false);
    } else {
      return res.status(StatusCodes.OK).json(true);
    }
  },
  //REGISTER
  authRegister: async (req, res) => {
    try {
      const user = await authService.createUser(req.body);
      return res.status(StatusCodes.OK).json(user);
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
      console.log(err);
    }
  },

  //LOGIN
  Login: async (req, res) => {
    try {
      const isUserExisted = await authService.findByEmail(req.body.email);
      if (!isUserExisted) {
        return res.status(StatusCodes.FORBIDDEN).json(message.WRONG_EMAIL);
      }
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        isUserExisted.password
      );
      if (!isValidPassword) {
        return res.status(StatusCodes.FORBIDDEN).json(message.WRONG_PASSWORD);
      }
      if (isUserExisted && isValidPassword) {
        const accessToken = await authService.generateToken(
          isUserExisted,
          process.env.JWT_ACCESS_KEY,
          process.env.ACCESS_TOKEN_TTL
        );
        const refreshToken = await authService.generateToken(
          isUserExisted,
          process.env.JWT_REFRESH_KEY,
          process.env.REFRESH_TOKEN_TTL
        );
        refreshTokens.push(refreshToken); //Save refreshToken to Database
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...others } = isUserExisted._doc;
        return res.status(StatusCodes.OK).json({ ...others, accessToken });
      }
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
  },

  //REFRESH TOKEN
  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(ReasonPhrases.UNAUTHORIZED);
    if (!refreshTokens.includes(refreshToken)) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json(message.REFRESH_TOKEN_NOT_VALID);
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {
      //Filter old refreshToken
      refreshTokens = await authService.filterByToken(
        refreshTokens,
        refreshToken
      );
      //Create new accessToken and refreshToken
      const newAccessToken = await authService.generateToken(
        user,
        process.env.JWT_ACCESS_KEY,
        process.env.ACCESS_TOKEN_TTL
      );
      const newRefreshToken = await authService.generateToken(
        user,
        process.env.JWT_REFRESH_KEY,
        process.env.REFRESH_TOKEN_TTL
      );
      //Add newRefresh Token to Database
      refreshTokens.push(newRefreshToken);
      //Save to Cookies
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      return res.status(StatusCodes.OK).json({ accessToken: newAccessToken });
    });
  },

  //LOGOUT
  Logout: async (req, res) => {
    res.clearCookie("refreshToken"); //delete refreshToken when user logout
    refreshTokens = await filterByToken(
      refreshTokens,
      req.cookies.refreshToken
    );
    res.status(StatusCodes.OK).json(message.LOGGED_OUT);
  },
};

module.exports = authController;
