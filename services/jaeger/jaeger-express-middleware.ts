import type * as e from 'express';
import { Tracer } from '@opentelemetry/api/build/src/trace/tracer';
import { api } from '@opentelemetry/sdk-node';

export const jaegerExpressMiddleware = (jaegerTracer: Tracer): e.RequestHandler => (req, res, next) => {
  const context = api.propagation.extract(api.context.active(), req.headers);
  api.context.with(context, () => {
    jaegerTracer.startActiveSpan(req.url, (span) => {
      span.setAttribute('headers', JSON.stringify(req.headers));

      res.on('finish', () => {
        span.end();
      });

      next();
    });
  });
};