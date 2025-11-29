document.addEventListener('DOMContentLoaded', () => {
    cargarArticulosGrid();
});

function cargarArticulosGrid() {
    const contenedor = document.getElementById('contenedor-grid-articulos');
    
    // Verificación de seguridad
    if (!contenedor) return;

    // Verificamos si los datos existen en la variable global
    if (!window.datosArticulos) {
        console.error("No se encontraron los datos (window.datosArticulos)");
        contenedor.innerHTML = "<p>Error: Datos no encontrados.</p>";
        return;
    }

    try {
        // USAMOS LA VARIABLE GLOBAL DIRECTAMENTE
        const articulos = window.datosArticulos;
        
        let htmlContent = '';

        articulos.forEach(art => {
            htmlContent += `
                <article class="articulo-completo">
                    <img src="${art.imagen}" alt="${art.titulo}">
                    <div class="contenido-art">
                        <h3 data-lang="${art.lang_id_titulo}">${art.titulo}</h3>
                        <p data-lang="${art.lang_id_desc}">${art.descripcion}</p>
                        <a href="articulo_detalle.html?id=${art.id}">Leer más &rarr;</a>
                    </div>
                </article>
            `;
        });

        contenedor.innerHTML = htmlContent;

    } catch (error) {
        console.error("Error cargando artículos:", error);
        contenedor.innerHTML = "<p>Cargando artículos...</p>";
    }
}