const authController = require("../Controllers/auth.Controllers");
const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const middlewareController = require("../Middleware/checkAuth.middleware");

//VERIFY USERNAME
router.post("/verify", authController.checkusername);

//REGISTER
router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 4 }),
  middlewareController.validateUser,
  authController.authRegister
);
//LOGIN
router.post("/login", authController.Login);

//REFRESH
router.post("/refresh", authController.requestRefreshToken);

//LOGOUT
router.post("/logout", middlewareController.verifyToken, authController.Logout);

module.exports = router;
