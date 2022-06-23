const { performance } = require('perf_hooks');
const now = () => new Date().toISOString().replace(/[TZ]/g, ' ').trimEnd()

module.exports = async function logger(req, res, next) {
    const startTime = performance.now();
    const method = req.method.toUpperCase();
    const url = req.url;
    const _t = ` ${method} @ ${url}`;

    console.log(`[${now()}] --> ${_t}`);

    res.on('finish', () => {
        const end = (performance.now() - startTime).toFixed(1)
        console.log(`[${now()}] <-- ${_t} ${res.statusCode} ${end}ms`)
    });

    await next();
}