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

//Eventos
const boxGaleria1 = document.querySelector(".box__galeria1");
const eventosDisplay1 = document.querySelector(".eventos__display1");
const boxGaleria2 = document.querySelector(".box__galeria2");
const eventosDisplay2 = document.querySelector(".eventos__display2");
const boxGaleria3 = document.querySelector(".box__galeria3");
const eventosDisplay3 = document.querySelector(".eventos__display3");
const boxGaleria4 = document.querySelector(".box__galeria4");
const eventosDisplay4 = document.querySelector(".eventos__display4");
const boxGaleria5 = document.querySelector(".box__galeria5");
const eventosDisplay5 = document.querySelector(".eventos__display5");
const boxGaleria6 = document.querySelector(".box__galeria6");
const eventosDisplay6 = document.querySelector(".eventos__display6");

// Función para manejar el menú contextual
function manejarMenu(navItem, menuContextual, flecha) {
    let isSmallScreen = window.innerWidth <= 950;

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
            //document.addEventListener("click", clickOutsideHandler);
        } else {
            navItem.removeEventListener("click", toggleMenu);
            //document.removeEventListener("click", clickOutsideHandler);
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

    /*function clickOutsideHandler(event) {
        if (!navItem.contains(event.target) && !menuContextual.contains(event.target) && !slider.contains(event.target)) {
            ocultarMenu();
        }
    }*/

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
        isSmallScreen = window.innerWidth <= 950;
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


//Email

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


//Eventos

boxGaleria1.addEventListener("mouseover",()=>{
   eventosDisplay1.classList.toggle("info");
});

if(window.innerWidth <= 950){
   boxGaleria1.addEventListener("click",()=>{
       eventosDisplay1.classList.toggle("info");
   })
};

boxGaleria1.addEventListener("mouseout",()=>{
   eventosDisplay1.classList.toggle("info");
});

boxGaleria2.addEventListener("mouseover",()=>{
   eventosDisplay2.classList.toggle("info");
});

if(window.innerWidth <= 950){
   boxGaleria2.addEventListener("click",()=>{
       eventosDisplay2.classList.toggle("info");
   })
};

boxGaleria2.addEventListener("mouseout",()=>{
   eventosDisplay2.classList.toggle("info");
});

/*boxGaleria3.addEventListener("mouseover",()=>{
   eventosDisplay3.classList.toggle("info");
});

boxGaleria3.addEventListener("mouseout",()=>{
   eventosDisplay3.classList.toggle("info");
});

boxGaleria4.addEventListener("mouseover",()=>{
   eventosDisplay4.classList.toggle("info");
});

boxGaleria4.addEventListener("mouseout",()=>{
   eventosDisplay4.classList.toggle("info");
});

boxGaleria5.addEventListener("mouseover",()=>{
   eventosDisplay5.classList.toggle("info");
});

boxGaleria5.addEventListener("mouseout",()=>{
   eventosDisplay5.classList.toggle("info");
});

boxGaleria6.addEventListener("mouseover",()=>{
   eventosDisplay6.classList.toggle("info");
});

boxGaleria6.addEventListener("mouseout",()=>{
   eventosDisplay6.classList.toggle("info");
});*/
