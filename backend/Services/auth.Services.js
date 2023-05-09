const User = require("../Models/user.models");
const validator = require("validator");
const jwt = require('jsonwebtoken');
const authService = {
  validateUsername: async (newUsername) => {
    const isExist = await User.findOne({ username: newUsername });
    if (isExist) return false;
    const isValid = await validator.matches(newUsername, "^[a-zA-Z0-9_.-]*$");
    if (!isValid) return false;
    return true;
  },
  createUser: async (newUser) => {
    try {
      const salt = await bcrypt.genSalt(10); //HashPassword
      const hashed = await bcrypt.hash(newUser.password, salt);
      // Create newUser in Database
      const setUser = new User({
        username: newUser.username,
        email: newUser.email,
        password: hashed,
        isAdmin: newUser.isAdmin,
      });
      setUser.save();
      return setUser;
    } catch (err) {
      console.log(err);
    }
  },
  findByEmail: async (reqEmail) => {
    try {
      const isUser = await User.findOne({ email: reqEmail });
      return isUser;
    } catch (err) {
      console.log(err);
    }
  },
  filterByToken: async (listToken, typeToken) => {
    try {
      let listNewToken = [];
      listNewToken = listToken.filter((token) => token !== typeToken);
      return listNewToken;
    } catch (err) {
      console.log(err);
    }
  },
  generateToken: async (user, keyOfToken, TTL) => {
    const jwtSign = jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      keyOfToken,
      { expiresIn: TTL }
    );
    return jwtSign;
  },
};

module.exports = authService;
