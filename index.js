// loading of modules
const express = require('express');
const dotenv = require('dotenv');
// const swaggerDocs = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');

// Express App creation
const app = express();
dotenv.config();
app.use(express.json());

// user defined modules
const db = require('./utilities/db.config');
var userRouter = require('../ecommerce/routes/user.route');
var categoryRouter = require('../ecommerce/routes/category.route');
var productRouter  = require('../ecommerce/routes/product.route');
var orderRouter  = require('../ecommerce/routes/order.route');

db.connectToDB();


// const swaggerOptions = {
//     swaggerDefinition: {
//       info: {
//         version: '1.0.0',
//         title: 'Ecommerce API',
//         description : "Customer API Information",
//         contact : {
//             name: "Naveenkumar K"
//         },
//       },
//       servers : ["http://localhost:8089"]
//     },
//     apis: ['index.js'], // files containing annotations as above
// };
  

// Route Configuration
app.use(`${process.env.API_URL}/user`, userRouter);
app.use(`${process.env.API_URL}/category`, categoryRouter);
app.use(`${process.env.API_URL}/product`, productRouter);
app.use(`${process.env.API_URL}/order`, orderRouter);

// const sDocs =  swaggerDocs(swaggerOptions);
// app.use('/docs', swaggerUi.serve, swaggerUi.setup(sDocs));


// http://localhost:8089/api/v1.0.0/healthcheck


// /**
//  * @swagger
//  * /healthcheck:
//  *   get:
//  *     description: This is a health check api!
//  *     responses:
//  *       200:
//  *         description: Sucess.
//  */

app.get(`${process.env.API_URL}/healthcheck`, (_req, res) => {
    res.send("<img src='https://www.devopsschool.com/assets/assets1/images/courses/gitlab-training.png'>")
})

app.listen(process.env.PORT, ()=>{
    console.log("Server started");
})