'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const userRouter = require('./routes/user');

const app = express();
const port = process.env.PORT;

app.use(logger('dev'));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(cors());

// routes
app.get('/', (req, res) => {
  res.send('Hello Housekeepers!');
});
app.use('/v1', userRouter);
//app.use("/api/user", require("./controllers/user").default);
//app.use('/api/person', require('./controllers/person'));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
