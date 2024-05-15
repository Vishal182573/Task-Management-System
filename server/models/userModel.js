import { Schema, model } from "mongoose";
const userSchema = new Schema({
  userId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
  address: {
    type: String,
  },
  contact: {
    type: String,
  },
  photographUri: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
export default model("User", userSchema);
