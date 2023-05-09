const User = require("../Models/user.models");

const userService = {
  findAllUser: async () => {
    try {
      const userList = await User.find();
      return userList;
    } catch (err) {
      console.log(err);
    }
  },
  deleteUser: async (deletedUserID) => {
    try {
      const user = await User.findByIdAndRemove(deletedUserID);
      return user;
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = userService;
