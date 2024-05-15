import { Schema, model } from "mongoose";
const instituteSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  logo: {
    type: String,
  },
  nodalOfficer: {
    type: String,
  },
  reportingOfficer: {
    type: String,
  },
  tasks: {
    type: [String],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default model("Institute", instituteSchema);
