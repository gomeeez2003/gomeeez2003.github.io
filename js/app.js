/* ================================================
   PORTFOLIO ADRIÁN GÓMEZ — app.js
   Todo el código dentro de DOMContentLoaded para
   garantizar compatibilidad con el atributo defer.
   ================================================ */

let modalAbierto = false;

function cerrarModalLogica() {
    const modal = document.getElementById('modal-proyecto');
    const modalContenedor = document.getElementById('modal-info-container');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = '';
    if (modalContenedor) {
        // Detener vídeos al cerrar modal
        modalContenedor.querySelectorAll('iframe').forEach(iframe => {
            let clone = iframe.cloneNode(true);
            iframe.parentNode.replaceChild(clone, iframe);
        });
        modalContenedor.innerHTML = '';
    }
    modalAbierto = false;
}

// ---- NAVEGACIÓN POR HASH ----
function navegar(idPantalla) { window.location.hash = idPantalla; }

let primeraCarga = true;

window.addEventListener('hashchange', function() {
    let hash = window.location.hash.substring(1);

    if (modalAbierto && hash !== 'ventana-abierta' && hash !== 'lightbox-abierto') {
        cerrarModalLogica();
    }

    const lightboxElem = document.getElementById('lightbox');
    if (lightboxElem && lightboxElem.style.display === 'flex' && hash !== 'lightbox-abierto') {
        lightboxElem.style.display = 'none';
    }

    if (!hash) hash = 'pantalla-inicio';

    if (hash !== 'ventana-abierta' && hash !== 'lightbox-abierto') {
        const destino = document.getElementById(hash);
        if (destino && destino.classList.contains('page')) {
            if (!destino.classList.contains('active') || primeraCarga) {
                // Detener vídeos al cambiar de página
                document.querySelectorAll('.page.active iframe').forEach(iframe => {
                    let clone = iframe.cloneNode(true);
                    iframe.parentNode.replaceChild(clone, iframe);
                });

                document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
                destino.classList.add('active');
                if (!primeraCarga) window.scrollTo({ top: 0, behavior: 'smooth' });

                // Reanimar los scroll-reveal de la página recién activada
                destino.querySelectorAll('.scroll-reveal').forEach(el => {
                    el.classList.remove('visible');
                    // Pequeño delay para que el reflow ocurra antes de la animación
                    requestAnimationFrame(() => {
                        setTimeout(() => el.classList.add('visible'), 80);
                    });
                });
                
                primeraCarga = false;
            }
        }
    }
});

