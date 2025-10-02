/**
 * Validadores para el recurso de libros
 */

// Expresión regular para validar formato UUID
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Valida que un string sea un UUID válido
 */
const isValidUUID = (id) => {
    return UUID_REGEX.test(id);
};

/**
 * Valida el ID en parámetros de ruta
 * Middleware para GET y DELETE por ID
 */
const validateId = (req, res, next) => {
    const { id } = req.params;

    if (!isValidUUID(id)) {
        const error = new Error('El ID proporcionado no es un UUID válido');
        error.statusCode = 400;
        return next(error);
    }

    next();
};

/**
 * Valida los datos para crear un libro
 * Middleware para POST
 */
const validateCreateLibro = (req, res, next) => {
    const { title, author, year } = req.body;
    const errors = [];

    // Validar title (requerido)
    if (!title) {
        errors.push('El campo "title" es requerido');
    } else if (typeof title !== 'string') {
        errors.push('El campo "title" debe ser un string');
    } else {
        const trimmedTitle = title.trim();
        if (trimmedTitle.length < 2) {
            errors.push('El campo "title" debe tener al menos 2 caracteres');
        }
        if (trimmedTitle.length > 200) {
            errors.push('El campo "title" no puede exceder 200 caracteres');
        }
    }

    // Validar author (requerido)
    if (!author) {
        errors.push('El campo "author" es requerido');
    } else if (typeof author !== 'string') {
        errors.push('El campo "author" debe ser un string');
    } else {
        const trimmedAuthor = author.trim();
        if (trimmedAuthor.length < 5) {
            errors.push('El campo "author" debe tener al menos 5 caracteres');
        }
    }

    // Validar year (opcional, pero si se proporciona debe ser válido)
    if (year !== undefined && year !== null) {
        if (typeof year !== 'number' || !Number.isInteger(year)) {
            errors.push('El campo "year" debe ser un número entero');
        } else {
            const currentYear = new Date().getFullYear();

            if (year < 1000) {
                errors.push('El campo "year" debe ser mayor o igual a 1000');
            }
            if (year > currentYear) {
                errors.push(`El campo "year" no puede ser mayor al año actual (${currentYear})`);
            }
        }
    }

    // Si hay errores, responder con 400
    if (errors.length > 0) {
        const error = new Error(errors.join(', '));
        error.statusCode = 400;
        return next(error);
    }

    next();
};

module.exports = {
    validateId,
    validateCreateLibro,
    isValidUUID
};