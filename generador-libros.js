const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// Listas de datos para generar libros variados
const titulos = [
    "The Great", "The Last", "The First", "The Lost", "The Hidden",
    "A Tale of", "Chronicles of", "The Secret", "The Silent", "The Shadow",
    "Beyond the", "Through the", "Beneath the", "The Rise of", "The Fall of",
    "The Art of", "The Science of", "The Mystery of", "The History of", "The Legend of",
    "Journey to", "Return to", "Escape from", "Tales from", "Memories of",
    "The Book of", "The Way of", "The Path to", "The Quest for", "The Search for",
    "Dreams of", "Echoes of", "Whispers of", "Songs of", "Stories of",
    "The Golden", "The Silver", "The Dark", "The Bright", "The Ancient",
    "The Modern", "The Future", "The Past", "The Eternal", "The Forgotten"
];

const sustantivos = [
    "Dragon", "Phoenix", "Warrior", "Kingdom", "Empire", "City", "Ocean", "Mountain",
    "Forest", "Desert", "River", "Storm", "Sun", "Moon", "Star", "Light", "Darkness",
    "Time", "Space", "Mind", "Soul", "Heart", "Dream", "Reality", "Truth", "Lies",
    "Love", "War", "Peace", "Hope", "Fear", "Courage", "Wisdom", "Power", "Freedom",
    "Destiny", "Journey", "Adventure", "Mystery", "Secret", "Memory", "Shadow", "Ghost",
    "Spirit", "Magic", "Science", "Art", "Music", "Dance", "Life", "Death", "Rebirth",
    "Universe", "World", "Galaxy", "Planet", "Island", "Castle", "Temple", "Tower"
];

const autores = [
    "James Anderson", "Maria Garcia", "John Smith", "Emma Wilson", "Michael Brown",
    "Sarah Johnson", "David Martinez", "Laura Davis", "Robert Rodriguez", "Jennifer Lopez",
    "William Lee", "Elizabeth Taylor", "Richard White", "Patricia Harris", "Thomas Clark",
    "Linda Lewis", "Charles Walker", "Barbara Hall", "Christopher Allen", "Jessica Young",
    "Daniel King", "Nancy Wright", "Matthew Scott", "Karen Green", "Anthony Adams",
    "Betty Baker", "Mark Nelson", "Helen Carter", "Donald Mitchell", "Sandra Roberts",
    "Steven Turner", "Ashley Phillips", "Paul Campbell", "Kimberly Parker", "Andrew Evans",
    "Emily Edwards", "Joshua Collins", "Melissa Stewart", "Kevin Morris", "Amanda Rogers",
    "Brian Reed", "Stephanie Cook", "George Morgan", "Rebecca Bell", "Edward Murphy",
    "Sharon Bailey", "Ronald Rivera", "Cynthia Cooper", "Timothy Richardson", "Kathleen Cox",
    "Jason Howard", "Shirley Ward", "Jeffrey Torres", "Angela Peterson", "Ryan Gray",
    "Deborah Ramirez", "Gary James", "Carol Watson", "Nicholas Brooks", "Janet Kelly",
    "Eric Sanders", "Catherine Price", "Stephen Bennett", "Margaret Wood", "Larry Barnes",
    "Lisa Ross", "Frank Henderson", "Dorothy Coleman", "Benjamin Jenkins", "Ruth Perry",
    "Patrick Powell", "Virginia Long", "Raymond Patterson", "Carolyn Hughes", "Jack Flores",
    "Diane Washington", "Dennis Butler", "Joyce Simmons", "Peter Foster", "Frances Gonzales",
    "Harold Bryant", "Evelyn Alexander", "Douglas Russell", "Christine Griffin", "Henry Hayes",
    "Marie Myers", "Carl Ford", "Jacqueline Hamilton", "Arthur Graham", "Katherine Sullivan",
    "Joe Wallace", "Gloria Woods", "Albert Cole", "Teresa Wells", "Willie Sanders",
    "Norma Stone", "Terry Hawkins", "Jean Dunn", "Ralph Hunt", "Judy Grant"
];

// Función para generar un título único
function generarTitulo() {
    const inicio = titulos[Math.floor(Math.random() * titulos.length)];
    const fin = sustantivos[Math.floor(Math.random() * sustantivos.length)];

    // Algunas veces agregar un número o subtítulo
    const random = Math.random();
    if (random < 0.3) {
        const numero = Math.floor(Math.random() * 10) + 1;
        return `${inicio} ${fin}: Volume ${numero}`;
    } else if (random < 0.5) {
        const sustantivo2 = sustantivos[Math.floor(Math.random() * sustantivos.length)];
        return `${inicio} ${fin} and ${sustantivo2}`;
    } else {
        return `${inicio} ${fin}`;
    }
}

// Función para generar un autor
function generarAutor() {
    return autores[Math.floor(Math.random() * autores.length)];
}

// Función para generar un año entre 1900 y 2024
function generarYear() {
    // Mayor probabilidad de libros recientes
    const random = Math.random();
    if (random < 0.5) {
        // 50% libros entre 2000-2024
        return Math.floor(Math.random() * 25) + 2000;
    } else if (random < 0.8) {
        // 30% libros entre 1950-1999
        return Math.floor(Math.random() * 50) + 1950;
    } else {
        // 20% libros entre 1900-1949
        return Math.floor(Math.random() * 50) + 1900;
    }
}

// Generar 1000 libros
function generarLibros(cantidad) {
    const libros = [];
    const titulosUsados = new Set();

    console.log(`Generando ${cantidad} libros...`);

    for (let i = 0; i < cantidad; i++) {
        let titulo;

        // Asegurar que el título sea único
        do {
            titulo = generarTitulo();
        } while (titulosUsados.has(titulo));

        titulosUsados.add(titulo);

        const libro = {
            id: uuidv4(),
            title: titulo,
            author: generarAutor(),
            year: generarYear()
        };

        libros.push(libro);

        // Mostrar progreso cada 100 libros
        if ((i + 1) % 100 === 0) {
            console.log(`✓ ${i + 1} libros generados...`);
        }
    }

    return libros;
}

// Generar los libros
const libros = generarLibros(1000);

// Guardar en archivo JSON
const nombreArchivo = 'libros.json';
fs.writeFileSync(nombreArchivo, JSON.stringify(libros, null, 2), 'utf-8');

console.log('\n====================================');
console.log(`¡Archivo generado exitosamente!`);
console.log(`Nombre: ${nombreArchivo}`);
console.log(`Total de libros: ${libros.length}`);
console.log('====================================\n');

// Mostrar algunos ejemplos
console.log('Primeros 5 libros generados:\n');
libros.slice(0, 5).forEach((libro, index) => {
    console.log(`${index + 1}. "${libro.title}" por ${libro.author} (${libro.year})`);
});

console.log('\n✅ El archivo está listo para usar en tu proyecto!');