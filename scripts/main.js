// Función principal para manejar el carrusel de artículos
function iniciarCarruselArticulos() {
    console.log("Iniciando carrusel de artículos...");

    // Obtenemos los elementos del DOM
    let track = document.getElementById("track-articulos");
    let botonIzq = document.getElementById("boton_izq_articulos");
    let botonDer = document.getElementById("boton_der_articulos");

    // Verificamos si los elementos existen
    if (!track || !botonIzq || !botonDer) {
        console.error("No se encontraron elementos del carrusel");
        return;
    }

    // Función para calcular cuánto desplazar
    // Esto es dinámico según si es móvil, tablet o PC
    function obtenerAnchoDesplazamiento() {
        let tarjeta = track.querySelector('.tarjeta-articulo');
        if (tarjeta) {
            // Ancho de la tarjeta + el gap (hueco) de 20px definido en CSS
            return tarjeta.offsetWidth + 20; 
        }
        return 300; // Valor por defecto si falla
    }

    // Función avanzar
    function moverDerecha() {
        let desplazamiento = obtenerAnchoDesplazamiento();
        console.log("Moviendo derecha:", desplazamiento + "px");
        track.scrollLeft += desplazamiento;
    }

    // Función retroceder
    function moverIzquierda() {
        let desplazamiento = obtenerAnchoDesplazamiento();
        console.log("Moviendo izquierda:", desplazamiento + "px");
        track.scrollLeft -= desplazamiento;
    }

    // Añadir event listeners a los botones
    botonDer.addEventListener("click", moverDerecha);
    botonIzq.addEventListener("click", moverIzquierda);
}

// Ejecutar lógica al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    // Iniciamos el carrusel
    iniciarCarruselArticulos();

    // Podemos añadir aquí más lógica si fuera necesario, 
    // similar a la función login() de tu ejemplo
});