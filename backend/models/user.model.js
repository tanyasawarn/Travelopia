const mongoose = require("mongoose");

/* 
User Schema consists of:
- User Name
- User Email
- User Travel Histories (Array of Travel data)

Travel Schema consists of:
- Destination Schema: (Destination Model is referred from Destination Schema)
  o Destination Name
  o Price Per Person

- Number of Person
- Timestamp
*/

const TravelHistorySchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },
    numberOfPersons: { type: Number, required: true },
  },
  { _id: false, autoIndex: false, timestamps: true }
);

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  travelHistory: [TravelHistorySchema],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
