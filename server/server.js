import express, { json } from "express";
import connectDb from "./config/dbConnection.js";
import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import instituteRoutes from "./routes/instituteRoutes.js";

connectDb();
const app = express();
const port = 3001;

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

// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
