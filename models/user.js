const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
