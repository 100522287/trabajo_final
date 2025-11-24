document.addEventListener('DOMContentLoaded', () => {
    cargarArticulosGrid();
});

async function cargarArticulosGrid() {
    const contenedor = document.getElementById('contenedor-grid-articulos');
    
    // Verificación: Si no estamos en la página correcta, salir
    if (!contenedor) return;

    try {
        // Cargar datos
        const respuesta = await fetch('data/articulos.json');
        if (!respuesta.ok) throw new Error('Error al cargar JSON');
        
        const articulos = await respuesta.json();
        let htmlContent = '';

        // Generar HTML
        articulos.forEach(art => {
            htmlContent += `
                <article class="articulo-completo">
                    <img src="${art.imagen}" alt="${art.titulo}">
                    <div class="contenido-art">
                        <h3 data-lang="${art.lang_id_titulo}">${art.titulo}</h3>
                        <p data-lang="${art.lang_id_desc}">${art.descripcion}</p>
                        <a href="#">Leer más &rarr;</a>
                    </div>
                </article>
            `;
        });

        // Pintar en pantalla
        contenedor.innerHTML = htmlContent;

    } catch (error) {
        console.error("Error JS:", error);
        contenedor.innerHTML = "<p>No se pudieron cargar los artículos.</p>";
    }
}