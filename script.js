// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();
    initializeNavbar();
    initializeSearch();
    initializeFilters();
    initializeCounters();
    initializeScrollAnimations();
});

// ==================== ANIMATED COUNTERS ====================
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, duration / steps);
    };

    // Trigger animation when hero section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    if (counter.textContent === '0') {
                        animateCounter(counter);
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    const hero = document.querySelector('.hero');
    if (hero) observer.observe(hero);
}

// ==================== SCROLL ANIMATIONS ====================
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                // Optional: unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
}

// ==================== NAVBAR SCROLL EFFECT ====================
function initializeNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Navbar links active state based on scroll
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.certificate-section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('data-category');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-filter') === current) {
                link.classList.add('active');
            }
        });
    });
}

// ==================== SEARCH FUNCTIONALITY ====================
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const certificateCards = document.querySelectorAll('.certificate-card');
        const scholarshipCards = document.querySelectorAll('.scholarship-card');
        
        // Search through certificate cards
        certificateCards.forEach(card => {
            const title = card.querySelector('.cert-title')?.textContent.toLowerCase() || '';
            const org = card.querySelector('.cert-org')?.textContent.toLowerCase() || '';
            const tags = Array.from(card.querySelectorAll('.tag'))
                .map(tag => tag.textContent.toLowerCase())
                .join(' ');
            
            const content = `${title} ${org} ${tags}`;
            
            if (content.includes(searchTerm)) {
                card.style.display = '';
                // Add highlight animation
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = 'fadeInScale 0.3s ease';
                }, 10);
            } else {
                card.style.display = 'none';
            }
        });
        
        // Search through scholarship cards
        scholarshipCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const org = card.querySelector('.scholarship-org')?.textContent.toLowerCase() || '';
            
            const content = `${title} ${org}`;
            
            if (content.includes(searchTerm)) {
                card.style.display = '';
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = 'fadeInScale 0.3s ease';
                }, 10);
            } else {
                card.style.display = 'none';
            }
        });
        
        // Hide empty sections
        const sections = document.querySelectorAll('.certificate-section');
        sections.forEach(section => {
            const visibleCards = section.querySelectorAll('.certificate-card:not([style*="display: none"]), .scholarship-card:not([style*="display: none"])');
            if (visibleCards.length === 0) {
                section.style.display = 'none';
            } else {
                section.style.display = '';
            }
        });
    });
}

// ==================== FILTER FUNCTIONALITY ====================
function initializeFilters() {
    // Chip filters
    const chips = document.querySelectorAll('.chip');
    const sections = document.querySelectorAll('.certificate-section');
    
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const category = chip.getAttribute('data-category');
            
            // Update active chip
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            
            // Filter sections
            if (category === 'all') {
                sections.forEach(section => {
                    section.classList.remove('hidden');
                    animateSection(section);
                });
            } else {
                sections.forEach(section => {
                    const sectionCategory = section.getAttribute('data-category');
                    if (sectionCategory === category) {
                        section.classList.remove('hidden');
                        animateSection(section);
                    } else {
                        section.classList.add('hidden');
                    }
                });
            }
            
            // Clear search when filtering
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.value = '';
                resetCardVisibility();
            }
        });
    });
    
    // Nav link filters
    const navLinks = document.querySelectorAll('.nav-link[data-filter]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = link.getAttribute('data-filter');
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Map filter to categories
            const categoryMap = {
                'all': 'all',
                'web': 'web-development',
                'ai': ['ai-ml', 'generative-ai'],
                'cloud': ['cloud', 'devops'],
                'scholarships': 'scholarships'
            };
            
            const targetCategories = Array.isArray(categoryMap[filter]) 
                ? categoryMap[filter] 
                : [categoryMap[filter]];
            
            // Filter sections
            if (filter === 'all') {
                sections.forEach(section => {
                    section.classList.remove('hidden');
                    animateSection(section);
                });
            } else {
                sections.forEach(section => {
                    const sectionCategory = section.getAttribute('data-category');
                    if (targetCategories.includes(sectionCategory)) {
                        section.classList.remove('hidden');
                        animateSection(section);
                        // Smooth scroll to first visible section
                        if (!section.classList.contains('hidden')) {
                            setTimeout(() => {
                                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }, 100);
                        }
                    } else {
                        section.classList.add('hidden');
                    }
                });
            }
            
            // Update chips to match
            chips.forEach(chip => {
                const chipCategory = chip.getAttribute('data-category');
                if (filter === 'all' && chipCategory === 'all') {
                    chip.classList.add('active');
                } else if (targetCategories.includes(chipCategory)) {
                    chip.classList.add('active');
                } else {
                    chip.classList.remove('active');
                }
            });
        });
    });
}

