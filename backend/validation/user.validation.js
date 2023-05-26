// import dependencies
const Joi = require("joi");

/*
User input Schema:
- Name
- Email address
- Destination: India, Africa, Europe...
- Travellers Count
- Budget: Per Person (currency should be in dollars)
*/

const usersTravelHistorySchema = Joi.object().keys({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  destinationName: Joi.string().required(),
  pricePerPerson: Joi.number().required(),
  numberOfPersons: Joi.number().integer().min(1).required(),
});

module.exports = usersTravelHistorySchema;
