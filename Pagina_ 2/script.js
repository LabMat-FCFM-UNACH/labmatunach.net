document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav__item');

    // Función para mostrar el menú contextual
    function showContextMenu(event) {
        const contextMenu = event.currentTarget.querySelector('.context-menu');
        contextMenu.style.display = 'block';
    }

    // Función para ocultar el menú contextual
    function hideContextMenu(event) {
        const contextMenu = event.currentTarget.querySelector('.context-menu');
        contextMenu.style.display = 'none';
    }

    // Asociar la función showContextMenu al evento 'mouseenter' y hideContextMenu al evento 'mouseleave' de cada enlace
    navItems.forEach(item => {
        item.addEventListener('mouseenter', showContextMenu);
        item.addEventListener('mouseleave', hideContextMenu);
    });

    // Evitar que el menú contextual se oculte al hacer clic dentro de él
    document.querySelectorAll('.context-menu').forEach(menu => {
        menu.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    });

    // Ocultar el menú contextual al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        document.querySelectorAll('.context-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    });
});

// Crear un nuevo objeto Date que represente la fecha y hora actuales
var fechaActual = new Date();

    // Obtener los componentes de la fecha (día, mes y año)
var dia = fechaActual.getDate();
var mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0
var año = fechaActual.getFullYear();

    // Formatear la fecha en un formato legible
var fechaFormateada = dia + "/" + mes + "/" + año;

    // Mostrar la fecha en un elemento HTML
document.getElementById("fecha_actual").innerHTML = "La fecha actual es: " + fechaFormateada;

// Noticias

document.addEventListener("DOMContentLoaded", function() {
    const btnMostrarNoticias = document.getElementById("movil__button");
    const contenedorNoticias = document.querySelector(".nav");

    btnMostrarNoticias.addEventListener("click", function() {
        contenedorNoticias.classList.toggle("abierto");
    });
});
