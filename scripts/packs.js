// ============================================
// BASE DE DATOS DE PAQUETES (DB)
// ============================================
const dbPacks = [
    {
        id: "hungria",
        titulo: "Europa Imperial (Viena y Budapest)",
        descripcion: "Sumérgete en la grandeza del Imperio Austrohúngaro. Visita palacios imperiales, baños termales y disfruta de la mejor gastronomía centroeuropea.",
        precio: "950€",
        imagen: "images/budapest.jpg",
        pais: "hungria",
        estrellas: "4",
        tipo: "ciudad",
        detalles: ["8 días / 7 noches", "Tren alta velocidad", "Hoteles 4* céntricos", "Guía en español", "Desayuno incluido"]
    },
    {
        id: "italia",
        titulo: "Renacimiento Italiano (Florencia y Roma)",
        descripcion: "Recorre la cuna del Renacimiento y el corazón de la antigua Roma. Arte, historia y la mejor cocina italiana te esperan.",
        precio: "1.120€",
        imagen: "images/roma.jpg",
        pais: "italia",
        estrellas: "3",
        tipo: "ciudad",
        detalles: ["9 días / 8 noches", "Bed & Breakfast", "Museos Vaticanos", "Galería Uffizi", "Tours guiados"]
    },
    {
        id: "japon",
        titulo: "Magia Asiática (Tokio y Kioto)",
        descripcion: "Explora el contraste entre tradición y modernidad. Desde templos ancestrales hasta la vibrante vida urbana de Tokio.",
        precio: "2.400€",
        imagen: "images/kioto.jpg",
        pais: "japon",
        estrellas: "5",
        tipo: "ciudad",
        detalles: ["15 días / 14 noches", "Vuelos multidestino", "Ryokan en Kioto", "JR Pass incluido", "Ceremonia del té"]
    },
    {
        id: "peru",
        titulo: "Aventura Andina (Cuzco y Machu Picchu)",
        descripcion: "Descubre las maravillas del Imperio Inca. Camina por el Camino Inca y maravíllate con Machu Picchu al amanecer.",
        precio: "1.850€",
        imagen: "images/cuzco.jpg",
        pais: "peru",
        estrellas: "3",
        tipo: "montana aventura",
        detalles: ["11 días / 10 noches", "Vuelos incluidos", "Machu Picchu", "Camino Inca 2 días", "Lago Titicaca"]
    },
    {
        id: "kenia",
        titulo: "Safari en Kenia",
        descripcion: "Vive la experiencia de ver los Big Five en su hábitat natural. Safari fotográfico en los mejores parques nacionales de África.",
        precio: "2.150€",
        imagen: "images/safari.webp",
        pais: "kenia",
        estrellas: "4",
        tipo: "aventura",
        detalles: ["10 días / 9 noches", "Rutas en 4x4 privado", "Camping de lujo", "Parque Masai Mara", "Visita poblado Masai"]
    },
    {
        id: "eeuu",
        titulo: "Costa Oeste USA",
        descripcion: "Descubre la costa del Pacífico desde San Francisco hasta Los Ángeles. Playas, montañas y ciudades icónicas.",
        precio: "1.680€",
        imagen: "images/hollywood.jpg", // Corregido: antes apuntaba a Paris por error
        pais: "eeuu",
        estrellas: "4",
        tipo: "ciudad playa",
        detalles: ["12 días / 11 noches", "Ruta en coche", "Hoteles 4* seleccionados", "Golden Gate", "Hollywood y Santa Mónica"]
    },
    {
        id: "marruecos",
        titulo: "La Perla Azul (Basado en Chefchaouen)",
        descripcion: "Descubre la ciudad más fotogénica de Marruecos. Pasea por sus calles azules y sumérgete en la auténtica cultura bereber.",
        precio: "720€",
        imagen: "images/chefchaouen.jpg",
        pais: "marruecos",
        estrellas: "3",
        tipo: "ciudad",
        detalles: ["5 días / 4 noches", "Vuelos a Tánger", "Traslados privados", "Alojamiento (Riad)", "Desayunos incluidos", "Tour guiado"]
    },
    {
        id: "nueva-zelanda",
        titulo: "Aventura en las Antípodas (Queenstown)",
        descripcion: "Vive la capital de la aventura de Nueva Zelanda. Paisajes épicos, deportes extremos y naturaleza en estado puro.",
        precio: "2.100€",
        imagen: "images/queenstown.jpg",
        pais: "nueva-zelanda",
        estrellas: "4",
        tipo: "aventura montana",
        detalles: ["8 días / 7 noches", "Apartamento con vistas", "Salto Bungee", "Crucero Milford Sound", "Alquiler coche (SUV)", "Sin vuelo internacional"]
    },
    {
        id: "republica-checa",
        titulo: "Cuentos de Bohemia (Praga)",
        descripcion: "Sumérgete en la magia de Praga, la ciudad de las cien torres. Arquitectura gótica, cerveza bohemia y un encanto medieval único.",
        precio: "1.680€",
        imagen: "images/praga.webp",
        pais: "republica-checa",
        estrellas: "5",
        tipo: "ciudad",
        detalles: ["6 días / 5 noches", "Vuelos directos", "Hotel céntrico 5*", "Paseo en barco", "Castillo de Praga", "Tour Ciudad Vieja"]
    }
];

// ============================================
// LÓGICA DE LA PÁGINA
// ============================================

document.addEventListener("DOMContentLoaded", function() {
    console.log("Cargando packs desde JS...");
    
    // 1. Cargar los paquetes en el DOM
    cargarPacks();

    // 2. Inicializar lógica de filtros (Toggle Móvil)
    inicializarToggleMobile();

    // 3. Inicializar listeners de filtros
    inicializarFiltros();
});

