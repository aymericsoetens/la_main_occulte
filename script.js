// ===== MENU BURGER GLOBAL =====
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const overlay = document.getElementById('menuOverlay');
    
    if (burger && nav && overlay) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
            overlay.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('nav-active') ? 'hidden' : 'auto';
        });
        
        overlay.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                overlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }
});