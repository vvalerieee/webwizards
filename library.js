// library.js - Library page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const libraryTabs = document.querySelectorAll('.library-tab');
    const libraryItems = document.querySelectorAll('.library-item');
    const emptyState = document.getElementById('emptyState');
    const libraryContainer = document.getElementById('libraryContainer');
    
    libraryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Update active tab
            libraryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items and check if section is empty
            let hasVisibleItems = false;
            
            libraryItems.forEach(item => {
                if (item.classList.contains(targetTab)) {
                    item.style.display = 'block';
                    hasVisibleItems = true;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show empty state if no items in section
            if (hasVisibleItems) {
                emptyState.style.display = 'none';
                libraryContainer.style.display = 'grid';
            } else {
                emptyState.style.display = 'block';
                libraryContainer.style.display = 'none';
            }
        });
    });
    
    // Remove item functionality
    const removeButtons = document.querySelectorAll('.remove-btn');
    
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = this.closest('.library-item');
            if (confirm('Are you sure you want to remove this item from your library?')) {
                item.style.opacity = '0';
                item.style.transform = 'translateX(100px)';
                
                setTimeout(() => {
                    item.remove();
                    // Check if we need to show empty state
                    const visibleItems = document.querySelectorAll('.library-item[style*="display: block"]');
                    if (visibleItems.length === 0) {
                        emptyState.style.display = 'block';
                        libraryContainer.style.display = 'none';
                    }
                }, 300);
            }
        });
    });
    
    // Reading progress simulation
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        // Random progress for demo purposes
        const randomProgress = Math.floor(Math.random() * 30) + 20;
        bar.style.width = `${randomProgress}%`;
        bar.closest('.reading-progress').querySelector('.progress-text').textContent = 
            `${randomProgress}% completed`;
    });
});