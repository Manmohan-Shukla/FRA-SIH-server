const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require("../backend-1/routes/index");
const PORT = process.env.PORT || 3000;

const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

mongoose.connect(process.env.MONGO_URL, { dbName: "FRA-server" })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => console.log('Server running on port 3000'));