// ==================== HELPER FUNCTIONS ====================
function animateSection(section) {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    }, 50);
}

function resetCardVisibility() {
    const allCards = document.querySelectorAll('.certificate-card, .scholarship-card');
    allCards.forEach(card => {
        card.style.display = '';
    });
    
    const sections = document.querySelectorAll('.certificate-section');
    sections.forEach(section => {
        section.style.display = '';
    });
}

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== PARALLAX EFFECT ====================
function initializeAnimations() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-content');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - (scrolled / 600);
        }
    });
}

// ==================== CERTIFICATE CARD INTERACTIONS ====================
document.addEventListener('DOMContentLoaded', () => {
    const certCards = document.querySelectorAll('.certificate-card');
    
    certCards.forEach(card => {
        // 3D tilt effect on hover
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `
                translateY(-10px) 
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                scale(1.02)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
        });
    });
});

// ==================== LOADING ANIMATION ====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('aos-animate');
        }, index * 50);
    });
});

// ==================== PLATFORM LOGOS ANIMATION ====================
document.addEventListener('DOMContentLoaded', () => {
    const platformLogos = document.querySelectorAll('.platform-logo');
    
    platformLogos.forEach((logo, index) => {
        logo.style.animation = `fadeInScale 0.6s ease ${index * 0.1}s both`;
    });
});

// ==================== KEYBOARD NAVIGATION ====================
document.addEventListener('keydown', (e) => {
    // ESC to clear search
    if (e.key === 'Escape') {
        const searchInput = document.getElementById('searchInput');
        if (searchInput && searchInput.value) {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
        }
    }
    
    // / to focus search
    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        document.getElementById('searchInput')?.focus();
    }
});

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for better performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to search
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    const debouncedSearch = debounce((e) => {
        // Search logic already in initializeSearch
    }, 300);
    
    // Note: The search is already implemented in initializeSearch
    // This is just showing how you could optimize it further if needed
}

// ==================== TOOLTIP FOR BADGES ====================
document.addEventListener('DOMContentLoaded', () => {
    const badges = document.querySelectorAll('.cert-badge');
    
    badges.forEach(badge => {
        badge.setAttribute('title', 'Verified Certificate');
    });
});

// ==================== PRINT FUNCTIONALITY ====================
window.addEventListener('beforeprint', () => {
    // Reset all filters before printing
    const sections = document.querySelectorAll('.certificate-section');
    sections.forEach(section => {
        section.classList.remove('hidden');
    });
    
    const cards = document.querySelectorAll('.certificate-card, .scholarship-card');
    cards.forEach(card => {
        card.style.display = '';
    });
});

// ==================== ANALYTICS TRACKING (OPTIONAL) ====================
// Track certificate card clicks
document.addEventListener('DOMContentLoaded', () => {
    const certLinks = document.querySelectorAll('.cert-link');
    
    certLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const certTitle = link.closest('.certificate-card')
                ?.querySelector('.cert-title')?.textContent;
            console.log(`Certificate viewed: ${certTitle}`);
            // Add your analytics tracking code here
        });
    });
});

// ==================== ACCESSIBILITY ENHANCEMENTS ====================
document.addEventListener('DOMContentLoaded', () => {
    // Add aria-labels to interactive elements
    const chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
        chip.setAttribute('role', 'button');
        chip.setAttribute('aria-pressed', chip.classList.contains('active'));
        
        chip.addEventListener('click', () => {
            chip.setAttribute('aria-pressed', chip.classList.contains('active'));
        });
    });
    
    // Announce search results to screen readers
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const announcer = document.createElement('div');
        announcer.setAttribute('role', 'status');
        announcer.setAttribute('aria-live', 'polite');
        announcer.className = 'sr-only';
        document.body.appendChild(announcer);
        
        searchInput.addEventListener('input', debounce(() => {
            const visibleCards = document.querySelectorAll(
                '.certificate-card:not([style*="display: none"]), ' +
                '.scholarship-card:not([style*="display: none"])'
            );
            announcer.textContent = `${visibleCards.length} results found`;
        }, 500));
    }
});

// ==================== DARK MODE TOGGLE (OPTIONAL) ====================
// You can add this feature if desired
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
