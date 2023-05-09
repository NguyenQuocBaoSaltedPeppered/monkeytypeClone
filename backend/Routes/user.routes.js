const userController = require("../Controllers/user.Controllers");
const middlewareController = require("../Middleware/checkAuth.middleware");
const authController = require("../Controllers/auth.Controllers");
//All function of User
const router = require("express").Router();

//GET ALL USER
router.get("/", middlewareController.verifyToken, userController.getAllUsers);

//DELETE USER
router.delete(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  userController.deleteUser
);
router.post("/history", userController.historyUpdate);

//GET PROFILE
router.get("/:userID", userController.getProfile);
module.exports = router;
