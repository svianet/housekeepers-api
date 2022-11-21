'use strict';

require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const routes = require('./routes');
const app = express();
const port = process.env.PORT;

// adding Helmet to enhance your API's security
app.use(helmet());
// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// enabling CORS for all requests
app.use(cors());
// adding morgan to log HTTP requests
app.use(morgan('combined'));

// auth middleware

// our routes (always call api/[router])
// Also, we can create version route
app.use('/api', routes);

// error middleware
app.use((error, req, res, next) => {
  console.log('Error Path: ', req.path)
  // console.error('Stack: ', error.stack)  

  // set locals, only providing error in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  // if error already defined
  res.status(error.statusCode || 500).send(error);
})

// starting the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
