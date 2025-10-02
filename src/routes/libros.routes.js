const express = require('express');
const router = express.Router();

// Importar controladores
const {
    getAllLibros,
    getLibroById,
    createLibro,
    deleteLibro
} = require('../controllers/libros.controller');

// Importar validadores
const {
    validateId,
    validateCreateLibro
} = require('../validators/libros.validator');

/**
 * Rutas del recurso libros
 */

// GET /api/libros - Obtener todos los libros
router.get('/', getAllLibros);

// GET /api/libros/:id - Obtener un libro por ID
router.get('/:id', validateId, getLibroById);

// POST /api/libros - Crear un nuevo libro
router.post('/', validateCreateLibro, createLibro);

// DELETE /api/libros/:id - Eliminar un libro por ID
router.delete('/:id', validateId, deleteLibro);

module.exports = router;