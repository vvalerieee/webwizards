// explore.js - Explore page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const resultCards = document.querySelectorAll('.result-card');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter results
            resultCards.forEach(card => {
                if (targetTab === 'mixed' || card.classList.contains(targetTab)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // View options
    const viewOptions = document.querySelectorAll('.view-option');
    const resultsGrid = document.getElementById('resultsContainer');
    
    viewOptions.forEach(option => {
        option.addEventListener('click', function() {
            const viewType = this.getAttribute('data-view');
            
            // Update active view
            viewOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Change grid layout
            if (viewType === 'list') {
                resultsGrid.style.gridTemplateColumns = '1fr';
            } else {
                resultsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(350px, 1fr))';
            }
        });
    });
    
    // Filter functionality
    const categoryFilter = document.getElementById('category');
    const sortFilter = document.getElementById('sort');
    
    [categoryFilter, sortFilter].forEach(filter => {
        filter.addEventListener('change', function() {
            // In a real implementation, this would make an API call
            // or filter existing results based on the selected criteria
            console.log('Filters updated:', {
                category: categoryFilter.value,
                sort: sortFilter.value
            });
        });
    });
    
    // Load more functionality
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    loadMoreBtn.addEventListener('click', function() {
        // Simulate loading more results
        this.textContent = 'Loading...';
        this.disabled = true;
        
        setTimeout(() => {
            // In a real implementation, this would load more content from an API
            alert('More results would be loaded here in a real implementation');
            this.textContent = 'Load More Results';
            this.disabled = false;
        }, 1000);
    });
});