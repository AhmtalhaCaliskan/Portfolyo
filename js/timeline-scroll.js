// Timeline Horizontal Scroll Navigation
document.addEventListener('DOMContentLoaded', function() {
    const timelineScroll = document.getElementById('timelineScroll');
    const timelinePrev = document.getElementById('timelinePrev');
    const timelineNext = document.getElementById('timelineNext');
    
    if (timelineScroll && timelinePrev && timelineNext) {
        const scrollAmount = 400;
        
        function scrollLeft() {
            timelineScroll.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
        
        function scrollRight() {
            timelineScroll.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
        
        // Previous button
        timelinePrev.addEventListener('click', scrollLeft);
        timelinePrev.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            scrollLeft();
        });
        
        // Next button
        timelineNext.addEventListener('click', scrollRight);
        timelineNext.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            scrollRight();
        });
        
        // Touch/Swipe support for timeline
        let touchStartX = 0;
        let touchEndX = 0;
        
        timelineScroll.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        timelineScroll.addEventListener('touchmove', (e) => {
            touchEndX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        timelineScroll.addEventListener('touchend', () => {
            const diff = touchStartX - touchEndX;
            const swipeThreshold = 50;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swiped left - scroll right
                    scrollRight();
                } else {
                    // Swiped right - scroll left
                    scrollLeft();
                }
            }
        }, { passive: true });
        
        // Update button states
        function updateButtons() {
            const scrollLeft = timelineScroll.scrollLeft;
            const maxScroll = timelineScroll.scrollWidth - timelineScroll.clientWidth;
            
            timelinePrev.style.opacity = scrollLeft <= 10 ? '0.5' : '1';
            timelinePrev.style.pointerEvents = scrollLeft <= 10 ? 'none' : 'auto';
            
            timelineNext.style.opacity = scrollLeft >= maxScroll - 10 ? '0.5' : '1';
            timelineNext.style.pointerEvents = scrollLeft >= maxScroll - 10 ? 'none' : 'auto';
        }
        
        timelineScroll.addEventListener('scroll', updateButtons);
        window.addEventListener('resize', updateButtons);
        updateButtons();
    }
});
