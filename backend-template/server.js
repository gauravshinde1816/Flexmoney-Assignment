const express = require("express");
const cors = require("cors")
const app = express();
const connectDB = require("./config/db");
const indexRoutes = require("./routes/index");

//middleware
app.use(cors())
app.use(express.json());

//connect to database
connectDB();

//routes
app.use("/api", indexRoutes);

//listen to PORT
const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
