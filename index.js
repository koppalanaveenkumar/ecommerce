// loading of modules
const express = require('express');
const dotenv = require('dotenv');

// Express App creation
const app = express();
dotenv.config();
app.use(express.json());

// DB connection
const db = require('./utilities/db.config');
db.connectToDB();

// API_URL

// http://localhost:8089/api/v1.0.0/user/register
var userRouter = require('./routes/user.route');
app.use(`${process.env.API_URL}/user`, userRouter);

var categoryRouter = require('./routes/category.route');
app.use(`${process.env.API_URL}/category`, categoryRouter)

var productRouter  = require('./routes/product.route');
app.use(`${process.env.API_URL}/product`, productRouter)

// http://localhost:8089/api/v1.0.0/healthcheck
app.get(`${process.env.API_URL}/healthcheck`, (req, res) => {
    res.send("<img src='https://www.devopsschool.com/assets/assets1/images/courses/gitlab-training.png'>")
})

app.listen(process.env.PORT, ()=>{
    console.log("Server started");
})