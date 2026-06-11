const http = require('http');
const client = require('prom-client');

// Metrics registry
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Custom metric — request count చూడడానికి
const requestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total HTTP requests',
    labelNames: ['method', 'status'],
    registers: [register]
});

// Custom metric — response time చూడడానికి
const responseTime = new client.Histogram({
    name: 'http_response_time_seconds',
    help: 'HTTP response time',
    registers: [register]
});

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
    const start = Date.now();

    // /metrics route — Prometheus ఇక్కడ నుండి data తీసుకుంటుంది
    if (req.url === '/metrics') {
        res.writeHead(200, { 'Content-Type': register.contentType });
        res.end(await register.metrics());
        return;
    }

    // Normal route
    requestCounter.inc({ method: req.method, status: 200 });
    const duration = (Date.now() - start) / 1000;
    responseTime.observe(duration);

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from Docker! 🐳\n');
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Metrics available at http://localhost:${PORT}/metrics`);
});
