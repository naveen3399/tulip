const curriculum = require("./curriculum");
const express = require("express");
const routes = express.Router();

module.exports = function (app) {
  app.use("/api/v1", routes);
  // Readiness Probe
  app.use('/health', (request, response) => {
    return response.sendStatus(200);
  });
  let isOnline = true;
  // Liveness Probe
  app.use('/live', (request, response) => {
    return isOnline ? response.send('OK') : response.sendStatus(500);
  });

  // if(process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "development"){
  //   app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));
  // }
  //app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));
  curriculum(routes);
 
};
