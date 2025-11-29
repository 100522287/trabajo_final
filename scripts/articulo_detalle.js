document.addEventListener('DOMContentLoaded', () => {
    cargarDetalleArticulo();
});

function cargarDetalleArticulo() {
    // 1. Obtener el ID de la URL (ej: articulo_detalle.html?id=2)
    const params = new URLSearchParams(window.location.search);
    const idArticulo = params.get('id');

    const contenedor = document.getElementById('contenido-dinamico-detalle');

    if (!idArticulo) {
        if(contenedor) contenedor.innerHTML = "<p style='padding:40px; text-align:center;'>No se ha especificado ningún artículo.</p>";
        return;
    }

    // 2. Verificar si tenemos los datos incrustados
    if (!window.datosArticulos) {
        console.error("No se encontraron los datos (window.datosArticulos)");
        if(contenedor) contenedor.innerHTML = "<p style='padding:40px; text-align:center;'>Error de datos.</p>";
        return;
    }

    try {
        // 3. Buscar el artículo que coincida con el ID
        const articulos = window.datosArticulos;
        const articulo = articulos.find(a => a.id.toString() === idArticulo);

        if (articulo) {
            // 4. Inyectar HTML
            const img = document.getElementById('detalle-img');
            const titulo = document.getElementById('detalle-titulo');
            const cuerpo = document.getElementById('detalle-cuerpo');

            if(img) img.src = articulo.imagen;
            if(titulo) titulo.textContent = articulo.titulo;
            
            // Usamos innerHTML para respetar saltos de línea <br>
            if(cuerpo) cuerpo.innerHTML = articulo.texto_completo || articulo.descripcion;

            // Actualizar título de la pestaña del navegador
            document.title = articulo.titulo + " - Mochileros";
        } else {
            if(contenedor) contenedor.innerHTML = "<p style='padding:40px; text-align:center;'>Artículo no encontrado.</p>";
        }

    } catch (error) {
        console.error("Error:", error);
        if(contenedor) contenedor.innerHTML = "<p style='padding:40px; text-align:center;'>Error al cargar el artículo.</p>";
    }
}