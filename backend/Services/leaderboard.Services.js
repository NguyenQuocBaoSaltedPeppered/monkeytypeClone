const User = require("../Models/user.models");
const History = require("../Models/history.models");

const leaderboardService = {
  getLeaderboard: async (playmode) => {
    try {
      const ldb = await History.aggregate([
        { $match: { mode: playmode } },
        {
          $group: {
            _id: "$userID",
            wpm: { $max: "$wpm" },
            raw: { $max: "$raw" },
            acc: { $max: "$accuracy" },
          },
        },
        {
          $sort: { wpm: -1 },
        },
        { $limit: 10 },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "player_info",
          },
        },
        {
          $project: {
            wpm: 1,
            raw: 1,
            acc: 1,
            player_info: {
              username: 1,
            },
          },
        },
      ]);
      return ldb;
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = leaderboardService;
