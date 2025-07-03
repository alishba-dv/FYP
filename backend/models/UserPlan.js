const mongoose = require("mongoose");

const UserPlanSchema = new mongoose.Schema({
  subscription: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  startDate: { type: Date, default: Date.now },
  expiryDate: Date,
 
  autoRenew: { type: Boolean, default: true }

});

module.exports = mongoose.model("UserPlan", UserPlanSchema);
