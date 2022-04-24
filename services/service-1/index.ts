import express from 'express';
import { initJaeger } from '../jaeger/init-jaeger';
import { jaegerExpressMiddleware } from '../jaeger/jaeger-express-middleware';
import { apiRequest } from '../jaeger/api-request';

const app = express();
const PORT = 3001;

void function main() {
  const jaegerTracer = initJaeger('service 1');

  app.use(jaegerExpressMiddleware(jaegerTracer));

  app.get('/', async (req, res) => {
    await apiRequest(jaegerTracer, 'http://localhost:3002/service2');
    res.send('service 1');
  });

  app.listen(PORT, () => {
    console.log(`> Server http://localhost:${PORT}`);
  });
}();


