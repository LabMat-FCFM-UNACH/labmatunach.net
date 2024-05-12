//Menu 
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

// Circulitos

document.addEventListener("DOMContentLoaded", function() {
    const scrollImg = document.querySelector(".scroll__img");
    const scrollIndicators = document.querySelector(".scroll__indicators");

    const images = document.querySelectorAll(".actividades__img");
    const numImages = images.length;

    // Crear los indicadores
    for (let i = 0; i < numImages; i++) {
        const indicator = document.createElement("div");
        indicator.classList.add("scroll__indicator");
        scrollIndicators.appendChild(indicator);
    }

    // Función para actualizar los indicadores
    function updateIndicators() {
        const scrollLeft = scrollImg.scrollLeft;
        const imgWidth = scrollImg.offsetWidth;
        const imgIndex = Math.round(scrollLeft / imgWidth);
        const indicators = document.querySelectorAll(".scroll__indicator");

        indicators.forEach((indicator, index) => {
            if (index === imgIndex) {
                indicator.classList.add("active");
            } else {
                indicator.classList.remove("active");
            }
        });
    }

    // Actualizar los indicadores al hacer scroll
    scrollImg.addEventListener("scroll", updateIndicators);

    // Actualizar los indicadores al cargar la página
    updateIndicators();
});

document.addEventListener("DOMContentLoaded", function () {
    const scrollImages = document.querySelectorAll(".actividades__img");
    const scrollIndicators = document.querySelectorAll(".scroll__indicator");

    scrollIndicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
            scrollImages.forEach((image, imageIndex) => {
                if (imageIndex === index) {
                    image.scrollIntoView({ behavior: "smooth" });
                    indicator.classList.add("active");
                } else {
                    scrollIndicators[imageIndex].classList.remove("active");
                }
            });
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                scrollIndicators[index].classList.add("active");
            } else {
                scrollIndicators[index].classList.remove("active");
            }
        });
    }, { threshold: 0.5 });

    scrollImages.forEach(image => {
        observer.observe(image);
    });
});


