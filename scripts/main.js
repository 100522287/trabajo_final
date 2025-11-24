document.addEventListener("DOMContentLoaded", function() {
    // Iniciar Carrusel
    carrusel();
});

// --- FUNCIÓN CARRUSEL (CARGA DINÁMICA JSON) ---
async function carrusel() {
    console.log("Iniciando carrusel de artículos...");

    const track = document.getElementById("track-articulos");
    const botonIzq = document.getElementById("boton_izq_articulos");
    const botonDer = document.getElementById("boton_der_articulos");

    // Verificación de seguridad
    if (!track || !botonIzq || !botonDer) {
        console.error("No se encuentran los elementos del carrusel en el HTML");
        return;
    }

    // 1. CARGAR DATOS DESDE JSON (AJAX/Fetch)
    try {
        // Pide los datos al archivo
        const response = await fetch('data/articulos.json');
        
        // Si hay error en la red
        if (!response.ok) throw new Error('No se pudo cargar articulos.json');
        
        const articulos = await response.json();
        
        // Generar HTML dinámicamente
        let htmlContent = "";
        articulos.forEach(art => {
            htmlContent += `
                <div class="tarjeta-articulo">
                    <div class="articulo-img">
                        <img src="${art.imagen}" alt="${art.titulo}">
                    </div>
                    <div class="articulo-info">
                        <h4 data-lang="${art.lang_id_titulo}">${art.titulo}</h4>
                        <p data-lang="${art.lang_id_desc}">${art.descripcion}</p>
                    </div>
                </div>
            `;
        });
        
        // Inyectar el HTML en la página
        track.innerHTML = htmlContent;

    } catch (error) {
        console.error("Error cargando los artículos:", error);
        // Fallback visual por si algo falla
        track.innerHTML = "<p style='padding:20px'>Cargando artículos...</p>";
    }

    // 2. FUNCIONES DE MOVIMIENTO
    function obtenerAnchoDesplazamiento() {
        const tarjeta = track.querySelector('.tarjeta-articulo');
        return tarjeta ? tarjeta.offsetWidth + 30 : 300; 
    }

    function avanzar() {
        track.scrollBy({ left: obtenerAnchoDesplazamiento(), behavior: 'smooth' });
    }

    function retroceder() {
        track.scrollBy({ left: -obtenerAnchoDesplazamiento(), behavior: 'smooth' });
    }

    // 3. EVENT LISTENERS
    botonDer.addEventListener("click", avanzar);
    botonIzq.addEventListener("click", retroceder);
}