const axios = require('axios');
const express = require('express');
const { initJaeger } = require('../jaeger/init-jaeger');
const jaegerExpressMiddleware  = require('../jaeger/jaeger-express-middleware');
const app = express();
const PORT = 3002;

void function main() {
  const jaegerTracer = initJaeger('service 2')

  app.use(jaegerExpressMiddleware(jaegerTracer));

  app.get('/ping', (req, res) => {
    console.log('ping');
    axios.get('http://localhost:3001/pong').then(() => {
      res.send('service 2');
    })
  });

  app.listen(PORT, () => {
    console.log(`> Server http://localhost:${PORT}`);
  });
}();


