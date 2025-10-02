const express = require('express');

// Importar middlewares
const logger = require('./middleware/logger');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Importar rutas
const librosRoutes = require('./routes/libros.routes');

// Crear instancia de Express
const app = express();

/**
 * Middlewares globales
 */

// Parsear JSON en el body de las peticiones
app.use(express.json());

// Middleware de logging personalizado
app.use(logger);

/**
 * Rutas
 */

// Ruta de prueba para verificar que el servidor funciona
app.get('/', (req, res) => {
    res.json({
        message: 'API de Libros - Backend funcionando correctamente',
        version: '1.0.0',
        endpoints: {
            libros: '/api/libros'
        }
    });
});

// Rutas del recurso libros
app.use('/api/libros', librosRoutes);

/**
 * Manejo de errores
 */

// Capturar rutas no encontradas (debe ir después de todas las rutas)
app.use(notFound);

// Middleware de manejo de errores (debe ir al final)
app.use(errorHandler);

module.exports = app;