// ---- INICIALIZACIÓN AL CARGA ----
function initApp() {

    // --- Variables del DOM (safe, ya está cargado) ---
    const navMenu    = document.getElementById('nav-menu');
    const menuToggle = document.getElementById('menu-toggle');
    const modal      = document.getElementById('modal-proyecto');
    const modalContenedor = document.getElementById('modal-info-container');

    // ---- MENÚ HAMBURGUESA ----
    window.toggleMenu = function() {
        navMenu.classList.toggle('activo');
        menuToggle.classList.toggle('activo');
    };

    window.accionMenu = function(accion) {
        navMenu.classList.remove('activo');
        menuToggle.classList.remove('activo');
        if (accion === 'inicio')    { navegar('pantalla-inicio'); window.scrollTo(0,0); }
        else if (accion === 'proyectos') { navegar('pantalla-inicio'); setTimeout(() => document.getElementById('lista-categorias').scrollIntoView({behavior:'smooth', block:'start'}), 100); }
        else if (accion === 'buscar')   { navegar('pantalla-inicio'); setTimeout(() => { document.getElementById('buscador').scrollIntoView({behavior:'smooth', block:'center'}); document.getElementById('buscador').focus(); }, 100); }
        else if (accion === 'contacto') { navegar('pantalla-contacto'); }
    };

    // Cerrar menú al clicar fuera
    window.addEventListener('click', function(e) {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('activo');
            menuToggle.classList.remove('activo');
        }
    });

    // ---- BUSCADOR AVANZADO ----
    // Índice completo: cada entrada tiene título, palabras clave, ícono, breadcrumb y acción de navegación
    const SEARCH_INDEX = [
        // ── CATEGORÍAS PRINCIPALES ──────────────────────────────────────────
        { title: 'Mecánica de Precisión', icon: '⚙️', breadcrumb: 'Categoría',
          keys: 'mecanica precision soldadura carricoche ayuntamiento mecanizado chasis estructural tuerca tornillo', action: () => navegar('categoria-mecanica') },
        { title: 'Fabricación Aditiva y CAD', icon: '🧊', breadcrumb: 'Categoría',
          keys: '3d aditiva laminado nx siemens sputtering actuador flexible prototipado pneumaflex cad diseño', action: () => navegar('categoria-aditiva') },
        { title: 'Electrónica y Control', icon: '⚡', breadcrumb: 'Categoría',
          keys: 'electronica control arduino rc digifiz nixie flash pcb electromedicina osciloscopio mk2 circuito microcontrolador', action: () => navegar('categoria-electronica') },
        { title: 'Ciencia Aplicada e I+D', icon: '🔬', breadcrumb: 'Categoría',
          keys: 'ciencia investigacion id sputtering vacio plasma laser neon rubi nixie hv microscopio alto voltaje', action: () => navegar('categoria-ciencia') },

        // ── MECÁNICA — PROYECTOS ────────────────────────────────────────────
        { title: 'Turbici: Integración Turbina Jet', icon: '🚀', breadcrumb: 'Mecánica › Proyecto principal',
          keys: 'turbici turbina jet bici bicicleta chasis ligero soldadura tig mig adaptacion empuje combustion', action: () => navegar('proyecto-turbici-inicio') },
        { title: 'Turbici — Parte Mecánica y Chasis', icon: '🔩', breadcrumb: 'Turbici › Mecánica',
          keys: 'turbici chasis cuadro soldadura termico anclaje refuerzo deposito brida', action: () => navegar('turbici-mecanica') },
        { title: 'Turbici — Electrónica de Control', icon: '🎛️', breadcrumb: 'Turbici › Electrónica',
          keys: 'turbici arduino rc electronica control señal caja 3d encendido', action: () => navegar('turbici-electronica') },
        { title: 'Turbici — Vídeos de Prueba', icon: '🎬', breadcrumb: 'Turbici › Vídeos',
          keys: 'turbici video prueba encendido empuje turbina en accion', action: () => navegar('turbici-videos') },
        { title: 'Estufa de Metal (Soldadura)', icon: '🔥', breadcrumb: 'Mecánica › Proyecto',
          keys: 'estufa metal soldadura tubo cuadrado ayuntamiento prácticas estructura', action: () => navegar('proyecto-estufa') },
        { title: 'Triciclo Eléctrico Caja de Cerveza', icon: '🛺', breadcrumb: 'Mecánica › Proyecto',
          keys: 'triciclo electrico caja cerveza patin movilidad personal vehiculo', action: () => navegar('proyecto-caja-cerveza') },
        { title: 'Patinete para Niños Motorizado', icon: '🛵', breadcrumb: 'Mecánica › Proyecto (modal)',
          keys: 'patinete niños motorizado gasolina motor mecanica integracion', action: () => abrirModalExtendido('tpl-patinete') },
        { title: 'Desmontaje Máquina de Escribir', icon: '⌨️', breadcrumb: 'Mecánica › Proyecto (modal)',
          keys: 'desmontaje maquina escribir micromecánica automatizada carrete control analisis forense', action: () => abrirModalExtendido('tpl-desmontaje') },
        { title: 'Trabajos de Mecanizado', icon: '🔧', breadcrumb: 'Mecánica › Proyecto (modal)',
          keys: 'mecanizado precision piezas torno fresa fresado torneado', action: () => abrirModalExtendido('tpl-mecanizado') },

        // ── ADITIVA — PROYECTOS ─────────────────────────────────────────────
        { title: 'Pneumaflex: Actuadores Neumáticos 3D', icon: '🏆', breadcrumb: 'Aditiva › Proyecto principal',
          keys: 'pneumaflex actuadores neumaticos flexibles 3d impresion premio mecatronica actuador flexible', action: () => navegar('proyecto-pneumaflex') },
        { title: 'Proyectos de Impresión 3D Variados', icon: '🖨️', breadcrumb: 'Aditiva › Proyecto (modal)',
          keys: '3d impresion modelado piezas funcionales galeria variados laminado', action: () => abrirModalExtendido('tpl-3d') },

        // ── ELECTRÓNICA — PROYECTOS ─────────────────────────────────────────
        { title: 'Gestión de Equipos de Electromedicina', icon: '🏥', breadcrumb: 'Electrónica › Proyecto',
          keys: 'electromedicina hospital txagorritxu equipos medicos reparacion gestion diagnostico', action: () => navegar('proyecto-electromedicina') },
        { title: 'Restauración de Osciloscopios Analógicos', icon: '📡', breadcrumb: 'Electrónica › Proyecto',
          keys: 'osciloscopio analogico restauracion reparacion instrumentacion electronica vintage', action: () => navegar('proyecto-osciloscopios') },
        { title: 'Proyectos con Arduino', icon: '🤖', breadcrumb: 'Electrónica › Proyecto (modal)',
          keys: 'arduino control microcontrolador proyectos programacion io sensores', action: () => abrirModalExtendido('tpl-arduino') },
        { title: 'Coche RC Inteligente por App (Arduino)', icon: '🚗', breadcrumb: 'Electrónica › Proyecto (modal)',
          keys: 'coche rc inteligente arduino app movil control vehiculo bluetooth', action: () => abrirModalExtendido('tpl-coche-arduino') },
        { title: 'Proyectos Electrónicos Extra', icon: '🔌', breadcrumb: 'Electrónica › Proyecto (modal)',
          keys: 'electronica varios extra reparaciones prototipos pcb circuito', action: () => abrirModalExtendido('tpl-extra') },

        // ── CIENCIA — PROYECTOS ─────────────────────────────────────────────
        { title: 'Barágrafo Nixie (Alto Voltaje)', icon: '⚗️', breadcrumb: 'Ciencia › Proyecto (modal)',
          keys: 'baragrafo nixie alto voltaje vacio tubo experimentacion', action: () => abrirModalExtendido('tpl-baragrafo') },
        { title: 'Tubos de Neón', icon: '💡', breadcrumb: 'Ciencia › Proyecto (modal)',
          keys: 'neon tubo gas alto voltaje visual luz plasma', action: () => abrirModalExtendido('tpl-tuboneon') },
        { title: 'Tubos Nixie y Magic Eye', icon: '🔢', breadcrumb: 'Ciencia › Proyecto (modal)',
          keys: 'nixie magic eye tubo vacio display numerico coleccionismo vintage', action: () => abrirModalExtendido('tpl-tubonixie') },
        { title: 'Proyectos de Microscopía', icon: '🦠', breadcrumb: 'Ciencia › Proyecto (modal)',
          keys: 'microscopio optica ciencia adaptacion mejora investigacion', action: () => abrirModalExtendido('tpl-microscopio') },

        // ── PÁGINAS / SECCIONES ─────────────────────────────────────────────
        { title: 'Inicio (Portfolio)', icon: '🏠', breadcrumb: 'Sección',
          keys: 'inicio home portfolio adrian gomez mecatronico', action: () => navegar('pantalla-inicio') },
        { title: 'Contacto', icon: '✉️', breadcrumb: 'Sección',
          keys: 'contacto email telefono linkedin github redes sociales', action: () => navegar('pantalla-contacto') },
    ];

    let highlightedIndex = -1;

    window.buscarProyectos = function(query) {
        const resultsPanel = document.getElementById('search-results');
        query = query.trim().toLowerCase();

        if (query.length < 2) {
            resultsPanel.innerHTML = '';
            resultsPanel.classList.remove('visible');
            highlightedIndex = -1;
            return;
        }

        // Búsqueda: todas las palabras del query deben aparecer en título o keys
        const words = query.split(/\s+/);
        const matches = SEARCH_INDEX.filter(item => {
            const haystack = (item.title + ' ' + item.keys).toLowerCase();
            return words.every(w => haystack.includes(w));
        }).slice(0, 8); // máximo 8 resultados

        highlightedIndex = -1;

        if (matches.length === 0) {
            resultsPanel.innerHTML = '<div class="search-no-results">😕 Sin resultados para "<strong>' + query + '</strong>"</div>';
        } else {
            resultsPanel.innerHTML = matches.map((item, i) =>
                `<button class="search-result-item" data-index="${i}" onclick="ejecutarResultado(${SEARCH_INDEX.indexOf(item)})">
                    <span class="search-icon">${item.icon}</span>
                    <span class="search-info">
                        <span class="search-title">${item.title}</span>
                        <span class="search-breadcrumb">${item.breadcrumb}</span>
                    </span>
                </button>`
            ).join('');
        }
        resultsPanel.classList.add('visible');
    };

    window.ejecutarResultado = function(idx) {
        SEARCH_INDEX[idx].action();
        document.getElementById('buscador').value = '';
        document.getElementById('search-results').innerHTML = '';
        document.getElementById('search-results').classList.remove('visible');
        highlightedIndex = -1;
    };

    // Navegación por teclado (↑ ↓ Enter Escape)
    window.navegarResultados = function(e) {
        const items = document.querySelectorAll('.search-result-item');
        if (!items.length) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            highlightedIndex = Math.min(highlightedIndex + 1, items.length - 1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            highlightedIndex = Math.max(highlightedIndex - 1, 0);
        } else if (e.key === 'Enter' && highlightedIndex >= 0) {
            e.preventDefault();
            items[highlightedIndex].click();
            return;
        } else if (e.key === 'Escape') {
            document.getElementById('search-results').classList.remove('visible');
            return;
        } else { return; }
        items.forEach((el, i) => el.classList.toggle('highlighted', i === highlightedIndex));
        items[highlightedIndex]?.scrollIntoView({ block: 'nearest' });
    };

    // Cerrar dropdown al hacer click fuera
    document.addEventListener('click', function(e) {
        const wrapper = document.getElementById('search-wrapper');
        if (wrapper && !wrapper.contains(e.target)) {
            document.getElementById('search-results')?.classList.remove('visible');
            highlightedIndex = -1;
        }
    });

    // (legacy — ya no se necesita, pero se mantiene por si queda algún onkeyup en el HTML)
    window.filtrarCategorias = function() {};


    // ---- MODALES ----
    window.abrirModalExtendido = function(idPlantilla) {
        const contenido = document.getElementById(idPlantilla).innerHTML;
        modalContenedor.innerHTML = contenido;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        modalAbierto = true;
        window.location.hash = 'ventana-abierta';
    };

    window.cerrarModal = function() {
        if (window.location.hash === '#ventana-abierta') {
            window.history.back();
        } else {
            cerrarModalLogica();
        }
    };

    window.cerrarModalFuera = function(event) {
        if (event.target === modal) cerrarModal();
    };

    // ---- LIGHTBOX ----
    document.body.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG' && e.target.classList.contains('media-proyecto')) {
            document.getElementById('lightbox-img').src = e.target.src;
            document.getElementById('lightbox').style.display = 'flex';
            window.location.hash = 'lightbox-abierto';
        }
    });

    window.cerrarLightbox = function() {
        if (window.location.hash === '#lightbox-abierto') {
            window.history.back();
        } else {
            document.getElementById('lightbox').style.display = 'none';
        }
    };

    // ---- NAVEGACIÓN INICIAL (HASH) ----
    if (!window.location.hash || window.location.hash === '#ventana-abierta') {
        window.location.hash = 'pantalla-inicio';
    } else {
        window.dispatchEvent(new Event('hashchange'));
    }

    // ---- EFECTO TYPING (HERO) ----
    const typedTextElement = document.getElementById('typed-text');
    if (typedTextElement) {
        const textToType = "Técnico en Mecatrónica Industrial (Nº1 Promoción) | Maker & I+D";
        let charIndex = 0;
        function typeWriter() {
            if (charIndex < textToType.length) {
                typedTextElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 40);
            }
        }
        setTimeout(typeWriter, 600);
    }

    // ---- PARTICLES.JS ----
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 55, density: { enable: true, value_area: 800 } },
                color: { value: '#00e5b8' },
                shape: { type: 'circle' },
                opacity: { value: 0.35, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
                size: { value: 3, random: true, anim: { enable: false } },
                line_linked: { enable: true, distance: 150, color: '#00e5b8', opacity: 0.18, width: 1 },
                move: { enable: true, speed: 1.4, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
                modes: { grab: { distance: 200, line_linked: { opacity: 0.6 } }, push: { particles_nb: 3 } }
            },
            retina_detect: true
        });
    }

} // fin initApp
    
// Ejecutar de forma segura independientemente de si el DOM cargó antes o después del script
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