function cargarPacks() {
    const contenedor = document.getElementById("listaPaquetes");
    if (!contenedor) return;

    let htmlContent = "";

    dbPacks.forEach(pack => {
        // Generar lista de características (li)
        const detallesHtml = pack.detalles.map(d => `<li>${d}</li>`).join("");

        // Construir HTML de la tarjeta
        // IMPORTANTE: Ponemos los data-attributes aquí para que el filtro funcione
        htmlContent += `
            <article class="pack-item" data-pais="${pack.pais}" data-estrellas="${pack.estrellas}" data-tipo="${pack.tipo}">
                <div class="pack-imagen">
                    <img src="${pack.imagen}" alt="${pack.titulo}" loading="lazy">
                    <span class="etiqueta-precio">Desde ${pack.precio}</span>
                </div>
                <div class="pack-info">
                    <h3>${pack.titulo}</h3>
                    <p class="pack-descripcion">${pack.descripcion}</p>
                    <ul class="pack-detalles">
                        ${detallesHtml}
                    </ul>
                    <a href="compra.html?id=${pack.id}" class="btn-comprar">Comprar</a>
                </div>
            </article>
        `;
    });

    contenedor.innerHTML = htmlContent;
}

function inicializarToggleMobile() {
    const btnToggle = document.getElementById("btnToggleFiltros");
    const panelMobile = document.getElementById("panelFiltrosMobile");
    
    if (btnToggle && panelMobile) {
        btnToggle.addEventListener("click", function() {
            btnToggle.classList.toggle("active");
            panelMobile.classList.toggle("open");
        });
    }
}

function inicializarFiltros() {
    // Listeners para checkboxes Desktop (tiempo real)
    document.querySelectorAll('.panel-filtros-lateral input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener("change", aplicarFiltros);
    });

    // Botón Aplicar (Móvil)
    const btnAplicar = document.getElementById("btnAplicarFiltros");
    if (btnAplicar) {
        btnAplicar.addEventListener("click", function() {
            sincronizarCheckboxes("mobile-to-desktop");
            aplicarFiltros();
            // Cerrar panel móvil
            document.getElementById("panelFiltrosMobile").classList.remove("open");
            document.getElementById("btnToggleFiltros").classList.remove("active");
        });
    }

    // Botones Limpiar
    const btnLimpiarDesktop = document.getElementById("btnLimpiarFiltrosDesktop");
    const btnLimpiarMobile = document.getElementById("btnLimpiarFiltros");

    const limpiarTodo = () => {
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        aplicarFiltros();
    };

    if (btnLimpiarDesktop) btnLimpiarDesktop.addEventListener("click", limpiarTodo);
    if (btnLimpiarMobile) btnLimpiarMobile.addEventListener("click", limpiarTodo);

    // Sincronización básica inicial (Mobile -> Desktop al cambiar)
    document.querySelectorAll('.panel-filtros-mobile input[type="checkbox"]').forEach((cbMobile, index) => {
        cbMobile.addEventListener("change", () => {
            const cbDesktop = document.querySelectorAll('.panel-filtros-lateral input[type="checkbox"]')[index];
            if (cbDesktop) cbDesktop.checked = cbMobile.checked;
        });
    });
}

function aplicarFiltros() {
    // Seleccionamos los paquetes AHORA (porque se acaban de crear dinámicamente)
    const paquetesEnDom = document.querySelectorAll(".pack-item");
    
    // Obtener valores marcados
    const paises = obtenerValoresMarcados("pais");
    const estrellas = obtenerValoresMarcados("estrellas");
    const tipos = obtenerValoresMarcados("tipo");

    const hayFiltros = paises.length > 0 || estrellas.length > 0 || tipos.length > 0;

    paquetesEnDom.forEach(pack => {
        if (!hayFiltros) {
            pack.classList.remove("hidden");
            return;
        }

        const pPais = pack.dataset.pais;
        const pEstrellas = pack.dataset.estrellas;
        const pTipos = pack.dataset.tipo.split(" "); // Puede tener varios tipos separados por espacio

        // Lógica de filtrado (AND entre categorías, OR dentro de categoría)
        const matchPais = paises.length === 0 || paises.includes(pPais);
        const matchEstrellas = estrellas.length === 0 || estrellas.includes(pEstrellas);
        const matchTipo = tipos.length === 0 || tipos.some(t => pTipos.includes(t));

        if (matchPais && matchEstrellas && matchTipo) {
            pack.classList.remove("hidden");
        } else {
            pack.classList.add("hidden");
        }
    });
}

function obtenerValoresMarcados(dataFilter) {
    // Usamos querySelectorAll sobre los inputs visibles o generales. 
    // Como están sincronizados, podemos leer solo los del panel lateral (desktop) que siempre existen en el DOM
    return Array.from(document.querySelectorAll(`.panel-filtros-lateral input[data-filter="${dataFilter}"]:checked`))
        .map(input => input.value);
}

// Sincronizador auxiliar
function sincronizarCheckboxes(direccion) {
    const mobileCBS = document.querySelectorAll('.panel-filtros-mobile input[type="checkbox"]');
    const desktopCBS = document.querySelectorAll('.panel-filtros-lateral input[type="checkbox"]');

    if (direccion === "mobile-to-desktop") {
        mobileCBS.forEach((cb, i) => { if(desktopCBS[i]) desktopCBS[i].checked = cb.checked; });
    }
}