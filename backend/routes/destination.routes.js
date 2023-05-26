//All Destination related routes

//import dependencies
const router = require("express").Router();
const {getAllDestinations} = require("../controllers/destination.controller")

// route to fetch all the destinations present in database
router.get("/", getAllDestinations);

module.exports = router;