const axios = require('axios');
const express = require('express');
const { initJaeger } = require('../jaeger/init-jaeger');
const jaegerExpressMiddleware  = require('../jaeger/jaeger-express-middleware');
const app = express();
const PORT = 3001;

void function main() {
  const jaegerTracer = initJaeger('service 1')

  app.use(jaegerExpressMiddleware(jaegerTracer));

  app.get('/', (req, res) => {
    console.log('/');
    axios.get('http://localhost:3002/ping').then(() => {
      res.send('service 1');
    });
  });

  app.get('/pong', (req, res) => {
    console.log('pong');
    res.send('pong');
  });

  app.listen(PORT, () => {
    console.log(`> Server http://localhost:${PORT}`);
  });
}();


