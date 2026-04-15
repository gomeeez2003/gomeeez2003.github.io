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
        'footer-text': '© 2026 Adrián Gómez Alvarez. Mecatrónico Profesional.',
        'tag-principal': 'PROYECTO PRINCIPAL / MECÁNICA / JET',
        'tag-soldadura': 'SOLDADURA / ESTRUCTURAS',
        'tag-mecanica-multi': 'MECÁNICA / MULTIDISCIPLINAR',
        'tag-mecanica-gas': 'MECÁNICA / MOTOR GASOLINA',
        'tag-micromecanica': 'MICROMECÁNICA',
        'tag-mecanizado': 'MECANIZADO / PRECISIÓN',
        'tag-premio': 'PROYECTO PRINCIPAL / PREMIO',
        'tag-modelado': 'IMPRESIÓN 3D / MODELADO',
        'tag-practicas': 'ELECTROMEDICINA / PRÁCTICAS',
        'tag-reparacion': 'INSTRUMENTACIÓN / REPARACIÓN',
        'tag-arduino': 'ARDUINO / CONTROL',
        'tag-rc': 'ARDUINO / RC',
        'tag-electronica-extra': 'ELECTRÓNICA / VARIOS',
        'tag-hv-vacio': 'ALTO VOLTAJE / VACÍO',
        'tag-hv-nixie': 'ALTO VOLTAJE / NIXIE',
        'tag-gases': 'GASES NOBLES / PLASMA',
        'tag-optica': 'ÓPTICA / INVESTIGACIÓN',
        'cat-mecanica-header': 'Ingeniería Mecánica y Ensamblaje',
        'cat-mecanica-subheader': 'Desarrollo de prototipos funcionales y estructuras mecánicas de precisión.',
        'proj-turbici-titulo': 'Turbici: Integración Turbina Jet',
        'proj-turbici-desc': 'El proyecto que une todas mis habilidades. Adaptación de turbina jet a chasis ligero.',
        'proj-estufa-titulo': 'Estufa de Metal (Prácticas Ayuntamiento)',
        'proj-estufa-desc': 'Diseño y fabricación de estufa de tubo cuadrado de metal con enfoque en soldadura profesional.',
        'proj-caja-cerveza-titulo': 'Triciclo Eléctrico Caja de Cerveza',
        'proj-caja-cerveza-desc': 'Vehículo de movilidad personal: patín eléctrico integrado en estructura de caja de cerveza.',
        'proj-patinete-titulo': 'Patinete para Niños Motorizado',
        'proj-patinete-desc': 'Integración mecánica de un motor de gasolina en un patinete infantil convencional.',
        'proj-desmontaje-titulo': 'Desmontaje y Análisis de Máquina de Escribir',
        'proj-desmontaje-desc': 'Análisis forense de micromecánica automatizada: desmontaje del carrete y control.',
        'proj-mecanizado-titulo': 'Trabajos de Mecanizado',
        'proj-mecanizado-desc': 'Procesos de mecanizado de piezas de precisión.',
        'cat-aditiva-header': 'Fabricación Aditiva y Prototipado 3D',
        'cat-aditiva-subheader': 'Modelado mecánico en Siemens NX y control del proceso de impresión para piezas funcionales.',
        'proj-pneumaflex-titulo': 'Pneumaflex: Actuadores Neumáticos Flexibles 3D',
        'proj-pneumaflex-desc': 'El proyecto más galardonado. Desarrollo de actuadores flexibles e impresos en 3D para mecatrónica.',
        'proj-3d-titulo': 'Proyectos de Impresión 3D Variados',
        'proj-3d-desc': 'Galería extensa de modelado e impresión de piezas funcionales.',
        'cat-electronica-header': 'Ingeniería de Control y Electrónica',
        'cat-electronica-subheader': 'Diseño de circuitos, programación de microcontroladores y diagnóstico de equipos.',
        'proj-electromedicina-titulo': 'Gestión y Reparación de Equipos de Electromedicina',
        'proj-electromedicina-desc': 'Experiencia diagnóstica en Hospital Txagorritxu con equipos médicos hospitalarios.',
        'proj-osciloscopio-titulo': 'Restauración de Osciloscopios Analógicos',
        'proj-osciloscopio-desc': 'Desmontaje, diagnóstico y reparación de instrumentación electrónica analógica clásica.',
        'proj-arduino-titulo': 'Proyectos con Arduino',
        'proj-arduino-desc': 'Desarrollo de sistemas de control utilizando placas microcontroladoras Arduino.',
        'proj-coche-titulo': 'Coche RC Inteligente por App (Arduino)',
        'proj-coche-desc': 'Desarrollo de vehículo controlado por microcontrolador y app móvil.',
        'proj-extra-titulo': 'Proyectos Electrónicos Extra',
        'proj-extra-desc': 'Recopilación de reparaciones y prototipos electrónicos adicionales.',
        'cat-ciencia-header': 'Ciencia Aplicada e I+D Experimental',
        'cat-ciencia-subheader': 'Investigación en física de vacío, plasma, sistemas láser y displays vintage de alto voltaje.',
        'proj-baragrafo-titulo': 'Barágrafo Nixie',
        'proj-baragrafo-desc': 'Experimentación técnica de alto voltaje con tubo barágrafo.',
        'proj-neon-titulo': 'Tubos de Neón y Plasma',
        'proj-neon-desc': 'Experimentos con descarga de gases en condiciones de baja presión.',
        'proj-nixie-titulo': 'Tubos Nixie y Magic Eye',
        'proj-nixie-desc': 'Experimentación con tubos de vacío clásicos para displays numéricos.',
        'proj-microscopio-titulo': 'Proyectos de Microscopía',
        'proj-microscopio-desc': 'Modificación y mejora de sistemas ópticos para micro-fotografía científica.',
        'turbici-main-h2': 'Turbici: Integración Turbina Jet',
        'turbici-main-p': 'PROYECTO DESTACADO',
        'turbici-card-mec-h3': '🔧 Ingeniería del Chasis',
        'turbici-card-mec-p': 'Anclajes térmicos, soldadura estructural y refuerzos.',
        'turbici-card-elec-h3': '🎛️ Controler Electrónico',
        'turbici-card-elec-p': 'Sistemas de encendido, monitorización y mando RC.',
        'turbici-card-video-p': 'Pruebas de encendido, test de empuje y proyecto en acción.',
        'turbici-mec-fase1-h3': 'Fase 1: Refuerzo y Modificación del Chasis',
        'turbici-mec-fase1-p': 'Para poder soportar el inmenso empuje lineal de la turbina, fue necesario someter el cuadro de la bicicleta a un rediseño estructural, aplicando técnicas de soldadura TIG/MIG para garantizar la máxima rigidez.',
        'turbici-mec-fase2-h3': 'Fase 2: Aislamiento Térmico y Anclajes',
        'turbici-mec-fase2-p': 'La turbina jet alcanza temperaturas críticas en su cámara de combustión. Diseñé un sistema de anclajes mecanizados a medida y barreras de disipación térmica para proteger los componentes cercanos y garantizar la seguridad total.',
        'turbici-mec-fase3-h3': 'Integración y Packaging 3D',
        'turbici-mec-fase3-p': 'Toda la placa de control, junto con las baterías y los módulos de señal, fue empaquetada en carcasas personalizadas diseñadas en CAD e impresas en 3D para protegerlas de la intemperie y las vibraciones.',
        'turbici-elec-fase1-h3': 'Desarrollo del Cerebro Electrónico',
        'turbici-elec-fase1-p': 'Para gestionar el encendido, la aceleración y los parámetros de seguridad de la turbina, desarrollé un sistema de control basado en Arduino.',
        'turbici-vid-fase1-h3': 'Pruebas y Funcionamiento en Acción',
        'turbici-vid-fase1-p': 'Recopilación completa de pruebas dinámicas. Aquí puedes ver desde los primeros encendidos del motor jet hasta la respuesta del control electrónico y la telemetría en tiempo real.',
        'modal-tag-3d': 'FABRICACIÓN ADITIVA / 3D',
        'modal-title-3d': 'Proyectos 3D',
        'modal-tag-arduino': 'ELECTRÓNICA / ARDUINO',
        'modal-title-arduino': 'Proyectos con Arduino',
        'modal-tag-coche': 'ARDUINO / RC',
        'modal-title-coche': 'Coche RC Inteligente',
        'modal-tag-extra': 'VARIOS',
        'modal-title-extra': 'Proyectos Extra',
        'modal-tag-micromecanica': 'MICROMECÁNICA',
        'modal-title-desmontaje': 'Desmontaje Máquina de Escribir',
        'modal-tag-mecanizado': 'MECÁNICA DE PRECISIÓN',
        'modal-title-mecanizado': 'Trabajos de Mecanizado',
        'modal-tag-optica': 'CIENCIA / ÓPTICA',
        'modal-title-microscopio': 'Microscopía',
        'modal-tag-patinete': 'MECÁNICA / MOTOR',
        'modal-title-patinete': 'Patinete Motorizado',
        'modal-tag-baragrafo': 'ALTO VOLTAJE',
        'modal-title-baragrafo': 'Barágrafo Nixie',
        'modal-tag-neon': 'ALTO VOLTAJE',
        'modal-title-neon': 'Tubos de Neón',
        'modal-tag-nixie': 'ALTO VOLTAJE',
        'modal-title-nixie': 'Tubos Nixie Clásicos'
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
        'btn-volver-turbici': '← Back to Turbici General',
        'btn-volver-atras': '← Go Back',
        'btn-volver-mecanica': '← Back to Mechanics',
        'btn-volver-electronica': '← Back to Electronics',
        'btn-volver-aditiva': '← Back to Additive',
        'proj-pneumaflex-h2': 'Pneumaflex (Awarded Project)',
        'proj-pneumaflex-p-main': 'Complete development of 3D-printed flexible pneumatic actuators for automated mechatronic systems (Soft Robotics).',
        'pneumaflex-f1-h3': 'Phase 1: Conceptualization and Parametric Design',
        'pneumaflex-f1-p': 'The initial challenge was to achieve bending through controlled air pressure. Using Siemens NX, I designed the first internal air chambers, seeking the perfect balance between material flexibility (TPU) and tear resistance.',
        'pneumaflex-f2-h3': 'Phase 2: Geometry Evolution and Additive Manufacturing',
        'pneumaflex-f2-p': 'Destructive testing led us to evolve the geometry. We developed cylindrical and flat actuators, adjusting FDM slicing parameters (infill, perimeters) to dictate exactly where the part should curve under pressure.',
        'pneumaflex-f3-h3': 'Phase 3: Final Project and Awards',
        'pneumaflex-f3-p': 'The final result is a robust Soft Robotics system applicable to industry. This multidisciplinary approach joining CAD, 3D Printing, Pneumatics, and Electronics earned me the highest academic recognition in the class.',
        'proj-caja-h2': 'Beer Crate Trike',
        'proj-electrom-h2': 'Electromedical Equipment',
        'proj-oscil-h2': 'Oscilloscope Restoration',
        'proj-estufa-h2': 'Metal Stove (Welding)',
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
        'footer-text': '© 2026 Adrián Gómez Alvarez. Professional Mechatronics.',
        'tag-principal': 'MAIN PROJECT / MECHANICS / JET',
        'tag-soldadura': 'WELDING / STRUCTURES',
        'tag-mecanica-multi': 'MECHANICS / MULTIDISCIPLINARY',
        'tag-mecanica-gas': 'MECHANICS / GASOLINE ENGINE',
        'tag-micromecanica': 'MICROMECHANICS',
        'tag-mecanizado': 'MACHINING / PRECISION',
        'tag-premio': 'MAIN PROJECT / AWARDED',
        'tag-modelado': '3D PRINTING / MODELING',
        'tag-practicas': 'ELECTROMEDICINE / INTERNSHIP',
        'tag-reparacion': 'INSTRUMENTATION / REPAIR',
        'tag-arduino': 'ARDUINO / CONTROL',
        'tag-rc': 'ARDUINO / RC',
        'tag-electronica-extra': 'ELECTRONICS / VARIOUS',
        'tag-hv-vacio': 'HIGH VOLTAGE / VACUUM',
        'tag-hv-nixie': 'HIGH VOLTAGE / NIXIE',
        'tag-gases': 'NOBLE GASES / PLASMA',
        'tag-optica': 'OPTICS / RESEARCH',
        'cat-mecanica-header': 'Mechanical Engineering and Assembly',
        'cat-mecanica-subheader': 'Development of functional prototypes and precision mechanical structures.',
        'proj-turbici-titulo': 'Turbici: Jet Turbine Integration',
        'proj-turbici-desc': 'The project that joins all my skills. Jet turbine adaptation to light chassis.',
        'proj-estufa-titulo': 'Metal Stove (Council Internship)',
        'proj-estufa-desc': 'Design and manufacturing of metal square tube stove with professional welding focus.',
        'proj-caja-cerveza-titulo': 'Beer Crate Electric Trike',
        'proj-caja-cerveza-desc': 'Personal mobility vehicle: electric scooter integrated into a beer crate structure.',
        'proj-patinete-titulo': 'Motorized Child Scooter',
        'proj-patinete-desc': 'Mechanical integration of a gasoline engine into a conventional child scooter.',
        'proj-desmontaje-titulo': 'Typewriter Teardown and Analysis',
        'proj-desmontaje-desc': 'Forensic analysis of automated micromechanics: spool and control teardown.',
        'proj-mecanizado-titulo': 'Machining Works',
        'proj-mecanizado-desc': 'Precision part machining processes.',
        'cat-aditiva-header': 'Additive Manufacturing and 3D Prototyping',
        'cat-aditiva-subheader': 'Mechanical modeling in Siemens NX and printing process control for functional parts.',
        'proj-pneumaflex-titulo': 'Pneumaflex: 3D Flexible Pneumatic Actuators',
        'proj-pneumaflex-desc': 'Most awarded project. Development of flexible 3D printed actuators for mechatronics.',
        'proj-3d-titulo': 'Various 3D Printing Projects',
        'proj-3d-desc': 'Extensive gallery of functional parts modeling and printing.',
        'cat-electronica-header': 'Control Engineering and Electronics',
        'cat-electronica-subheader': 'Circuit design, microcontroller programming and equipment diagnostics.',
        'proj-electromedicina-titulo': 'Electromedical Equipment Management',
        'proj-electromedicina-desc': 'Professional experience in maintenance, calibration and management of medical instrumentation.',
        'proj-osciloscopio-titulo': 'Analog Oscilloscope Restoration',
        'proj-osciloscopio-desc': 'Teardown, diagnosis and repair of classic analog electronic instrumentation.',
        'proj-arduino-titulo': 'Arduino Projects',
        'proj-arduino-desc': 'Development of control systems using Arduino microcontrollers.',
        'proj-coche-titulo': 'Smart App RC Car (Arduino)',
        'proj-coche-desc': 'Development of vehicle controlled by microcontroller and mobile app.',
        'proj-extra-titulo': 'Extra Electronic Projects',
        'proj-extra-desc': 'Collection of minor repairs and additional electronic prototypes.',
        'cat-ciencia-header': 'Applied Science and Experimental R&D',
        'cat-ciencia-subheader': 'Research in vacuum physics, plasma, laser systems and high voltage vintage displays.',
        'proj-baragrafo-titulo': 'Nixie Bargraph',
        'proj-baragrafo-desc': 'High voltage technical experimentation with bargraph tube.',
        'proj-neon-titulo': 'Neon and Plasma Tubes',
        'proj-neon-desc': 'Experiments with gas discharge under low pressure conditions.',
        'proj-nixie-titulo': 'Nixie and Magic Eye Tubes',
        'proj-nixie-desc': 'Experimentation with classic vacuum tubes for numerical displays.',
        'proj-microscopio-titulo': 'Microscopy Projects',
        'proj-microscopio-desc': 'Modification and improvement of optical systems for scientific micro-photography.',
        'turbici-main-h2': 'Turbici: Jet Turbine Integration',
        'turbici-main-p': 'FEATURED PROJECT',
        'turbici-card-mec-h3': '🔧 Chassis Engineering',
        'turbici-card-mec-p': 'Thermal anchors, structural welding and reinforcements.',
        'turbici-card-elec-h3': '🎛️ Electronic Controller',
        'turbici-card-elec-p': 'Ignition systems, monitoring and RC control.',
        'turbici-card-video-p': 'Ignition tests, thrust test and project in action.',
        'turbici-mec-fase1-h3': 'Phase 1: Chassis Reinforcement and Modification',
        'turbici-mec-fase1-p': 'To withstand the immense linear thrust of the turbine, the bicycle frame had to undergo a structural redesign, applying TIG/MIG welding techniques to ensure maximum rigidity.',
        'turbici-mec-fase2-h3': 'Phase 2: Thermal Insulation and Anchors',
        'turbici-mec-fase2-p': 'The jet turbine reaches critical temperatures in its combustion chamber. I designed custom machined anchors and thermal dissipation barriers to protect nearby components and ensure total safety.',
        'turbici-mec-fase3-h3': 'Integration and 3D Packaging',
        'turbici-mec-fase3-p': 'The entire control board, along with the batteries and signal modules, was packaged in custom CAD-designed and 3D-printed cases to protect them from weather and vibrations.',
        'turbici-elec-fase1-h3': 'Electronic Brain Development',
        'turbici-elec-fase1-p': 'To manage the ignition, acceleration, and safety parameters of the turbine, I developed a control system based on Arduino.',
        'turbici-vid-fase1-h3': 'Action Testing and Operation',
        'turbici-vid-fase1-p': 'Complete collection of dynamic tests. Here you can see from the first jet engine starts to the electronic control response and real-time telemetry.',
        'modal-tag-3d': 'ADDITIVE MANUFACTURING / 3D',
        'modal-title-3d': '3D Projects',
        'modal-tag-arduino': 'ELECTRONICS / ARDUINO',
        'modal-title-arduino': 'Arduino Projects',
        'modal-tag-coche': 'ARDUINO / RC',
        'modal-title-coche': 'Smart RC Car',
        'modal-tag-extra': 'VARIOUS',
        'modal-title-extra': 'Extra Projects',
        'modal-tag-micromecanica': 'MICROMECHANICS',
        'modal-title-desmontaje': 'Typewriter Teardown',
        'modal-tag-mecanizado': 'PRECISION MECHANICS',
        'modal-title-mecanizado': 'Machining Works',
        'modal-tag-optica': 'SCIENCE / OPTICS',
        'modal-title-microscopio': 'Microscopy',
        'modal-tag-patinete': 'MECHANICS / ENGINE',
        'modal-title-patinete': 'Motorized Scooter',
        'modal-tag-baragrafo': 'HIGH VOLTAGE',
        'modal-title-baragrafo': 'Nixie Bargraph',
        'modal-tag-neon': 'HIGH VOLTAGE',
        'modal-title-neon': 'Neon Tubes',
        'modal-tag-nixie': 'HIGH VOLTAGE',
        'modal-title-nixie': 'Classic Nixie Tubes'
    }
};

