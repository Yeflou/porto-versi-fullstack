/**
 * INTERACTION LOGIC - SEA BLUE PORTFOLIO
 ========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. SCROLL PROGRESS & STICKY NAVBAR
    const scrollProgress = document.getElementById('scroll-progress');
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        
        // Update Scroll Progress Bar
        scrollProgress.style.width = scrolled + '%';

        // Sticky Navbar Effect
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top visibility
        if (scrollTop > 500) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    // Back to top action
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 2. MOBILE NAVIGATION MENU TOGGLE
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileNavToggle.addEventListener('click', () => {
        mobileNavToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile nav when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 3. INTERSECTION OBSERVER FOR ACTIVE NAV LINKS
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies the middle part of viewport
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 4. PROJECT DYNAMIC FILTER
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';
                    // Trigger a clean entrance animation
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                        card.style.transition = 'var(--transition)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 5. PROFILE PHOTO UPLOAD SIMULATOR (Interactive Placeholder)
    const photoFrame = document.getElementById('photoFrame');
    const photoInput = document.getElementById('photoInput');

    if (photoFrame && photoInput) {
        photoFrame.addEventListener('click', () => {
            // Only trigger upload if it is still a placeholder
            if (photoFrame.classList.contains('photo-placeholder')) {
                photoInput.click();
            }
        });

        photoInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Remove placeholder design
                    photoFrame.classList.remove('photo-placeholder');
                    photoFrame.innerHTML = ''; // Clear icon and helper texts
                    
                    // Create and append the uploaded image
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.alt = 'Uploaded Profile Photo';
                    img.classList.add('profile-photo');
                    
                    // Create edit option on hover
                    const editOverlay = document.createElement('div');
                    editOverlay.style.position = 'absolute';
                    editOverlay.style.top = '0';
                    editOverlay.style.left = '0';
                    editOverlay.style.width = '100%';
                    editOverlay.style.height = '100%';
                    editOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
                    editOverlay.style.display = 'flex';
                    editOverlay.style.flexDirection = 'column';
                    editOverlay.style.justifyContent = 'center';
                    editOverlay.style.alignItems = 'center';
                    editOverlay.style.opacity = '0';
                    editOverlay.style.transition = 'var(--transition)';
                    editOverlay.style.borderRadius = 'var(--border-radius-lg)';
                    editOverlay.style.color = '#fff';
                    editOverlay.style.cursor = 'pointer';
                    editOverlay.innerHTML = '<i class="fa-solid fa-pen" style="font-size: 2rem; margin-bottom: 10px;"></i><span>Ganti Foto</span>';
                    
                    photoFrame.appendChild(img);
                    photoFrame.appendChild(editOverlay);

                    // Add hover interactions to edit overlay
                    photoFrame.addEventListener('mouseenter', () => {
                        editOverlay.style.opacity = '1';
                    });
                    photoFrame.addEventListener('mouseleave', () => {
                        editOverlay.style.opacity = '0';
                    });
                    editOverlay.addEventListener('click', (ev) => {
                        ev.stopPropagation(); // Avoid loop
                        photoInput.click();
                    });
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 6. CONTACT FORM SUBMISSION HANDLING (Simulated)
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.btn-submit');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('.btn-icon');

            // Set loading state
            submitBtn.disabled = true;
            btnText.textContent = 'Mengirim...';
            btnIcon.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

            // Simulate server network latency
            setTimeout(() => {
                // Success feedback
                formStatus.style.display = 'block';
                formStatus.className = 'form-status success';
                formStatus.innerHTML = '<i class="fa-regular fa-circle-check"></i> Pesan terkirim! Terima kasih telah menghubungi saya.';

                // Reset button state
                submitBtn.disabled = false;
                btnText.textContent = 'Kirim Pesan';
                btnIcon.innerHTML = '<i class="fa-regular fa-paper-plane"></i>';

                // Reset form inputs
                contactForm.reset();

                // Hide status message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }, 1800);
        });
    }
});
