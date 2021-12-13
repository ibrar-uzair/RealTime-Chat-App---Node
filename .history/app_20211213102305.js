// --------------------------------> Imports
const io = require("socket.io");
const path = require("path");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");
const flash = require("connect-flash");
const errors = require("./controllers/errors");
const app = express();
const MONGODB_URI =
  "mongodb+srv://uzair:uzair@cluster0.wgjvm.mongodb.net/RealTimeChatApp?retryWrites=true&w=majority";
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "session",
});
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(authRoutes);
app.use(chatRoutes);

app.use(errors.pageNotFound);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log("Server started at port number 3000");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
