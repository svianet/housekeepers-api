require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const userRouter = require('./routes/user');
const serviceRouter = require('./routes/service');

app.use('/user', userRouter);
app.use('/service', serviceRouter);
//app.use('/job', jobRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
