//import services
const DestinationService = require("../services/destination.service");

//instansiate DestinationService class to use the service layer functions
const destinationService = new DestinationService();

//controller to get all destinations
const getAllDestinations = async (req, res) => {
  try {
    const destinations = await destinationService.getAllDestinations();
    return res.status(200).json({ destinations });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { getAllDestinations };
