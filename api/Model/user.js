const mongoose = require("mongoose");
const roles = require("../configs/rolesList");
const { Schema } = mongoose;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    user: {
      type: Number,
      default: roles.user,
    },
    editor: Number,
    admin: Number,
  },
  refreshToken: [
    {
      type: String,
    },
  ],
});
module.exports = mongoose.model("USER", userSchema);
