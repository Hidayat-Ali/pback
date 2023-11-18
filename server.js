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
  origin: "http://localhost:4200",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
const url =
  process.env.MONGODB_URI ||
  "mongodb+srv://HidayatAli:hidayatdb121@cluster0.hqjmbvx.mongodb.net/";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", cateRoute);
const port = process.env.PORT || 3000;
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("frontend/build"));
// }
app.listen(port, () => {
  console.log("backend is running");
});
