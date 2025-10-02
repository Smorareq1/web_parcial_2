const app = require('./src/app');

// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
    console.log('=================================');
    console.log(`📚 Servidor de libros iniciado`);
    console.log(`🚀 Escuchando en: http://localhost:${PORT}`);
    console.log(`📖 API Base: http://localhost:${PORT}/api/libros`);
    console.log('=================================');
});