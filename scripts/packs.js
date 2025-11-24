// ============================================
// SCRIPT PARA LA PÁGINA DE PAQUETES
// ============================================

document.addEventListener("DOMContentLoaded", function() {
    console.log("Página de paquetes cargada");
    
    // ---- TOGGLE FILTROS MÓVIL ----
    const btnToggleFiltros = document.getElementById("btnToggleFiltros");
    const panelFiltrosMobile = document.getElementById("panelFiltrosMobile");
    
    if (btnToggleFiltros && panelFiltrosMobile) {
        btnToggleFiltros.addEventListener("click", function() {
            btnToggleFiltros.classList.toggle("active");
            panelFiltrosMobile.classList.toggle("open");
        });
    }
    
    // ---- SISTEMA DE FILTRADO ----
    const listaPaquetes = document.getElementById("listaPaquetes");
    const todosLosPaquetes = document.querySelectorAll(".pack-item");
    
    // Función para aplicar filtros
    function aplicarFiltros() {
        // Obtener todos los checkboxes marcados
        const filtrosPais = Array.from(document.querySelectorAll('input[data-filter="pais"]:checked'))
            .map(input => input.value);
        const filtrosEstrellas = Array.from(document.querySelectorAll('input[data-filter="estrellas"]:checked'))
            .map(input => input.value);
        const filtrosTipo = Array.from(document.querySelectorAll('input[data-filter="tipo"]:checked'))
            .map(input => input.value);
        
        // Si no hay filtros seleccionados, mostrar todos
        const hayFiltros = filtrosPais.length > 0 || filtrosEstrellas.length > 0 || filtrosTipo.length > 0;
        
        todosLosPaquetes.forEach(paquete => {
            let mostrar = true;
            
            if (hayFiltros) {
                const paisPaquete = paquete.getAttribute("data-pais");
                const estrellasPaquete = paquete.getAttribute("data-estrellas");
                const tiposPaquete = paquete.getAttribute("data-tipo").split(" ");
                
                // Verificar país (si hay filtros de país)
                if (filtrosPais.length > 0) {
                    mostrar = mostrar && filtrosPais.includes(paisPaquete);
                }
                
                // Verificar estrellas (si hay filtros de estrellas)
                if (filtrosEstrellas.length > 0) {
                    mostrar = mostrar && filtrosEstrellas.includes(estrellasPaquete);
                }
                
                // Verificar tipo (si hay filtros de tipo)
                if (filtrosTipo.length > 0) {
                    const tieneAlgunTipo = filtrosTipo.some(tipo => tiposPaquete.includes(tipo));
                    mostrar = mostrar && tieneAlgunTipo;
                }
            }
            
            // Mostrar u ocultar el paquete
            if (mostrar) {
                paquete.classList.remove("hidden");
            } else {
                paquete.classList.add("hidden");
            }
        });
    }
    
    // Aplicar filtros en tiempo real (desktop)
    document.querySelectorAll('.panel-filtros-lateral input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener("change", aplicarFiltros);
    });
    
    // Botón aplicar filtros (móvil/tablet)
    const btnAplicarFiltros = document.getElementById("btnAplicarFiltros");
    if (btnAplicarFiltros) {
        btnAplicarFiltros.addEventListener("click", function() {
            // Sincronizar los checkboxes del panel móvil con el filtrado
            const checkboxesMobile = document.querySelectorAll('.panel-filtros-mobile input[type="checkbox"]');
            checkboxesMobile.forEach(checkbox => {
                const value = checkbox.value;
                const filter = checkbox.getAttribute("data-filter");
                
                // Marcar/desmarcar el checkbox correspondiente en el panel lateral (si existe)
                const checkboxDesktop = document.querySelector(
                    `.panel-filtros-lateral input[value="${value}"][data-filter="${filter}"]`
                );
                if (checkboxDesktop) {
                    checkboxDesktop.checked = checkbox.checked;
                }
            });
            
            aplicarFiltros();
            
            // Cerrar el panel de filtros móviles
            if (panelFiltrosMobile) {
                panelFiltrosMobile.classList.remove("open");
                btnToggleFiltros.classList.remove("active");
            }
        });
    }
    
    // Botón limpiar filtros (móvil)
    const btnLimpiarFiltros = document.getElementById("btnLimpiarFiltros");
    if (btnLimpiarFiltros) {
        btnLimpiarFiltros.addEventListener("click", function() {
            document.querySelectorAll('.panel-filtros-mobile input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            document.querySelectorAll('.panel-filtros-lateral input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            aplicarFiltros();
        });
    }
    
    // Botón limpiar filtros (desktop)
    const btnLimpiarFiltrosDesktop = document.getElementById("btnLimpiarFiltrosDesktop");
    if (btnLimpiarFiltrosDesktop) {
        btnLimpiarFiltrosDesktop.addEventListener("click", function() {
            document.querySelectorAll('.panel-filtros-lateral input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            document.querySelectorAll('.panel-filtros-mobile input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            aplicarFiltros();
        });
    }
    
    // Sincronizar checkboxes entre panel móvil y desktop
    function sincronizarCheckboxes() {
        const checkboxesMobile = document.querySelectorAll('.panel-filtros-mobile input[type="checkbox"]');
        const checkboxesDesktop = document.querySelectorAll('.panel-filtros-lateral input[type="checkbox"]');
        
        checkboxesMobile.forEach((checkboxMobile, index) => {
            checkboxMobile.addEventListener("change", function() {
                if (checkboxesDesktop[index]) {
                    checkboxesDesktop[index].checked = checkboxMobile.checked;
                }
            });
        });
    }
    
    sincronizarCheckboxes();
});