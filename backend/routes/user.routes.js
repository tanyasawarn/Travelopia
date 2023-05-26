const router = require("express").Router();
const {validateCreateUserTravelHistory} = require("../middleware/validateUserTravelRequest");
const {getUsersTravelHistory, getUsersTravelHistoryById, createUserTravelHistory} = require("../controllers/user.controller")

router.get("/", getUsersTravelHistory);

router.get("/:id", getUsersTravelHistoryById);

router.post("/create/travel-history", validateCreateUserTravelHistory, createUserTravelHistory)

module.exports = router;