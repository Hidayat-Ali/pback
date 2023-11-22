const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const cateRoute = require("./routes/categories");
dotenv.config();
const corsOptions = {
  origin: ["https://pfront.onrender.com", "http://localhost:4200"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", cateRoute);
console.log("Before MongoDB connection attempt");
const url =
  process.env.MONGODB_URI ||
  "mongodb+srv://HidayatAli:hidayatdb121@cluster0.hqjmbvx.mongodb.net/?retryWrites=true&w=majority";

const port = process.env.PORT || 3000;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log("Backend is running");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
console.log("After attempting MongoDB connection");