function cambiarIdioma(manual = true) {
    if (manual) {
        idiomaActual = idiomaActual === 'es' ? 'en' : 'es';
    } else {
        // Carga inicial: usar el idioma ya establecido (por localStorage o auto-detect)
    }
    
    // Guardar preferencia
    localStorage.setItem('idiomaPreferido', idiomaActual);
    
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
    typewriterTimeout = setTimeout(type, 600);
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
        if (idPlantilla) {
            const contenido = document.getElementById(idPlantilla).innerHTML;
            modalContenedor.innerHTML = contenido;
            
            // Aplicar traducción al contenido inyectado
            cambiarIdioma(false);
        }
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
    if (btnId) btnId.onclick = () => cambiarIdioma(true);

    // ---- DETECCIÓN Y PERSISTENCIA DE IDIOMA ----
    const idiomaGuardado = localStorage.getItem('idiomaPreferido');
    if (idiomaGuardado) {
        idiomaActual = idiomaGuardado;
        cambiarIdioma(false);
    } else {
        const userLang = navigator.language || navigator.userLanguage;
        if (userLang && !userLang.toLowerCase().startsWith('es')) {
            idiomaActual = 'en';
            cambiarIdioma(false);
        } else {
            // Asegurar etiquetas iniciales en ES
            cambiarIdioma(false);
        }
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
                detect_on: 'window',
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
