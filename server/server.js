const express = require('express');
const connectDb = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');

connectDb();
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.get('/api/test', (req, res) =>
  res.json({
    message: 'API sahi kaam kr rhi hai balak, frontend me dikkat hai :)',
  })
);

app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/task', require('./routes/TaskRoutes'));
app.use('/api/institute', require('./routes/instituteRoutes'));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
