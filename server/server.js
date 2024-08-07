import express, { json } from "express";
import connectDb from "./config/dbConnection.js";
import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/TaskRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import instituteRoutes from "./routes/instituteRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

connectDb();
const app = express();
const port = 3002;

app.use(json());
app.use(cors());
app.get("/api/test", (req, res) =>
  res.json({
    message: "API sahi kaam kr rhi hai balak, frontend me dikkat hai :)",
  })
);

app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/institute", instituteRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/comment', commentRoutes);

// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
