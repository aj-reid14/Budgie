const router = require("express").Router();
const userController = require("../../controllers/userController.js");

router.route("/")
  .get(userController.findAll)
  .post(userController.create);

  router.route("/login")
  .post(userController.login);

  router.route("/register")
  .post(userController.register);

  router.route("/budget/:id")
  .get(userController.findById);

  router.route("/:username")
  .post(userController.create);

router
// .get(verifuyTokr, userController.findById)
.route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;
