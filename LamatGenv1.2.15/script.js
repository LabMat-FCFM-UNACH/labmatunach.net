const bestiario = document.getElementById("bestiario");
const navLateral = document.querySelector(".nav__lateral");
const spans = document.querySelectorAll("span");
const change = document.querySelector(".switch");
const circulo = document.querySelector(".circulo");
const openMenu = document.getElementById("open-menu");
const closeMenu = document.querySelector(".close-menu");
const main = document.querySelector("main")
/*var elemento = document.getElementById('elemento');*/
 
//Modo oscuro 
change.addEventListener("click",()=>{
   let body = document.body;
   body.classList.toggle("dark-mode");
   circulo.classList.toggle("activado");
});

//Desplazamiento del nav
bestiario.addEventListener("click",()=>{
   navLateral.classList.toggle("min-nav-lateral");
   main.classList.toggle("min-main")
   spans.forEach((span)=>{
       span.classList.toggle("oculto");
   });
   
   bestiario.classList.toggle("rotate");
});

/*Menu movil*/
openMenu.addEventListener("click",()=>{
   navLateral.classList.toggle("open");
});

closeMenu.addEventListener("click",()=>{
   navLateral.classList.toggle("open");
});


/*if (elemento.classList.contains('open')){
   document.addEventListener('click', function(event) {
       const elemen = document.getElementById('elemento');
       const clicFuera = !elemen.contains(event.target);

       if (clicFuera) {
           alert('Hiciste clic fuera del elemento!');
       }
   });
}*/
