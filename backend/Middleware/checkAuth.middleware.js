const jwt = require("jsonwebtoken");
const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} = require("http-status-codes");
const { body, validationResult } = require("express-validator");

const checkAuth_middleware = {
  validateUser: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ReasonPhrases.BAD_REQUEST);
    } else {
      next();
    }
  },
  verifyToken: (req, res, next) => {
    //Get token from user
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          return res
            .status(StatusCodes.FORBIDDEN)
            .json(ReasonPhrases.FORBIDDEN);
        }
        req.user = user;
        next();
      });
    } else {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(ReasonPhrases.UNAUTHORIZED);
    }
  },
  verifyTokenAndAdminAuth: (req, res, next) => {
    checkAuth_middleware.verifyToken(req, res, () => {
      if (req.user?.id == req.params.id || req.user?.admin) {
        next();
      } else {
        return res.status(StatusCodes.FORBIDDEN).json(ReasonPhrases.FORBIDDEN);
      }
    });
  },
};
module.exports = checkAuth_middleware;
