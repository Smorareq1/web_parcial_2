const { v4: uuidv4 } = require('uuid');
const librosData = require('../data/libros.json');

// Array en memoria para almacenar los libros
let libros = [...librosData];

/**
 * GET /api/libros
 * Obtiene todos los libros
 */
const getAllLibros = (req, res) => {
    res.status(200).json({
        total: libros.length,
        libros
    });
};

/**
 * GET /api/libros/:id
 * Obtiene un libro por ID
 */
const getLibroById = (req, res, next) => {
    const { id } = req.params;

    const libro = libros.find(l => l.id === id);

    if (!libro) {
        const error = new Error(`Libro con ID ${id} no encontrado`);
        error.statusCode = 404;
        return next(error);
    }

    res.status(200).json(libro);
};

/**
 * POST /api/libros
 * Crea un nuevo libro
 */
const createLibro = (req, res, next) => {
    const { title, author, year } = req.body;

    // Limpiar espacios en blanco de title y author
    const trimmedTitle = title.trim();
    const trimmedAuthor = author.trim();

    // Verificar duplicados: mismo libro (title + author)
    const duplicado = libros.find(l =>
        l.title.toLowerCase() === trimmedTitle.toLowerCase() &&
        l.author.toLowerCase() === trimmedAuthor.toLowerCase()
    );

    if (duplicado) {
        const error = new Error(`Ya existe un libro con el título "${trimmedTitle}" del autor "${trimmedAuthor}"`);
        error.statusCode = 400;
        return next(error);
    }

    // Crear nuevo libro
    const nuevoLibro = {
        id: uuidv4(),
        title: trimmedTitle,
        author: trimmedAuthor,
        year: year || null
    };

    // Agregar al array
    libros.push(nuevoLibro);

    // Responder con 201 Created
    res.status(201).json(nuevoLibro);
};

/**
 * DELETE /api/libros/:id
 * Elimina un libro por ID
 */
const deleteLibro = (req, res, next) => {
    const { id } = req.params;

    // Buscar índice del libro
    const index = libros.findIndex(l => l.id === id);

    if (index === -1) {
        const error = new Error(`Libro con ID ${id} no encontrado`);
        error.statusCode = 404;
        return next(error);
    }

    // Eliminar del array
    const libroEliminado = libros.splice(index, 1)[0];

    res.status(200).json({
        message: 'Libro eliminado exitosamente',
        libro: libroEliminado
    });
};

module.exports = {
    getAllLibros,
    getLibroById,
    createLibro,
    deleteLibro
};