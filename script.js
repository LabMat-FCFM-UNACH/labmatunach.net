// Obtener la fecha actual
const fechaActual = new Date();
const dia = fechaActual.getDate();
const mes = fechaActual.getMonth() + 1;
const año = fechaActual.getFullYear();
const fechaFormateada = `${dia}/${mes}/${año}`;

// Selecciona los elementos de los menús
const navItem = document.querySelector(".nav__item");
const menuContextual = document.querySelector(".menu__contextual");
const navItem1 = document.querySelector(".nav__item-1");
const menuContextual1 = document.querySelector(".menu__contextual-1");
const flecha = document.getElementById("flecha");
const flecha1 = document.getElementById("flecha-1");

// Menu movil
const navegador = document.querySelector(".navegador");
const open = document.getElementById("open");
const close = document.getElementById("close");

// Selecciona los elementos del slider
let sliderList = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dotsContainer = document.querySelector('.slider .dots');
let dots = dotsContainer.querySelectorAll('li');

// Función para manejar el menú contextual
function manejarMenu(navItem, menuContextual, flecha) {
    let isSmallScreen = window.innerWidth <= 855;

    function mostrarMenu() {
        menuContextual.classList.add("block");
        navItem.classList.add("color");
        flecha.classList.add("rotate");
    }

    function ocultarMenu() {
        menuContextual.classList.remove("block");
        navItem.classList.remove("color");
        flecha.classList.remove("rotate");
    }

    function agregarEventos() {
        if (isSmallScreen) {
            navItem.removeEventListener("mouseover", mostrarMenu);
            menuContextual.removeEventListener("mouseover", mostrarMenu);
            navItem.removeEventListener("mouseout", mouseoutHandlerNavItem);
            menuContextual.removeEventListener("mouseout", mouseoutHandlerMenuContextual);
            navItem.addEventListener("click", toggleMenu);
            document.addEventListener("click", clickOutsideHandler);
        } else {
            navItem.removeEventListener("click", toggleMenu);
            document.removeEventListener("click", clickOutsideHandler);
            navItem.addEventListener("mouseover", mostrarMenu);
            menuContextual.addEventListener("mouseover", mostrarMenu);
            navItem.addEventListener("mouseout", mouseoutHandlerNavItem);
            menuContextual.addEventListener("mouseout", mouseoutHandlerMenuContextual);
        }
    }

    function toggleMenu(event) {
        event.stopPropagation();
        if (menuContextual.classList.contains("block")) {
            ocultarMenu();
        } else {
            mostrarMenu();
        }
    }

    function clickOutsideHandler(event) {
        if (!navItem.contains(event.target) && !menuContextual.contains(event.target) && !sliderList.contains(event.target)) {
            ocultarMenu();
        }
    }

    function mouseoutHandlerNavItem(event) {
        if (!menuContextual.contains(event.relatedTarget)) {
            ocultarMenu();
        }
    }

    function mouseoutHandlerMenuContextual(event) {
        if (!navItem.contains(event.relatedTarget)) {
            ocultarMenu();
        }
    }

    agregarEventos();
    window.addEventListener("resize", () => {
        isSmallScreen = window.innerWidth <= 855;
        agregarEventos();
    });
}

manejarMenu(navItem, menuContextual, flecha);
manejarMenu(navItem1, menuContextual1, flecha1);

// Abrir menú móvil
open.addEventListener("click", () => {
    navegador.classList.toggle("dezplazar");
});

// Cerrar menú móvil
close.addEventListener("click", () => {
    navegador.classList.toggle("dezplazar");
});

// Slider
let lengthItems = items.length - 1;
let active = 0;

// Función para evitar que el clic en los botones del slider y los puntos (dots) cierre el menú
function stopPropagation(event) {
    event.stopPropagation();
}

next.onclick = function (event) {
    stopPropagation(event);
    active = (active + 1) <= lengthItems ? active + 1 : 0;
    reloadSlider();
}

prev.onclick = function (event) {
    stopPropagation(event);
    active = (active - 1) >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}

let refreshInterval = setInterval(() => { next.click() }, 6000);

function reloadSlider() {
    if (!items[active]) return; // Asegurarse de que `items[active]` exista
    sliderList.style.left = -items[active].offsetLeft + 'px';
    let lastActiveDot = dotsContainer.querySelector('.active');
    if (lastActiveDot) lastActiveDot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => { next.click() }, 6000);
}

// Configura los dots
dots.forEach((li, key) => {
    li.addEventListener('click', (event) => {
        stopPropagation(event);
        active = key;
        reloadSlider();
    });
});

