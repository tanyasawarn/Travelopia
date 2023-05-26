//import services
const TravelHistoryService = require("../services/travelHistory.service");

//instansiate TravelHistoryService class to use the service layer functions
const travelHistoryService = new TravelHistoryService();

//controller to get all the travel history of all users
const getUsersTravelHistory = async (req, res) => {
  try {
    const users = await travelHistoryService.getUsersTravelHistory();
    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

//controller to get travel history of a user whose id is given
const getUsersTravelHistoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await travelHistoryService.getUsersTravelHistoryById(id);
    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

//controller to create a new booking for the user
const createUserTravelHistory = async (req, res) => {
  try {
    const user = await travelHistoryService.createUserTravelHistory(req.body);
    return res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  getUsersTravelHistory,
  getUsersTravelHistoryById,
  createUserTravelHistory,
};
