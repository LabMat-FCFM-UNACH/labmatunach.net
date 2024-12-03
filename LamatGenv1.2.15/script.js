const header = document.querySelector("#header");
const openMenu = document.querySelector("#open-icon");
const closeMenu = document.getElementById("close-icon");
const body = document.body;

// Abre el menú al hacer clic en el icono de abrir
openMenu.addEventListener("click", (event) => {
    header.classList.toggle("desplazar");
    
    // Si se abre el menú, añadir un evento al body
    if (header.classList.contains('desplazar')) {
        body.addEventListener("click", closeMenuHandler);
    }

    // Evitar que el clic en el icono de abrir cierre el menú inmediatamente
    event.stopPropagation();
});

// Cierra el menú al hacer clic en el icono de cerrar
closeMenu.addEventListener("click", (event) => {
    closeMenuHandler();
    event.stopPropagation(); // Evitar que el clic se propague al body
});

// Función para manejar el cierre del menú
function closeMenuHandler() {
    header.classList.remove("desplazar");
    body.removeEventListener("click", closeMenuHandler);
}

// Evitar que el body cierre el menú si se hace clic en el header
header.addEventListener("click", (event) => {
    event.stopPropagation();
});