// Función para crear el nombre del archivo de imagen
function generarNombreImagen(dia, mes, año) {
    return `${dia}_${mes}_${año}`; // O .jpeg, depende de tu formato
}

// Función para obtener las tres imágenes más recientes
async function obtenerImagenesRecientes() {
    const imagenes = [];
    const enlaces = [];
    const alts = [];
    let dia = fechaActual.getDate();
    let mes = fechaActual.getMonth() + 1;
    let año = fechaActual.getFullYear();

    while (alts.length < 3) {
        const nombreImagen = generarNombreImagen(dia, mes, año) + `.png`;
        const rutaImagen = `Actividades/${nombreImagen}`;
        const nombreEnlace = generarNombreImagen(dia, mes, año) + `.txt`;
        const rutaEnlace = `Actividades/${nombreEnlace}`;
        const nombreAlt = generarNombreImagen(dia, mes, año) + `_alt.txt`;
        const rutaAlt = `Actividades/${nombreAlt}`;

        try {
            // Usar Promise.all para hacer fetch simultáneo
            const [resImagen, resEnlace, resAlt] = await Promise.all([
                fetch(rutaImagen),
                fetch(rutaEnlace),
                fetch(rutaAlt)
            ]);

            if (resImagen.ok) {
                imagenes.push(rutaImagen);
            }

            if (resEnlace.ok) {
                const textoEnlace = await resEnlace.text();
                enlaces.push(textoEnlace);
            }

            if (resAlt.ok) {
                const textoAlt = await resAlt.text();
                alts.push(textoAlt);
            }

        } catch (error) {
            console.log(`Error al obtener datos para la fecha: ${dia}/${mes}/${año}`);
        }

        // Restar un día y ajustar mes y año si es necesario
        dia--;
        if (dia === 0) {
            mes--;
            if (mes === 0) {
                mes = 12;
                año--;
            }
            dia = new Date(año, mes, 0).getDate(); // Último día del mes anterior
        }
    }
    return { imagenes, enlaces, alts };
}

// Función para cargar y mostrar las imágenes en el slider
async function cargarImagenesEnSlider() {
    const { imagenes, enlaces, alts } = await obtenerImagenesRecientes();

    // Limpiar el contenido del slider y los dots antes de agregar las nuevas imágenes
    sliderList.innerHTML = '';
    dotsContainer.innerHTML = '';

    // Crear un fragmento para evitar múltiples manipulaciones del DOM
    const fragmentoSlider = document.createDocumentFragment();
    const fragmentoDots = document.createDocumentFragment();

    // Añadir las tres imágenes al slider
    imagenes.forEach((rutaImagen, index) => {
        let item = document.createElement('div');
        item.classList.add('item');
        item.innerHTML = `<a href="${enlaces[index]}"><img src="${rutaImagen}" alt="${alts[index] || 'Imagen reciente'}"></a>`;
        fragmentoSlider.appendChild(item);

        // Crear los dots
        let dot = document.createElement('li');
        if (index === 0) dot.classList.add('active'); // El primer dot es activo
        fragmentoDots.appendChild(dot);
    });

    // Insertar todos los elementos en el DOM de una sola vez
    sliderList.appendChild(fragmentoSlider);
    dotsContainer.appendChild(fragmentoDots);

    // Inicializar items después de agregar imágenes
    items = document.querySelectorAll('.slider .list .item');
    dots = dotsContainer.querySelectorAll('li'); // Actualiza la lista de dots

    // Reiniciar el slider para que funcione con las nuevas imágenes
    lengthItems = imagenes.length - 1;
    active = 0;
    reloadSlider();
}

// Llamar a la función para cargar las imágenes al cargar la página
cargarImagenesEnSlider();


console.log(fechaActual);


// Crear el nombre del archivo a partir de la fecha
const nombreArchivo = `${dia}_${mes}.efe`;
console.log(nombreArchivo);
// Ruta a la carpeta de efemérides
const rutaArchivo = `Efemerides/${nombreArchivo}`;

// Usar Fetch API para cargar el archivo de efemérides
fetch(rutaArchivo)
    .then(response => {
        // Verificar si el archivo existe
        if (!response.ok) {
            throw new Error('No se encontró una efeméride para esta fecha.');
        }
        return response.text();
    })
    .then(data => {
        // Mostrar el contenido del archivo en la página
        document.getElementById('contenido_efemerides').innerHTML = `<pre>${data}</pre>`;
    })
    .catch(error => {
        // Mostrar un mensaje si no se encuentra el archivo
        document.getElementById('contenido_efemerides').innerHTML = `Error: ${error.message}`;
    });

