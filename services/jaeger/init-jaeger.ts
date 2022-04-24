import { node, api, resources, tracing } from '@opentelemetry/sdk-node';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { SemanticResourceAttributes  } from '@opentelemetry/semantic-conventions';
import { JaegerPropagator } from '@opentelemetry/propagator-jaeger';
import { version } from '../../package.json';

const agentHost = 'localhost';
const agentPort = '6832';

export const initJaeger = (serviceName: string) => {
  console.log(`[Jaeger]: Initializing`);

  const traceProvider = new node.NodeTracerProvider({
    resource: new resources.Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
    }),
  });

  const jaegerExporter = new JaegerExporter({
    host: agentHost,
    port: Number.parseInt(agentPort || ''),
    // Jaeger Process attributes
    tags: [
      {
        key: 'pid',
        value: process.pid,
      },
    ],
  });

  traceProvider.addSpanProcessor(new tracing.BatchSpanProcessor(jaegerExporter));
  traceProvider.register({
    propagator: new JaegerPropagator(),
  });

  return api.trace.getTracer(serviceName, version);
};
