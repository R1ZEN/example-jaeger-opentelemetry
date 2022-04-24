import axios from 'axios';
import { Tracer } from '@opentelemetry/api/build/src/trace/tracer';
import { api } from '@opentelemetry/sdk-node';

export const apiRequest = (jaegerTracer: Tracer, url: string) => {
  return jaegerTracer.startActiveSpan(url, async (span) => {
    try {
      const carrier = {};
      // inject context data to carrier
      api.propagation.inject(api.context.active(), carrier);

      span.setAttributes(carrier);
      await axios.get(url, { headers: carrier });
    } finally {
      span.end();
    }
  });
};