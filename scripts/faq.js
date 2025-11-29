document.addEventListener('DOMContentLoaded', () => {
    cargarFAQ();
});

function cargarFAQ() {
    const contenedor = document.getElementById('contenedor-faq-dinamico');
    
    // Verificación de seguridad
    if (!contenedor) return;

    // Verificamos si los datos incrustados existen
    if (!window.datosFaq) {
        console.error("No se encontraron los datos de FAQ (window.datosFaq)");
        contenedor.innerHTML = "<p>Error: No hay datos disponibles.</p>";
        return;
    }

    try {
        // USAMOS LA VARIABLE GLOBAL DIRECTAMENTE
        const preguntas = window.datosFaq;

        // 2. Generar HTML
        let htmlContent = '';
        preguntas.forEach(item => {
            htmlContent += `
                <div class="faq-item">
                    <div class="faq-pregunta">
                        ${item.pregunta}
                    </div>
                    <div class="faq-respuesta">
                        <p>${item.respuesta}</p>
                    </div>
                </div>
            `;
        });
        contenedor.innerHTML = htmlContent;

        // 3. Activar el Acordeón
        activarAcordeon();

    } catch (error) {
        console.error("Error procesando FAQ:", error);
        contenedor.innerHTML = "<p>Lo sentimos, no pudimos cargar las preguntas frecuentes.</p>";
    }
}

function activarAcordeon() {
    const items = document.querySelectorAll('.faq-item');

    items.forEach(item => {
        const pregunta = item.querySelector('.faq-pregunta');
        
        pregunta.addEventListener('click', () => {
            // Opción: Cerrar otros al abrir uno (estilo acordeón estricto)
            // Descomenta esto si quieres que solo se abra uno a la vez
            /*
            items.forEach(otroItem => {
                if (otroItem !== item && otroItem.classList.contains('active')) {
                    otroItem.classList.remove('active');
                    otroItem.querySelector('.faq-respuesta').style.maxHeight = null;
                }
            });
            */

            // Abrir/Cerrar el actual
            item.classList.toggle('active');
            
            const respuesta = item.querySelector('.faq-respuesta');
            if (item.classList.contains('active')) {
                // Si está activo, le damos altura real
                respuesta.style.maxHeight = respuesta.scrollHeight + "px";
            } else {
                // Si no, altura 0
                respuesta.style.maxHeight = null;
            }
        });
    });
}