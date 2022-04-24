import express from 'express';
import { initJaeger } from '../jaeger/init-jaeger';
import { jaegerExpressMiddleware } from '../jaeger/jaeger-express-middleware';
import { api } from '@opentelemetry/sdk-node';
import { apiRequest } from '../jaeger/api-request';

const app = express();
const PORT = 3003;

void function main() {
  const jaegerTracer = initJaeger('service 3');

  app.use(jaegerExpressMiddleware(jaegerTracer));

  app.get('/service3', (req, res) => {
    res.send('service 3');
  });

  app.listen(PORT, () => {
    console.log(`> Server http://localhost:${PORT}`);
  });
}();


