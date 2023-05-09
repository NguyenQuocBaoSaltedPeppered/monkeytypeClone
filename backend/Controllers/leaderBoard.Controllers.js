const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} = require("http-status-codes");
const leaderboardService = require("../Services/leaderboard.Services");
const leaderboardController = {
  leaderboard: async (req, res) => {
    try {
      const timerLdb = await leaderboardService.getLeaderboard("time");
      const wordLdb = await leaderboardService.getLeaderboard("word");
      return res.json({ timerLdb, wordLdb }).status(StatusCodes.OK);
    } catch (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
  },
};

module.exports = leaderboardController;
