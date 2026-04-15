/* ================================================
   PORTFOLIO ADRIÁN GÓMEZ — app.js
   Todo el código dentro de DOMContentLoaded para
   garantizar compatibilidad con el atributo defer.
   ================================================ */

let modalAbierto = false;
let idiomaActual = 'es';
let typewriterTimeout;

const textos = {
    'es': {
        'nav-inicio': 'Inicio',
        'nav-proyectos': 'Proyectos',
        'nav-buscar': 'Buscar',
        'nav-3d': 'Servicio de impresión 3D',
        'nav-contacto': 'Contacto',
        'nav-cv': 'Descargar CV',
        'hero-status': 'Disponible · Vitoria-Gasteiz',
        'hero-bio': 'Transformo ideas extremas en realidad funcional. Especializado en fusionar la ingeniería mecánica tradicional con la innovación electrónica de vanguardia y la fabricación aditiva.',
        'hero-btn-explorar': 'Explorar Proyectos',
        'hero-btn-contacto': 'Contactar',
        'sec-habilidades': 'Habilidades de Ingeniería Key',
        'main-video-title': 'Integración Jet: Turbina en Chasis Ligero',
        'main-video-btn': 'Ver Detalles de Ingeniería de Turbici →',
        'cat-mecanica-titulo': '⚙️ Mecánica de Precisión',
        'cat-mecanica-desc': 'Diseño de prototipos, mecanizado, micromecánica, soldadura y sistemas neumáticos.',
        'cat-aditiva-titulo': '🧊 Fabricación Aditiva y CAD',
        'cat-aditiva-desc': 'Modelado NX, dominio del laminado y materiales para impresión de piezas funcionales.',
        'cat-electronica-titulo': '⚡ Electrónica y Control',
        'cat-electronica-desc': 'Programación Arduino, diseño de PCBs, diagnóstico de instrumentación y electromedicina.',
        'cat-ciencia-titulo': '🔬 Ciencia Aplicada e I+D',
        'cat-ciencia-desc': 'Investigación en física de alto vacío, tubos Nixie, plasma y sistemas láser.',
        'btn-volver-cat': '← Volver a Categorías',
        'btn-volver-inicio': '← Volver al inicio',
        'btn-volver-turbici': '← Volver a Turbici General',
        'btn-volver-atras': '← Volver atrás',
        'typewriter': 'Técnico en Mecatrónica Industrial (Nº1 Promoción) | Maker & I+D',
        'buscador-loader': '🌐 Cargando índice...',
        'buscador-no-results': '😕 Sin resultados para',
        'buscador-placeholder': '🔍 Buscar proyectos, categorías... (ej: arduino, turbici, vacuum)',
        'contact-title': '¿Hablamos de tecnología?',
        'contact-subtitle': 'Abierto a incorporación en empresas de alta tecnología, I+D y mecatrónica de precisión.',
        'label-email': 'Email',
        'label-telefono': 'Teléfono',
        'label-linkedin': 'LinkedIn',
        'label-github': 'GitHub',
        'footer-text': '© 2026 Adrián Gómez Alvarez. Mecatrónico Profesional.'
    },
    'en': {
        'nav-inicio': 'Home',
        'nav-proyectos': 'Projects',
        'nav-buscar': 'Search',
        'nav-3d': '3D Printing Service',
        'nav-contacto': 'Contact',
        'nav-cv': 'Download CV',
        'hero-status': 'Available · Vitoria-Gasteiz',
        'hero-bio': 'I transform extreme ideas into functional reality. Specialized in merging traditional mechanical engineering with cutting-edge electronic innovation and additive manufacturing.',
        'hero-btn-explorar': 'Explore Projects',
        'hero-btn-contacto': 'Contact',
        'sec-habilidades': 'Key Engineering Skills',
        'main-video-title': 'Jet Integration: Turbine in Light Chassis',
        'main-video-btn': 'View Turbici Engineering Details →',
        'cat-mecanica-titulo': '⚙️ Precision Mechanics',
        'cat-mecanica-desc': 'Prototype design, machining, micromechanics, welding and pneumatic systems.',
        'cat-aditiva-titulo': '🧊 Additive Manufacturing and CAD',
        'cat-aditiva-desc': 'NX Modeling, laminate mastery and materials for functional parts printing.',
        'cat-electronica-titulo': '⚡ Electronics and Control',
        'cat-electronica-desc': 'Arduino programming, PCB design, instrumentation diagnostics and electromedicine.',
        'cat-ciencia-titulo': '🔬 Applied Science and R&D',
        'cat-ciencia-desc': 'Research in high vacuum physics, Nixie tubes, plasma and laser systems.',
        'btn-volver-cat': '← Back to Categories',
        'btn-volver-inicio': '← Back to Home',
        'btn-volver-turbici': '← Back to Turbici General',
        'btn-volver-atras': '← Go Back',
        'typewriter': 'Industrial Mechatronics Technician (Valedictorian) | Maker & R&D',
        'buscador-loader': '🌐 Loading index...',
        'buscador-no-results': '😕 No results for',
        'buscador-placeholder': '🔍 Search projects, categories... (e.g. arduino, turbici, vacuum)',
        'contact-title': 'Shall we talk technology?',
        'contact-subtitle': 'Open to joining high-tech companies, R&D and precision mechatronics.',
        'label-email': 'Email',
        'label-telefono': 'Phone',
        'label-linkedin': 'LinkedIn',
        'label-github': 'GitHub',
        'footer-text': '© 2026 Adrián Gómez Alvarez. Professional Mechatronics.'
    }
};

