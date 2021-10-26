const expressSwaggerGenerator = require("express-swagger-generator");
module.exports = (app) => {
  const expressSwagger = expressSwaggerGenerator(app);
  const hostName = `localhost:${process.env.PORT}`;
  let options = {
    swaggerDefinition: {
      info: {
        description: "This is a sample server",
        title: "Swagger",
        version: "1.0.0",
      },
      host: hostName,
      basePath: "/api/v1/",
      produces: ["application/json", "application/xml"],
      schemes: ["http", "https"],
    },
    basedir: __dirname, //app absolute path
    files: ["./routes/*.js"], //Path to the API handle folder
  };
  expressSwagger(options);
};
