const User = require("../Models/user.models");
const History = require("../Models/history.models");
const mongoose = require("mongoose");
function LengthOf(obj_arr) {
  let result = 0;
  for (let prop in obj_arr) {
    if (obj_arr.hasOwnProperty(prop)) {
      result++;
    }
  }
  return result;
}
const castUserId = (userId) => mongoose.Types.ObjectId(userId);

const historyService = {
  saveHistory: async (newHistory) => {
    const checkID = await User.findOne({ _id: newHistory.userID });
    if (!checkID) return false;
    const { userID, mode, wpm, raw, accuracy } = newHistory;
    const newPlay = await new History({ userID, mode, wpm, raw, accuracy });
    const playHistory = await newPlay.save();
    return playHistory;
  },
  checkHistory: async (profileID) => {
    const isHistoryExist = await History.findOne({ userID: profileID });
    if (!isHistoryExist) return false;
    return true;
  },
  testCompleted: async (profileID) => {
    try {
      const testCompleted = LengthOf(await History.find({ userID: profileID }));
      return testCompleted;
    } catch (err) {
      console.log(err);
    }
  },
  findHistory: async (profileID) => {
    try {
      const profile = await History.aggregate([
        { $match: { userID: castUserId(profileID) } },
        { $sort: { mode: 1, wpm: -1 } },
        {
          $group: {
            _id: "$mode",
            wpm: { $max: "$wpm" },
            raw: { $max: "$raw" },
            acc: { $max: "$accuracy" },
          },
        },
      ]);
      return profile;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  latestPlay: async (profileID) => {
    const latest = await History.aggregate([
      { $match: { userID: castUserId(profileID) } },
      { $sort: { createAt: -1 } },
    ]);
    return latest[0];
  },
};

module.exports = historyService;
