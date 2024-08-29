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
let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');
console.log("Script inline cargado");
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
        if (!navItem.contains(event.target) && !menuContextual.contains(event.target) && !slider.contains(event.target)) {
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

let refreshInterval = setInterval(() => { next.click() }, 3000);

function reloadSlider() {
    slider.style.left = -items[active].offsetLeft + 'px';
    let last_active_dot = document.querySelector('.slider .dots li.active');
    if (last_active_dot) last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => { next.click() }, 3000);
}

dots.forEach((li, key) => {
    li.addEventListener('click', (event) => {
        stopPropagation(event);
        active = key;
        reloadSlider();
    });
});

window.onresize = function () {
    reloadSlider();
};

// Fecha actual
var fechaActual = new Date();
var dia = fechaActual.getDate();
var mes = fechaActual.getMonth() + 1;
var año = fechaActual.getFullYear();
var fechaFormateada = dia + "/" + mes + "/" + año;
document.getElementById("fecha_actual").innerHTML = "La fecha actual es: " + fechaFormateada;


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();

        // Verificar que todos los campos estén llenos
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;

        if (!nombre || !email || !mensaje) {
            alert('Por favor, completa todos los campos antes de enviar el formulario.');
            return;
        }

        // Capturar los datos del formulario
        const formData = {
            nombre: nombre,
            email: email,
            mensaje: mensaje
        };

        console.log("Enviando formulario con los siguientes datos:", formData);

        // Enviar los datos a través de EmailJS
        emailjs.send('service_illu4u1', 'template_6uir7wk', formData)
            .then(function (response) {
                console.log('Éxito:', response.status, response.text);
                alert('Mensaje enviado con éxito!');
                document.getElementById('contact-form').reset(); // Limpiar el formulario después del envío
            }, function (error) {
                console.error('Error al enviar el mensaje:', error);
                alert('Error al enviar el mensaje: ' + JSON.stringify(error));
            });
    });
});

