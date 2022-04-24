import express from 'express';
import { initJaeger } from '../jaeger/init-jaeger';
import { jaegerExpressMiddleware } from '../jaeger/jaeger-express-middleware';
import { api } from '@opentelemetry/sdk-node';
import { apiRequest } from '../jaeger/api-request';

const app = express();
const PORT = 3002;

void function main() {
  const jaegerTracer = initJaeger('service 2');

  app.use(jaegerExpressMiddleware(jaegerTracer));

  app.get('/service2', (req, res) => {
    const context = api.propagation.extract(api.context.active(), req.headers);
    api.context.with(context, async () => {
      await apiRequest(jaegerTracer, 'http://localhost:3003/service3');
      res.send('service 2');
    });
  });

  app.listen(PORT, () => {
    console.log(`> Server http://localhost:${PORT}`);
  });
}();


