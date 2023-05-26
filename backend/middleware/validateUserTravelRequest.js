//Middleware function that validates user requests against a Joi schema
const usersTravelHistorySchema = require("../validation/user.validation");

function validateCreateUserTravelHistory(req, res, next) {
  const { error } = usersTravelHistorySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
  }

  module.exports = {validateCreateUserTravelHistory};
