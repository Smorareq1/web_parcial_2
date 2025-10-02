/**
 * Middleware de manejo de errores
 * Captura todos los errores y devuelve respuestas JSON consistentes
 */
const errorHandler = (err, req, res, next) => {
    // Si ya se envió una respuesta, delegar al manejador de errores por defecto
    if (res.headersSent) {
        return next(err);
    }

    // Obtener el código de estado del error o usar 500 por defecto
    const statusCode = err.statusCode || 500;

    // Crear mensaje de error
    const errorMessage = err.message || 'Error interno del servidor';

    // Log del error en consola para debugging
    console.error(`[ERROR] ${req.method} ${req.originalUrl} - ${statusCode}: ${errorMessage}`);

    // Responder con JSON
    res.status(statusCode).json({
        error: errorMessage
    });
};

/**
 * Middleware para rutas no encontradas (404)
 */
const notFound = (req, res) => {
    res.status(404).json({
        error: `Ruta no encontrada: ${req.originalUrl}`
    });
};

module.exports = {
    errorHandler,
    notFound
};