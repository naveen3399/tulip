const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const HttpException = require("./utils/HttpException.utils");
const errorMiddleware = require("./middleware/error.middleware");
const path = require("path");


// Init express
const app = express();
// Init environment
dotenv.config({
  path: path.resolve(__dirname, `../${process.env.NODE_ENV}.env`)
});
console.log(`NODE_ENV=${process.env.NODE_ENV}`);

const router = require("./routes");

//require("./config/sequelize");

// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());

const port = Number(process.env.PORT || 3331);
const { initModels } = require("./models/adminapp/init-models");
const  adminDBConnection  = require("./config/dbconfig/adminappdbconfig");
let models = initModels(adminDBConnection);
adminDBConnection.sync()

router(app);

const expressSwagger = require('express-swagger-generator')(app);
let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: '13.233.81.205',
        basePath: '/api/v1/',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https']
        // ,
        // securityDefinitions: {
        //     JWT: {
        //         type: 'apiKey',
        //         in: 'header',
        //         name: 'Authorization',
        //         description: "",
        //     }
        // }
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/*.js'] //Path to the API handle folder
};
expressSwagger(options);

// 404 error
app.all("*", (req, res, next) => {
  const err = new HttpException(404, "Endpoint Not Found");
  next(err);
});

// Error middleware
app.use(errorMiddleware);

// starting the server
app.listen(port, () => console.log(`🚀 Server running on port ${port}!`));

module.exports = app;
