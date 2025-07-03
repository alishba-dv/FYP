const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  name: String,
  price: String,
  features: [String],
  productGroup: [
    {
      _id: false,
      name: String,
      products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
    },
  ],
  timeFrame: { type: String, default: "Monthly" },
  autoRenew: { type: Boolean, default: true }

});

module.exports = mongoose.model("Subscription", SubscriptionSchema);
