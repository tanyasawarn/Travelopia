const mongoose = require("mongoose");

/* 
Destination is a sepearte collection that holds information about different destinations
Schema consists of:
 
- Destination name
- Price Per Person
*/

const DestinationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  pricePerPerson: { type: Number, required: true },
});

const Destination = mongoose.model('Destination', DestinationSchema);

module.exports = {DestinationSchema, Destination}
