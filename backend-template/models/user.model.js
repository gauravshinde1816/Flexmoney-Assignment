const mongoose = require("mongoose");

const BATCH_1 = "6-7(AM)";
const BATCH_2 = "7-8(AM)";
const BATCH_3 = "8-9(AM)";
const BATCH_4 = "5-6(PM)";

const UserSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String , 
      required : true
    },
    Age: {
      type: Number,
      required: true,
    },

    YogaClass: {
      Batch: {
        type: String,
        enum: [BATCH_1, BATCH_2, BATCH_3, BATCH_4],
        default: BATCH_1,
      },
      DateOfRegistration: {
        type: Date,
        default: new Date(),
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
