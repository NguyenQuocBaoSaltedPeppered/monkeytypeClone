const message = require("../config/message.config.json");
const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} = require("http-status-codes");
const userService = require("../Services/user.Services");
const historyService = require("../Services/history.Services");
const userController = {
  //GET ALL USERS
  getAllUsers: async (req, res) => {
    try {
      const userList = await userService.findAllUser();
      res.status(StatusCodes.OK).json(userList);
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  //DELETE USER
  deleteUser: async (req, res) => {
    try {
      const user = await userService.deleteUser(req.params.id);
      return res.status(StatusCodes.OK).json(message.DELETE_USER_SUCCESS);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  //ADD NEW PLAY TO HISTORY
  historyUpdate: async (req, res) => {
    try {
      const newPlay = await historyService.saveHistory(req.body);
      if (!newPlay)
        return res
          .status(StatusCodes.NOT_FOUND)
          .json(message.USER_ID_NOT_EXIST);
      return res.status(StatusCodes.OK).json(newPlay);
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
      console.log(err);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
  },
  //GET PROFILE
  getProfile: async (req, res) => {
    try {
      const profileID = req.params.userID;
      const isHistoryExist = await historyService.checkHistory(profileID);
      if (!isHistoryExist)
        return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
      const testCompleted = await historyService.testCompleted(profileID);
      const userBestPlay = await historyService.findHistory(profileID);
      const userLatestPlay = await historyService.latestPlay(profileID);
      return res
        .status(StatusCodes.OK)
        .json({ testCompleted, userBestPlay, userLatestPlay });
    } catch (err) {
      console.log(err);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
  },
};

module.exports = userController;
