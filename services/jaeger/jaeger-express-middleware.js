module.exports = (jaegerTracer) => (req, res, next) => {
  jaegerTracer.startActiveSpan(req.url, (span) => {
      span.setAttribute('headers', JSON.stringify(req.headers));

      req.on('close', () => {
        span.end();
      });

      next();
  });
}