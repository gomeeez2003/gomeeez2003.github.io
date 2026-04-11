/* ================================================
   PORTFOLIO ADRIÁN GÓMEZ — app.js
   Todo el código dentro de DOMContentLoaded para
   garantizar compatibilidad con el atributo defer.
   ================================================ */

let modalAbierto = false;

// ---- NAVEGACIÓN POR HASH ----
function navegar(idPantalla) { window.location.hash = idPantalla; }

window.addEventListener('hashchange', function() {
    let hash = window.location.hash.substring(1);

    if (modalAbierto && hash !== 'ventana-abierta') {
        cerrarModalLogica();
    }

    if (!hash) hash = 'pantalla-inicio';

    if (hash !== 'ventana-abierta') {
        const destino = document.getElementById(hash);
        if (destino && destino.classList.contains('page')) {

            // Detener vídeos al cambiar de página
            document.querySelectorAll('.page.active iframe').forEach(iframe => {
                let clone = iframe.cloneNode(true);
                iframe.parentNode.replaceChild(clone, iframe);
            });

            document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
            destino.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Reanimar los scroll-reveal de la página recién activada
            destino.querySelectorAll('.scroll-reveal').forEach(el => {
                el.classList.remove('visible');
                // Pequeño delay para que el reflow ocurra antes de la animación
                requestAnimationFrame(() => {
                    setTimeout(() => el.classList.add('visible'), 80);
                });
            });
        }
    }
});

// ---- INICIALIZACIÓN AL CARGA ----
document.addEventListener('DOMContentLoaded', function() {

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

    // ---- BUSCADOR ----
    window.filtrarCategorias = function() {
        let input = document.getElementById('buscador').value.toLowerCase();
        let tarjetas = document.querySelectorAll('#lista-categorias .card-cat');
        tarjetas.forEach(tarjeta => {
            let keywords = tarjeta.getAttribute('data-keywords').toLowerCase();
            tarjeta.style.display = keywords.includes(input) ? 'block' : 'none';
        });
    };

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
        }
    });

    window.cerrarLightbox = function() {
        document.getElementById('lightbox').style.display = 'none';
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

}); // fin DOMContentLoaded
