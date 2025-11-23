// --- FUNCIÓN CARRUSEL (ESTILO SOLICITADO) ---
function carrusel() {
    console.log("Iniciando carrusel de artículos...");

    // 1. DATOS DEL CARRUSEL (ARRAYS)
    // Usamos las claves de traducción para que el idioma cambie dinámicamente
    const imagenesArticulos = [
        "images/copenhagen.jpg",
        "images/chefchaouen.jpg",
        "images/sevilla.jpg",
        "images/paris.jpg"
    ];
    
    const titulosKeys = ["art1_title", "art2_title", "art3_title", "art4_title"];
    const descKeys = ["art1_desc", "art2_desc", "art3_desc", "art4_desc"];

    // Elementos del DOM
    let track = document.getElementById("track-articulos");
    let botonIzq = document.getElementById("boton_izq_articulos");
    let botonDer = document.getElementById("boton_der_articulos");

    // Verificación
    if (!track || !botonIzq || !botonDer) {
        console.error("Elementos del carrusel no encontrados");
        return;
    }

    // 2. FUNCIÓN DE CARGA (Genera el HTML dinámicamente)
    function cargarArticulos() {
        let htmlContent = "";
        
        for (let i = 0; i < imagenesArticulos.length; i++) {
            // Obtenemos el texto inicial en español del diccionario para pintarlo la primera vez
            let tituloTexto = translations['es'][titulosKeys[i]];
            let descTexto = translations['es'][descKeys[i]];

            htmlContent += `
                <div class="tarjeta-articulo">
                    <div class="articulo-img">
                        <img src="${imagenesArticulos[i]}" alt="Articulo ${i}">
                    </div>
                    <div class="articulo-info">
                        <!-- Importante: Añadimos data-lang para que el traductor funcione después -->
                        <h4 data-lang="${titulosKeys[i]}">${tituloTexto}</h4>
                        <p data-lang="${descKeys[i]}">${descTexto}</p>
                    </div>
                </div>
            `;
        }
        track.innerHTML = htmlContent;
    }

    // 3. FUNCIONES DE MOVIMIENTO (Scroll)
    function obtenerAnchoDesplazamiento() {
        let tarjeta = track.querySelector('.tarjeta-articulo');
        if (tarjeta) {
            return tarjeta.offsetWidth + 30; // ancho + gap
        }
        return 300;
    }

    function avanzar() {
        let desplazamiento = obtenerAnchoDesplazamiento();
        track.scrollLeft += desplazamiento;
    }

    function retroceder() {
        let desplazamiento = obtenerAnchoDesplazamiento();
        track.scrollLeft -= desplazamiento;
    }

    // 4. EVENT LISTENERS
    botonDer.addEventListener("click", avanzar);
    botonIzq.addEventListener("click", retroceder);

    // Cargar los artículos al iniciar
    cargarArticulos();
}

document.addEventListener("DOMContentLoaded", function() {
    // Iniciar Carrusel
    carrusel();
});