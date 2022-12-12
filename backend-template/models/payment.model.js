const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  Payments: [
    {
      paymentDetails: {
        date: {
            type: String
        },
        amountPaid: {
          type: Number,
        },
      },
    },
  ],
});

module.exports = mongoose.model("payments", paymentSchema);
