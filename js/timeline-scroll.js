// Timeline Horizontal Scroll Navigation
document.addEventListener('DOMContentLoaded', function() {
    const timelineScroll = document.getElementById('timelineScroll');
    const timelinePrev = document.getElementById('timelinePrev');
    const timelineNext = document.getElementById('timelineNext');
    
    if (timelineScroll && timelinePrev && timelineNext) {
        const scrollAmount = 400;
        
        // Previous button
        timelinePrev.addEventListener('click', () => {
            timelineScroll.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Next button
        timelineNext.addEventListener('click', () => {
            timelineScroll.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Hide/show buttons based on scroll position
        function updateButtons() {
            const scrollLeft = timelineScroll.scrollLeft;
            const maxScroll = timelineScroll.scrollWidth - timelineScroll.clientWidth;
            
            timelinePrev.style.opacity = scrollLeft <= 10 ? '0.5' : '1';
            timelinePrev.style.cursor = scrollLeft <= 10 ? 'not-allowed' : 'pointer';
            
            timelineNext.style.opacity = scrollLeft >= maxScroll - 10 ? '0.5' : '1';
            timelineNext.style.cursor = scrollLeft >= maxScroll - 10 ? 'not-allowed' : 'pointer';
        }
        
        // Update buttons on scroll
        timelineScroll.addEventListener('scroll', updateButtons);
        window.addEventListener('resize', updateButtons);
        
        // Initial update
        updateButtons();
    }
});
