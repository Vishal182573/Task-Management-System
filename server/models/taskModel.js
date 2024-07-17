import { Schema, model } from "mongoose";
const taskSchema = new Schema({
  taskId: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  assignedTo: {
    type: String,
  },
  status: {
    type: String,
  },
  startingDate: {
    type: Date,
  },
  endingDate: {
    type: Date,
  },
  request:{
    type:Boolean,
    default:false,
  },
  days:{
    type:Number,
  },
  completionRequest:{
    type:Boolean,
    default:false,
  },
  completionRequestMessage:{
    type:String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default model("Task", taskSchema);
