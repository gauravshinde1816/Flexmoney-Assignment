const express = require("express");
const paymentModel = require("../models/payment.model");
const userModel = require("../models/user.model");
const router = express.Router();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// @Route :  "/api/users"
// @Access:  Public
// @Desc  :  Get All users in the Database

router.get("/users", async (req, res) => {
  try {
    let users = await userModel.find({});

    return res.json(users);
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ msg: "Internal server error" });
  }
});

// @Route :  "/api/users/:userid"
// @Access:  Public
// @Desc  :  Get  user Details in the Database

router.get("/users/:userid", async (req, res) => {
  try {
    const userid = req.params["userid"];
    let user = await userModel.findById(userid);

    if (!user) {
      return res.status(400).json({ msg: "User Does not exists" });
    }
    return res.json(user);
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ msg: "Internal server error" });
  }
});

// @Route :  "/api/payments"
// @Access:  Public
// @Desc  :  Get All Payments in the Database

router.get("/payments", async (req, res) => {
  try {
    let payments = await paymentModel.find({});

    return res.json(payments);
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ msg: "Internal server error" });
  }
});

// @Route :  "/api/register"
// @Access:  Public
// @Desc  :  Register for new Yoga Class
router.post("/register", async (req, res) => {
  const { name, email, age, batch } = req.body;

  let user = await userModel.findOne({ Email: email });

  if (user) {
    // user cannot register same class in same month two times
    let currMonth =
      months[new Date(String(user.YogaClass.DateOfRegistration)).getMonth()] +
      " / " +
      new Date(String(user.YogaClass.DateOfRegistration)).getFullYear();
    let m = months[new Date().getMonth()] + " / " + new Date().getFullYear();

    if (m === currMonth) {
      return res.status(400).json({
        msg: `${user._id} has already registered for Yoga Class for ${currMonth} month`,
      });
    }
  }

  if (age < 18 || age > 65) {
    return res.status(400).json({ msg: "Please enter the age in Given Range" });
  }

  user = new userModel({
    Name: name,
    Email: email,
    Age: age,
  });

  user.YogaClass.Batch = batch;

  await user.save();

  return res.json({ user: user , SuccessMessage:`${email} has successfully registered` });
});

// @Route :  "/api/payments/:userid"
// @Access:  Public
// @Desc  :  Make payment for current month
router.post("/payments/:userid", async (req, res) => {
  try {
    const user_id = req.params["userid"];

    let user = await userModel.findById(user_id);
    let payments = await paymentModel.findOne({ user: user_id });

    if (!user) {
      return res.status(400).json({ msg: "User Does not exists" });
    }

    // find payment details for a month using month + year combination
    let batchRegistration = new Date(String(user.YogaClass.DateOfRegistration));
    let paymentDate =
      months[batchRegistration.getMonth()] +
      " / " +
      batchRegistration.getFullYear();

    console.log(payments);

    // user has done any previous payments
    if (payments) {
      let paymentForMonth = payments.Payments.find(
        (p) => p.paymentDetails.date === paymentDate
      );

      console.log(paymentForMonth);

      // payment done already
      if (paymentForMonth) {
        return res.status(400).json({
          msg: `${user.Email} has already done payment for month ${paymentDate}`,
        });
      }
      payments.Payments.unshift({
        paymentDetails: {
          date: paymentDate,
          amountPaid: 500,
        },
      });
      await payments.save();

      return res.json({
        Invoice: { user: user._id, amount: 500, "Date of Payment": new Date() },
        SuccessMessage: `${user.Email} has successfully completed the payment for ${paymentDate}`,
      });
    }

    // user did payment first time
    payments = new paymentModel({
      user: user_id,
    });
    payments.Payments.unshift({
      paymentDetails: {
        date: paymentDate,
        amountPaid: 500,
      },
    });
    await payments.save();

    return res.json({
      Invoice: { user: user._id, amount: 500, "Date of Payment": new Date() },
    });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ msg: "Internal server error" });
  }
});

// @Route :  "/api/changeBatch/:userid"
// @Access:  Public
// @Desc  :  Change batch for Yoga class
router.post("/changeBatch/:userid", async (req, res) => {
  try {
    const { batch } = req.body;
    const user_id = req.params["userid"];

    let d = months[new Date().getMonth()] + " / " + new Date().getFullYear();

    let user = await userModel.findById(user_id);
    if (!user) {
      return res.status(400).json({ msg: "User Does not exists" });
    }

    let batchRegistration = new Date(String(user.YogaClass.DateOfRegistration));
    let currDate =
      months[batchRegistration.getMonth()] +
      " / " +
      batchRegistration.getFullYear();

    if (d === currDate) {
      return res.status(400).json({
        msg: `user ${user.Email} cannot change batch for current month`,
      });
    }

    // register for new batch in new month
    user.YogaClass.Batch = batch;
    user.YogaClass.DateOfRegistration = new Date();

    await user.save();

    return res.json({
      SuccessMessage: `${user.Email} has change the batch to ${batch} for ${d}`,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Internal server error" });
  }
});
module.exports = router;
