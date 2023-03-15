const mongoose = require("mongoose");

// const handpickedSchema = mongoose.Schema({

// });

const signUpSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String },
  password: { type: String },
  username: { type: String },
  mobile: { type: Number, length: 10 },
});

module.exports = mongoose.model("SignUpSchema", signUpSchema);
