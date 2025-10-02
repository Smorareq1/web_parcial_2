/**
 * Middleware de logging
 * Imprime en consola: método HTTP, ruta y código de estado
 */
const logger = (req, res, next) => {
    // Guardar el método original de res.json para interceptar la respuesta
    const originalJson = res.json.bind(res);

    res.json = function(body) {
        // Log después de que la respuesta está lista
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`);
        return originalJson(body);
    };

    // Continuar con el siguiente middleware
    next();
};

module.exports = logger;