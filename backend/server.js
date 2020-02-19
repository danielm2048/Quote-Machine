const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const quotesRouter = require("./routes/quotes");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const likesRouter = require("./routes/likes");

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/api/quotes", quotesRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/likes", likesRouter);

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
