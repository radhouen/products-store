const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const app = express();
var options = {
  explorer: true
};
require("./services/cache");
require("./models/Product");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const getRoute = (req) => {
  const route = req.route ? req.route.path : '' // check if the handler exist
  const baseUrl = req.baseUrl ? req.baseUrl : '' // adding the base url if the handler is child of other handler

  return route ? `${baseUrl === '/' ? '' : baseUrl}${route}` : 'unknown route'
}

const fs = require('fs')
const FILE_PATH = 'stats.json'

// read json object from file
const readStats = () => {
  let result = {}
  try {
      result = JSON.parse(fs.readFileSync(FILE_PATH))
  } catch (err) {
      console.error(err)
  }
  return result
}

// dump json object to file
const dumpStats = (stats) => {
  try {
      fs.writeFileSync(FILE_PATH, JSON.stringify(stats), { flag: 'w+' })
  } catch (err) {
      console.error(err)
  }
}

app.use((req, res, next) => {
  res.on('finish', () => {
      const stats = readStats()
      const event = `${req.method} ${getRoute(req)} ${res.statusCode}`
      stats[event] = stats[event] ? stats[event] + 1 : 1
      dumpStats(stats)
  })
  next()
})

//
app.get('/stats', (req, res) => {
  res.json(readStats())
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.use('/api/products', require('./routes/ProductRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
