import { Schema, model } from 'mongoose';
const commentSchema = new Schema({
  taskId: {
    type: String,
    required: true,
  },
  comments: {
    type: [
      {
        userId: {
          type: String,
        },
        name: {
          type: String,
        },
        comment: {
          type: String,
        },
        created: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
});

export default model('Comment', commentSchema);
