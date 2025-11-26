document.addEventListener('DOMContentLoaded', () => {
    cargarDetalleArticulo();
});

async function cargarDetalleArticulo() {
    // 1. Obtener el ID de la URL (ej: articulo_detalle.html?id=2)
    const params = new URLSearchParams(window.location.search);
    const idArticulo = params.get('id');

    const contenedor = document.getElementById('contenido-dinamico-detalle');

    if (!idArticulo) {
        contenedor.innerHTML = "<p>Artículo no especificado.</p>";
        return;
    }

    try {
        // 2. Cargar JSON
        const respuesta = await fetch('data/articulos.json');
        const articulos = await respuesta.json();

        // 3. Buscar el artículo que coincida con el ID
        // Convertimos a string para asegurar la comparación
        const articulo = articulos.find(a => a.id.toString() === idArticulo);

        if (articulo) {
            // 4. Inyectar HTML
            document.getElementById('detalle-img').src = articulo.imagen;
            document.getElementById('detalle-titulo').textContent = articulo.titulo;
            
            // Usamos innerHTML para el cuerpo por si ponemos <br> o negritas
            document.getElementById('detalle-cuerpo').innerHTML = articulo.texto_completo || articulo.descripcion;

            // Actualizar título de la pestaña del navegador
            document.title = articulo.titulo + " - Mochileros";
        } else {
            contenedor.innerHTML = "<p>Artículo no encontrado.</p>";
        }

    } catch (error) {
        console.error("Error:", error);
        contenedor.innerHTML = "<p>Error al cargar el artículo.</p>";
    }
}