function cambiarIdioma() {
    idiomaActual = idiomaActual === 'es' ? 'en' : 'es';
    document.documentElement.lang = idiomaActual;
    
    // Actualizar elementos con data-key
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (textos[idiomaActual][key]) {
            if (el.tagName === 'INPUT') {
                el.placeholder = textos[idiomaActual][key];
            } else {
                el.textContent = textos[idiomaActual][key];
            }
        }
    });

    // Actualizar botón de idioma
    const btn = document.getElementById('btn-idioma');
    if (btn) btn.innerHTML = `🌐 ${idiomaActual === 'es' ? 'EN' : 'ES'}`;

    // Reiniciar typewriter
    reiniciarTypewriter();
}

function reiniciarTypewriter() {
    const el = document.getElementById('typed-text');
    if (!el) return;
    el.textContent = '';
    clearTimeout(typewriterTimeout);
    let text = textos[idiomaActual]['typewriter'];
    let i = 0;
    function type() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            typewriterTimeout = setTimeout(type, 40);
        }
    }
    setTimeout(type, 600);
}

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
    const SEARCH_INDEX = [
        { 
            title: { es: 'Mecánica de Precisión', en: 'Precision Mechanics' }, 
            icon: '⚙️', 
            breadcrumb: { es: 'Categoría', en: 'Category' },
            keys: 'mecanica precision soldadura welding carricoche ayuntamiento mecanizado chasis estructural tuerca tornillo', 
            action: () => navegar('categoria-mecanica') 
        },
        { 
            title: { es: 'Fabricación Aditiva y CAD', en: 'Additive Manufacturing and CAD' }, 
            icon: '🧊', 
            breadcrumb: { es: 'Categoría', en: 'Category' },
            keys: '3d aditiva laminado nx siemens sputtering actuador flexible prototipado pneumaflex cad diseño printing', 
            action: () => navegar('categoria-aditiva') 
        },
        { 
            title: { es: 'Electrónica y Control', en: 'Electronics and Control' }, 
            icon: '⚡', 
            breadcrumb: { es: 'Categoría', en: 'Category' },
            keys: 'electronica control arduino rc digifiz nixie flash pcb electromedicina osciloscopio mk2 circuito microcontrolador', 
            action: () => navegar('categoria-electronica') 
        },
        { 
            title: { es: 'Ciencia Aplicada e I+D', en: 'Applied Science and R&D' }, 
            icon: '🔬', 
            breadcrumb: { es: 'Categoría', en: 'Category' },
            keys: 'ciencia investigacion id sputtering vacio plasma laser neon rubi nixie hv microscopio alto voltaje research science vacuum', 
            action: () => navegar('categoria-ciencia') 
        },
        { 
            title: { es: 'Turbici: Integración Turbina Jet', en: 'Turbici: Jet Turbine Integration' }, 
            icon: '🚀', 
            breadcrumb: { es: 'Mecánica › Proyecto principal', en: 'Mechanics › Main Project' },
            keys: 'turbici turbina jet bici bicicleta chasis ligero soldadura tig mig adaptacion empuje combustion bicycle', 
            action: () => navegar('proyecto-turbici-inicio') 
        },
        { 
            title: { es: 'Turbici — Parte Mecánica y Chasis', en: 'Turbici — Mechanical Side and Chassis' }, 
            icon: '🔩', 
            breadcrumb: { es: 'Turbici › Mecánica', en: 'Turbici › Mechanical' },
            keys: 'turbici chasis cuadro soldadura termico anclaje refuerzo deposito brida', 
            action: () => navegar('turbici-mecanica') 
        },
        { 
            title: { es: 'Turbici — Electrónica de Control', en: 'Turbici — Control Electronics' }, 
            icon: '🎛️', 
            breadcrumb: { es: 'Turbici › Electrónica', en: 'Turbici › Electronics' },
            keys: 'turbici arduino rc electronica control señal caja 3d encendido', 
            action: () => navegar('turbici-electronica') 
        },
        { 
            title: { es: 'Turbici — Vídeos de Prueba', en: 'Turbici — Test Videos' }, 
            icon: '🎬', 
            breadcrumb: { es: 'Turbici › Vídeos', en: 'Turbici › Videos' },
            keys: 'turbici video prueba encendido empuje turbina en accion test', 
            action: () => navegar('turbici-videos') 
        },
        { 
            title: { es: 'Estufa de Metal (Soldadura)', en: 'Metal Stove (Welding)' }, 
            icon: '🔥', 
            breadcrumb: { es: 'Mecánica › Proyecto', en: 'Mechanics › Project' },
            keys: 'estufa metal soldadura tubo cuadrado ayuntamiento prácticas estructura', 
            action: () => navegar('proyecto-estufa') 
        },
        { 
            title: { es: 'Triciclo Eléctrico Caja de Cerveza', en: 'Beer Crate Electric Trike' }, 
            icon: '🛺', 
            breadcrumb: { es: 'Mecánica › Proyecto', en: 'Mechanics › Project' },
            keys: 'triciclo electrico caja cerveza patin movilidad personal vehiculo', 
            action: () => navegar('proyecto-caja-cerveza') 
        },
        { 
            title: { es: 'Patinete para Niños Motorizado', en: 'Motorized Scooter for Kids' }, 
            icon: '🛵', 
            breadcrumb: { es: 'Mecánica › Proyecto (modal)', en: 'Mechanics › Project (modal)' },
            keys: 'patinete niños motorizado gasolina motor mecanica integracion', 
            action: () => abrirModalExtendido('tpl-patinete') 
        },
        { 
            title: { es: 'Desmontaje Máquina de Escribir', en: 'Typewriter Teardown' }, 
            icon: '⌨️', 
            breadcrumb: { es: 'Mecánica › Proyecto (modal)', en: 'Mechanics › Project (modal)' },
            keys: 'desmontaje maquina escribir micromecánica automatizada carrete control analisis forense', 
            action: () => abrirModalExtendido('tpl-desmontaje') 
        },
        { 
            title: { es: 'Trabajos de Mecanizado', en: 'Machining Works' }, 
            icon: '🔧', 
            breadcrumb: { es: 'Mecánica › Proyecto (modal)', en: 'Mechanics › Project (modal)' },
            keys: 'mecanizado precision piezas torno fresa fresado torneado', 
            action: () => abrirModalExtendido('tpl-mecanizado') 
        },
        { 
            title: { es: 'Pneumaflex: Actuadores Neumáticos 3D', en: 'Pneumaflex: 3D Pneumatic Actuators' }, 
            icon: '🏆', 
            breadcrumb: { es: 'Aditiva › Proyecto principal', en: 'Additive › Main Project' },
            keys: 'pneumaflex actuadores neumaticos flexibles 3d impresion premio mecatronica actuador flexible printing', 
            action: () => navegar('proyecto-pneumaflex') 
        },
        { 
            title: { es: 'Proyectos de Impresión 3D Variados', en: 'Various 3D Printing Projects' }, 
            icon: '🖨️', 
            breadcrumb: { es: 'Aditiva › Proyecto (modal)', en: 'Additive › Project (modal)' },
            keys: '3d impresion modelado piezas funcionales galeria variados laminado printing', 
            action: () => abrirModalExtendido('tpl-3d') 
        },
        { 
            title: { es: 'Gestión de Equipos de Electromedicina', en: 'Electromedical Equipment Management' }, 
            icon: '🏥', 
            breadcrumb: { es: 'Electrónica › Proyecto', en: 'Electronics › Project' },
            keys: 'electromedicina hospital txagorritxu equipos medicos reparacion gestion diagnostico', 
            action: () => navegar('proyecto-electromedicina') 
        },
        { 
            title: { es: 'Restauración de Osciloscopios Analógicos', en: 'Analog Oscilloscope Restoration' }, 
            icon: '📡', 
            breadcrumb: { es: 'Electrónica › Proyecto', en: 'Electronics › Project' },
            keys: 'osciloscopio analogico restauracion reparacion instrumentacion electronica vintage repair', 
            action: () => navegar('proyecto-osciloscopios') 
        },
        { 
            title: { es: 'Proyectos con Arduino', en: 'Arduino Projects' }, 
            icon: '🤖', 
            breadcrumb: { es: 'Electrónica › Proyecto (modal)', en: 'Electronics › Project (modal)' },
            keys: 'arduino control microcontrolador proyectos programacion io sensores', 
            action: () => abrirModalExtendido('tpl-arduino') 
        },
        { 
            title: { es: 'Coche RC Inteligente por App (Arduino)', en: 'Smart App RC Car (Arduino)' }, 
            icon: '🚗', 
            breadcrumb: { es: 'Electrónica › Proyecto (modal)', en: 'Electronics › Project (modal)' },
            keys: 'coche rc inteligente arduino app movil control vehiculo bluetooth', 
            action: () => abrirModalExtendido('tpl-coche-arduino') 
        },
        { 
            title: { es: 'Proyectos Electrónicos Extra', en: 'Extra Electronic Projects' }, 
            icon: '🔌', 
            breadcrumb: { es: 'Electrónica › Proyecto (modal)', en: 'Electronics › Project (modal)' },
            keys: 'electronica varios extra reparaciones prototipos pcb circuito', 
            action: () => abrirModalExtendido('tpl-extra') 
        },
        { 
            title: { es: 'Barágrafo Nixie (Alto Voltaje)', en: 'Nixie Bargraph (High Voltage)' }, 
            icon: '⚗️', 
            breadcrumb: { es: 'Ciencia › Proyecto (modal)', en: 'Science › Project (modal)' },
            keys: 'baragrafo nixie alto voltaje vacio tubo experimentacion vacuum', 
            action: () => abrirModalExtendido('tpl-baragrafo') 
        },
        { 
            title: { es: 'Tubos de Neón', en: 'Neon Tubes' }, 
            icon: '💡', 
            breadcrumb: { es: 'Ciencia › Proyecto (modal)', en: 'Science › Project (modal)' },
            keys: 'neon tubo gas alto voltaje visual luz plasma', 
            action: () => abrirModalExtendido('tpl-tuboneon') 
        },
        { 
            title: { es: 'Tubos Nixie y Magic Eye', en: 'Nixie Tubes & Magic Eye' }, 
            icon: '🔢', 
            breadcrumb: { es: 'Ciencia › Proyecto (modal)', en: 'Science › Project (modal)' },
            keys: 'nixie magic eye tubo vacio display numerico coleccionismo vintage', 
            action: () => abrirModalExtendido('tpl-tubonixie') 
        },
        { 
            title: { es: 'Proyectos de Microscopía', en: 'Microscopy Projects' }, 
            icon: '🦠', 
            breadcrumb: { es: 'Ciencia › Proyecto (modal)', en: 'Science › Project (modal)' },
            keys: 'microscopio optica ciencia adaptacion mejora investigacion microscopy', 
            action: () => abrirModalExtendido('tpl-microscopio') 
        },
        { 
            title: { es: 'Inicio (Portfolio)', en: 'Home (Portfolio)' }, 
            icon: '🏠', 
            breadcrumb: { es: 'Sección', en: 'Section' },
            keys: 'inicio home portfolio adrian gomez mecatronico', 
            action: () => navegar('pantalla-inicio') 
        },
        { 
            title: { es: 'Contacto', en: 'Contact' }, 
            icon: '✉️', 
            breadcrumb: { es: 'Sección', en: 'Section' },
            keys: 'contacto email telefono linkedin github redes sociales phone', 
            action: () => navegar('pantalla-contacto') 
        },
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

        const words = query.split(/\s+/);
        const matches = SEARCH_INDEX.filter(item => {
            const currentTitle = item.title[idiomaActual].toLowerCase();
            const currentBreadcrumb = item.breadcrumb[idiomaActual].toLowerCase();
            const haystack = (currentTitle + ' ' + currentBreadcrumb + ' ' + item.keys).toLowerCase();
            return words.every(w => haystack.includes(w));
        }).slice(0, 8);

        highlightedIndex = -1;

        if (matches.length === 0) {
            resultsPanel.innerHTML = `<div class="search-no-results">${textos[idiomaActual]['buscador-no-results']} "<strong>${query}</strong>"</div>`;
        } else {
            resultsPanel.innerHTML = matches.map((item, i) =>
                `<button class="search-result-item" data-index="${i}" onclick="ejecutarResultado(${SEARCH_INDEX.indexOf(item)})">
                    <span class="search-icon">${item.icon}</span>
                    <span class="search-info">
                        <span class="search-title">${item.title[idiomaActual]}</span>
                        <span class="search-breadcrumb">${item.breadcrumb[idiomaActual]}</span>
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

    // (legacy)
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

    // ---- BOTÓN IDIOMA ----
    const btnId = document.getElementById('btn-idioma');
    if (btnId) btnId.onclick = cambiarIdioma;

    // ---- DETECCIÓN AUTOMÁTICA DE IDIOMA ----
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang && !userLang.toLowerCase().startsWith('es')) {
        cambiarIdioma(); // Cambia a EN (idiomaActual era 'es')
    } else {
        // Asegurar placeholder inicial en ES si no se cambia
        const busq = document.getElementById('buscador');
        if (busq) busq.placeholder = textos['es']['buscador-placeholder'];
    }

    // ---- NAVEGACIÓN INICIAL (HASH) ----
    if (!window.location.hash || window.location.hash === '#ventana-abierta') {
        window.location.hash = 'pantalla-inicio';
    } else {
        window.dispatchEvent(new Event('hashchange'));
    }

    // ---- EFECTO TYPING (HERO) ----
    reiniciarTypewriter();

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
