let modalAbierto = false;

function navegar(idPantalla) { window.location.hash = idPantalla; }

window.addEventListener('hashchange', function() {
    let hash = window.location.hash.substring(1);

    if (modalAbierto && hash !== 'ventana-abierta') {
        cerrarModalLogica();
    }

    if (!hash) hash = 'pantalla-inicio';

    if (hash !== 'ventana-abierta') {
        let destino = document.getElementById(hash);
        if (destino && destino.classList.contains('page')) {

            // --- FIX: Detener y reiniciar vídeos SIN afectar a las flechas del navegador ---
            // En lugar de recargar la ruta (lo que engaña al historial), "clonamos" la caja del vídeo
            // de la página que vamos a abandonar y la sustituimos. Esto lo reinicia a 0s y lo pausa.
            document.querySelectorAll('.page.active iframe').forEach(iframe => {
                let clone = iframe.cloneNode(true);
                iframe.parentNode.replaceChild(clone, iframe);
            });
            // -------------------------------------------------------------------------------

            document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
            destino.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
});

window.addEventListener('DOMContentLoaded', function() {
    // FIX: Si recargas la página estando en un proyecto fantasma, te devuelve al inicio
    if (!window.location.hash || window.location.hash === '#ventana-abierta') {
        window.location.hash = 'pantalla-inicio';
    } else {
        let event = new Event('hashchange'); window.dispatchEvent(event);
    }
});

function filtrarCategorias() {
    let input = document.getElementById('buscador').value.toLowerCase();
    let tarjetas = document.querySelectorAll('#lista-categorias .card-cat');
    tarjetas.forEach(tarjeta => {
        let keywords = tarjeta.getAttribute('data-keywords').toLowerCase();
        if (keywords.includes(input)) { tarjeta.style.display = "block"; }
        else { tarjeta.style.display = "none"; }
    });
}

const navMenu = document.getElementById('nav-menu');
const menuToggle = document.getElementById('menu-toggle');

function toggleMenu() {
    navMenu.classList.toggle('activo');
    menuToggle.classList.toggle('activo');
}

function accionMenu(accion) {
    navMenu.classList.remove('activo');
    menuToggle.classList.remove('activo');
    if(accion === 'inicio') { navegar('pantalla-inicio'); window.scrollTo(0,0); }
    else if (accion === 'proyectos') { navegar('pantalla-inicio'); setTimeout(() => document.getElementById('lista-categorias').scrollIntoView({behavior: 'smooth', block: 'start'}), 100); }
    else if (accion === 'buscar') { navegar('pantalla-inicio'); setTimeout(() => { document.getElementById('buscador').scrollIntoView({behavior: 'smooth', block: 'center'}); document.getElementById('buscador').focus(); }, 100); }
    else if (accion === 'contacto') { navegar('pantalla-contacto'); }
}

window.addEventListener('click', function(e) {
    if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('activo');
        menuToggle.classList.remove('activo');
    }
});

const modal = document.getElementById('modal-proyecto');
const modalContenedor = document.getElementById('modal-info-container');

function abrirModalExtendido(idPlantilla) {
    const contenido = document.getElementById(idPlantilla).innerHTML;
    modalContenedor.innerHTML = contenido;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    modalAbierto = true;
    window.location.hash = 'ventana-abierta';
}

function cerrarModal() {
    if (window.location.hash === '#ventana-abierta') {
        window.history.back();
    } else {
        cerrarModalLogica();
    }
}

function cerrarModalLogica() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    modalContenedor.innerHTML = '';
    modalAbierto = false;
}

function cerrarModalFuera(event) {
    if (event.target === modal) { cerrarModal(); }
}

document.body.addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG' && e.target.classList.contains('media-proyecto')) {
        document.getElementById('lightbox-img').src = e.target.src;
        document.getElementById('lightbox').style.display = 'flex';
    }
});

function cerrarLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

/* ================================================
   PASO 3: EFECTOS EXTRAS (HERO)
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Efecto Typewriter (Terminal)
    const typedTextElement = document.getElementById('typed-text');
    if (typedTextElement) {
        const textToType = "Técnico en Mecatrónica Industrial (Nº1 Promoción) | Maker & I+D";
        let charIndex = 0;
        
        function typeWriter() {
            if (charIndex < textToType.length) {
                typedTextElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 40); // Velocidad de escritura
            }
        }
        
        // Pequeño delay antes de empezar a escribir
        setTimeout(typeWriter, 500);
    }

    // 2. Inicialización de particles.js
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 60,
                    "density": { "enable": true, "value_area": 800 }
                },
                "color": { "value": "#00e5b8" }, // Color acento
                "shape": { "type": "circle" },
                "opacity": {
                    "value": 0.4,
                    "random": true,
                    "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": { "enable": false }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00e5b8",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.5,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": { "enable": false }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 200, "line_linked": { "opacity": 0.6 } },
                    "push": { "particles_nb": 3 }
                }
            },
            "retina_detect": true
        });
    }
});
