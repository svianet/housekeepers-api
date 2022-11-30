'use strict';

require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');

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

// session
const sess = {
  secret: 'housekeeper app',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess));

// our routes (always call api/[router])
// Also, we can create version route
app.use('/api', routes);

// error middleware
app.use((error, req, res, next) => {
  if (req.app.get('env') === 'development') {
    console.log('Error Path: ', req.path)
    console.log(error);
  }

  let myError = new Error();
  myError.statusCode = error.statusCode || 500;
  myError.message = error.message;
  myError.stack = error.stack;
  
  // set locals, only providing error in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  res.status(myError.statusCode).send(myError);
})

// starting the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
