//import models
const { Destination } = require("../models/destination.model");
const User = require("../models/user.model");

class TravelHistoryService {
  //function to create new booking history of a user on form submit
  async createUserTravelHistory(data) {
    console.log(data);
    const { name, email, destinationName, pricePerPerson, numberOfPersons } =
      data;

    console.log(name);
    console.log(email);
    console.log(destinationName);
    console.log(pricePerPerson);
    console.log(numberOfPersons);

    try {
      let user = await User.findOne({
        name: name,
        email: email,
      }).populate("travelHistory.destination");

      console.log("before saving into user");
      console.log(user);

      let destination = await Destination.findOne({ name: destinationName });

      if (!destination) {
        // If the destination doesn't exist, create a new Destination object and save it to the database
        destination = await Destination.create({
          name: destinationName,
          pricePerPerson,
        });
      }

      if (user) {
        // If the user already exists, add a new booking for the destination
        const newTravelHistory = {
          destination: destination._id,
          numberOfPersons,
        };
        user.travelHistory.push(newTravelHistory);
        user = await user.save();
        return user;
      }

      // If the user doesn't exist, create a new user object with the given information
      const newTravelHistory = {
        destination: destination._id,
        numberOfPersons,
      };
      user = await User.create({
        name,
        email,
        travelHistory: [newTravelHistory],
      });
      return user;
    } catch (error) {
      console.error(error);
      throw new Error("Internal server error.");
    }
  }

  //function to list down all the travel histories of all users
  async getUsersTravelHistory() {
    try {
      const users = await User.find().populate(
        "travelHistory.destination",
        "name pricePerPerson"
      );
      return users;
    } catch (error) {
      console.error(error);
      throw new Error("Internal server error.");
    }
  }

  //function to fetch a user travel history based on id
  async getUsersTravelHistoryById(id) {
    try {
      const user = await User.findById(id).populate(
        "travelHistory.destination",
        "name pricePerPerson"
      );
      return user;
    } catch (error) {
      console.error(error);
      throw new Error("Internal server error.");
    }
  }
}

module.exports = TravelHistoryService;
