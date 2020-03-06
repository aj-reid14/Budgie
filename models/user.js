let mongoose = require("mongoose")
let schema = mongoose.Schema
import User from "../components/Form";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  //give different access rights if admin or not 
  isAdmin: Boolean
});

let User = mongoose.model("User",UserSchema)
