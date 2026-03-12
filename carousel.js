// ===== CARROUSEL AVEC AUTO-PLAY (UNIQUEMENT SUR GALERIE.HTML) =====
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si on est sur la page galerie
    const track = document.querySelector('.carousel-track');
    if (!track) return; // Sort si pas de carrousel sur cette page
    
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const playPauseBtn = document.querySelector('.carousel-playpause');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    let currentIndex = 0;
    const slideCount = slides.length;
    let autoPlayInterval = null;
    let isPlaying = true;
    
    // Créer les indicateurs
    for (let i = 0; i < slideCount; i++) {
        const indicator = document.createElement('span');
        indicator.classList.add('indicator');
        indicator.setAttribute('data-index', i);
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }
    
    const indicators = document.querySelectorAll('.indicator');
    
    // Fonction pour aller à un slide spécifique
    function goToSlide(index) {
        if (index < 0) index = slideCount - 1;
        if (index >= slideCount) index = 0;
        
        track.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
        
        // Mettre à jour les indicateurs
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        
        // Mettre à jour les miniatures
        thumbnails.forEach((thumb, i) => {
            if (i === index) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }
    
    // Fonction pour passer au slide suivant
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    // Fonction pour démarrer l'auto-play
    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, 4000);
        isPlaying = true;
        if (playPauseBtn) playPauseBtn.textContent = '⏸️';
    }
    
    // Fonction pour arrêter l'auto-play
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
        isPlaying = false;
        if (playPauseBtn) playPauseBtn.textContent = '▶️';
    }
    
    // Fonction pour basculer play/pause
    function toggleAutoPlay() {
        if (isPlaying) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    }
    
    // Événements des boutons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            goToSlide(currentIndex - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            goToSlide(currentIndex + 1);
        });
    }
    
    // Bouton play/pause
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', toggleAutoPlay);
    }
    
    // Événements des miniatures
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            stopAutoPlay();
            goToSlide(index);
        });
    });
    
    // Événements des indicateurs
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoPlay();
            goToSlide(index);
        });
    });
    
    // Pause au survol du carrousel
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            if (isPlaying) {
                stopAutoPlay();
            }
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            // Ne redémarre pas automatiquement
        });
    }
    
    // Initialiser
    goToSlide(0);
    startAutoPlay();
    
    // Swipe tactile pour mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            // Swipe gauche -> suivant
            stopAutoPlay();
            goToSlide(currentIndex + 1);
        } else if (touchEndX - touchStartX > 50) {
            // Swipe droite -> précédent
            stopAutoPlay();
            goToSlide(currentIndex - 1);
        }
    });
});