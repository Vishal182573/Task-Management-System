import Comment from '../models/commentModel.js';
import asyncHandler from 'express-async-handler';
// Add a new comment to a task
export const addComment = asyncHandler(async (req, res) => {
  const { taskId, userId, name, comment } = req.body;

  try {
    let taskComments = await Comment.findOne({ taskId });

    if (taskComments) {
      taskComments.comments.push({ userId, name, comment });
    } else {
      taskComments = new Comment({
        taskId,
        comments: [{ userId, name, comment }],
      });
    }

    await taskComments.save();
    res.status(200).json(taskComments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Get all comments for a task
export const getAllComments = asyncHandler(async (req, res) => {
  const { taskId } = req.query;

  try {
    const taskComments = await Comment.findOne({ taskId });

    if (taskComments) {
      res.status(200).json(taskComments);
    } else {
      res.status(200).json({ comments: [] }); // Change this line
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve comments' });
  }
});
