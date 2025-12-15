document.addEventListener('DOMContentLoaded', function() {
    // --- 1. MENU MOBILE ---
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('.desktop-nav');
    const navLinks = document.querySelectorAll('.desktop-nav a');

    // Alternar menu
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Fechar ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) closeMenu();
        });
    });

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            nav.style.display === 'flex' && 
            !nav.contains(e.target) && 
            !menuBtn.contains(e.target)) {
            closeMenu();
        }
    });

    // Resetar menu ao redimensionar a tela
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.removeAttribute('style');
            nav.querySelectorAll('ul').forEach(ul => ul.removeAttribute('style'));
        } else {
            if (nav.style.display !== 'flex') nav.style.display = 'none';
        }
    });

    function toggleMenu() {
        if (nav.style.display === 'flex') {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function openMenu() {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.width = '100%';
        nav.style.backgroundColor = '#FFFFFF';
        nav.style.padding = '20px 0';
        nav.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)';
        nav.style.zIndex = '1000';
        
        const listItems = nav.querySelectorAll('ul');
        listItems.forEach(ul => {
            ul.style.flexDirection = 'column';
            ul.style.alignItems = 'center';
            ul.style.gap = '20px';
        });
    }

    function closeMenu() {
        nav.style.display = 'none';
    }


    // --- 2. HEADER STICKY (SOMBRA AO ROLAR) ---
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });


    // --- 3. SCROLL REVEAL (ANIMAÇÃO AO APARECER) ---
    const revealElements = document.querySelectorAll('.hero-content, .hero-image-wrapper, .section-suppliers .image-col, .section-suppliers .text-col, .section-import .text-col, .section-import .image-col, .metrics-grid, .cta-text, .cta-image');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Dispara quando 15% do elemento estiver visível
        rootMargin: "0px"
    });

    revealElements.forEach(el => {
        el.classList.add('reveal'); // Adiciona classe base CSS
        revealObserver.observe(el);
    });


    // --- 4. CONTADOR DE MÉTRICAS ANIMADO ---
    const metricsSection = document.querySelector('.metrics-section');
    const metricNumbers = document.querySelectorAll('.metric-number');
    let started = false;

    const metricsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            started = true;
            metricNumbers.forEach(num => {
                startCount(num);
            });
        }
    }, { threshold: 0.5 });

    if (metricsSection) {
        metricsObserver.observe(metricsSection);
    }

    function startCount(el) {
        const originalText = el.innerText;
        // Extrai apenas os números (ex: "+8k" vira 8)
        const target = parseInt(originalText.replace(/\D/g, '')); 
        // Identifica prefixo (+) e sufixo (k)
        const prefix = originalText.includes('+') ? '+' : '';
        const suffix = originalText.toLowerCase().includes('k') ? 'k' : '';
        
        let current = 0;
        const duration = 2000; // 2 segundos
        const increment = Math.ceil(target / (duration / 20)); // Define velocidade

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.innerText = `${prefix}${current}${suffix}`;
        }, 20);
    }
});