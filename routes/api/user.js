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
  .get(userController.findByUsername)
  .post(userController.create)
  .put(userController.addBudget);

  router.route("/:username/:budgetName")
  .get(userController.addTransaction)
  .delete(userController.deleteBudget);
  
router
// .get(verifuyTokr, userController.findById)
.route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;
