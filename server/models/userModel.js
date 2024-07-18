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
  workingAddress: {
    type: Object,
  },
  contact: {
    type: String,
  },
  photograph: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  institute: {
    type: String,
    required: true
  }
});

export default model("User", userSchema);
