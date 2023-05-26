//import models
const { Destination } = require("../models/destination.model");

class DestinationService {
  async getAllDestinations() {
    try {
      const destinations = await Destination.find({});
      return destinations;
    } catch (error) {
      console.error(error);
      throw new Error("Internal server error.");
    }
  }
}

module.exports = DestinationService;
