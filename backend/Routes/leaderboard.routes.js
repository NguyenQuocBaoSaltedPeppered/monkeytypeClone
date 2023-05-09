const leaderboardController = require("../Controllers/leaderBoard.Controllers");
const router = require("express").Router();

router.get("/", leaderboardController.leaderboard);

module.exports = router;
