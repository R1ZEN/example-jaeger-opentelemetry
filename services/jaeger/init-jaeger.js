const { node, api, resources, tracing } = require('@opentelemetry/sdk-node');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
const { SemanticResourceAttributes  } = require('@opentelemetry/semantic-conventions');
const { JaegerPropagator } = require('@opentelemetry/propagator-jaeger');
const { version } = require('../../package.json');

const agentHost = 'localhost';
const agentPort = 6832;

const initJaeger = (serviceName) => {
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


module.exports = {
  initJaeger,
}