const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require("../backend-1/routes/index");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

mongoose.connect('mongodb+srv://manmohanshukla815:Man%401234@cluster0.fjnpqjp.mongodb.net/FRA-server', { dbName: "FRA-server" })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(3000, () => console.log('Server running on port 3000'));
