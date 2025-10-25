// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Search Options Toggle
    const searchOptions = document.querySelectorAll('.search-option');
    
    searchOptions.forEach(option => {
        option.addEventListener('click', function() {
            searchOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar Scroll Effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'var(--surface)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'var(--surface)';
            navbar.style.boxShadow = 'var(--shadow)';
        }
    });
    
    // Card Hover Effects
    const cards = document.querySelectorAll('.featured-card, .category-card, .trending-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            if (navMenu.classList.contains('active')) {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.background = 'var(--surface)';
                navMenu.style.padding = '1rem';
                navMenu.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.1)';
            } else {
                navMenu.style.display = 'none';
            }
        });
    }
    
    // Search Functionality (Placeholder)
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-bar input');
    
    searchBtn.addEventListener('click', function() {
        if (searchInput.value.trim() !== '') {
            alert(`Searching for: ${searchInput.value}`);
            // In a real implementation, this would trigger the search functionality
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            if (searchInput.value.trim() !== '') {
                alert(`Searching for: ${searchInput.value}`);
                // In a real implementation, this would trigger the search functionality
            }
        }
    });

    // ========== FLIP BOOK FUNCTIONALITY ==========
    function initializeFlipBooks() {
        const flipBooks = document.querySelectorAll('.flip-book');
        
        flipBooks.forEach(book => {
            const flipIndicator = book.querySelector('.flip-indicator');
            const pageDots = book.querySelectorAll('.page-dot');
            const prevBtn = book.querySelector('.prev-btn');
            const nextBtn = book.querySelector('.next-btn');
            const pages = book.querySelectorAll('.book-page-content');
            
            let currentPage = 1;
            const totalPages = pages.length;
            
            // Flip book functionality
            flipIndicator.addEventListener('click', function(e) {
                e.stopPropagation();
                book.classList.toggle('flipped');
            });
            
            // Page navigation functionality
            function updatePageDisplay() {
                // Hide all pages
                pages.forEach(page => {
                    page.style.display = 'none';
                });
                
                // Show current page
                const currentPageElement = book.querySelector(`.page-${currentPage}`);
                if (currentPageElement) {
                    currentPageElement.style.display = 'block';
                }
                
                // Update page dots
                pageDots.forEach(dot => {
                    dot.classList.remove('active');
                    if (parseInt(dot.getAttribute('data-page')) === currentPage) {
                        dot.classList.add('active');
                    }
                });
                
                // Update button states
                prevBtn.disabled = currentPage === 1;
                nextBtn.disabled = currentPage === totalPages;
                
                // Update button text for last page
                if (currentPage === totalPages) {
                    nextBtn.innerHTML = 'Finish <i class="fas fa-flag-checkered"></i>';
                } else {
                    nextBtn.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
                }
            }
            
            // Next page
            nextBtn.addEventListener('click', function() {
                if (currentPage < totalPages) {
                    currentPage++;
                    updatePageDisplay();
                } else {
                    // Close the book when finished
                    book.classList.remove('flipped');
                    currentPage = 1;
                    updatePageDisplay();
                }
            });
            
            // Previous page
            prevBtn.addEventListener('click', function() {
                if (currentPage > 1) {
                    currentPage--;
                    updatePageDisplay();
                }
            });
            
            // Page dot navigation
            pageDots.forEach(dot => {
                dot.addEventListener('click', function() {
                    currentPage = parseInt(this.getAttribute('data-page'));
                    updatePageDisplay();
                });
            });
            
            // Close book when clicking on front cover (if flipped)
            book.addEventListener('click', function(e) {
                if (book.classList.contains('flipped') && e.target.closest('.book-front')) {
                    book.classList.remove('flipped');
                    currentPage = 1;
                    updatePageDisplay();
                }
            });
            
            // Initialize page display
            updatePageDisplay();
        });
    }

    // Initialize flip books
    initializeFlipBooks();
    
    // Add some interactive effects for flip books
    const flipBooks = document.querySelectorAll('.flip-book');
    
    flipBooks.forEach(book => {
        book.addEventListener('mouseenter', function() {
            if (!this.classList.contains('flipped')) {
                this.style.transform = 'translateY(-10px)';
            }
        });
        
        book.addEventListener('mouseleave', function() {
            if (!this.classList.contains('flipped')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    // ========== END FLIP BOOK FUNCTIONALITY ==========
    
    // Initialize with some animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});