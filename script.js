/* script.js */
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Mobile Menu Toggle
       ========================================================================== */
    const hamburger = document.getElementById('hamburger');
    const navList = document.querySelector('.nav-list');
    const header = document.getElementById('header');
    
    if (hamburger && navList) {
        hamburger.addEventListener('click', () => {
            navList.classList.toggle('active');
            header.classList.toggle('scrolled-mobile');
            
            // Hamburger animation
            const spans = hamburger.querySelectorAll('span');
            if (navList.classList.contains('active')) {
                spans[0].style.transform = 'translateY(9px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-9px) rotate(-45deg)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    /* ==========================================================================
       2. Header Background on Scroll
       ========================================================================== */
    const updateHeaderState = () => {
        if (!header) return;
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    let headerScrollTicking = false;

    window.addEventListener('scroll', () => {
        if (!headerScrollTicking) {
            window.requestAnimationFrame(() => {
                updateHeaderState();
                headerScrollTicking = false;
            });
            headerScrollTicking = true;
        }
    }, { passive: true });

    updateHeaderState();

    /* ==========================================================================
       3. Smooth Scroll for Internal Links
       ========================================================================== */
    const smoothLinks = document.querySelectorAll('.smooth-scroll, .footer-links a');
    
    smoothLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // Only capture clicks that purely start with # for on-page smooth scrolling.
            if(targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Close mobile menu if open
                    if (navList && navList.classList.contains('active')) {
                        navList.classList.remove('active');
                        const spans = hamburger.querySelectorAll('span');
                        spans[0].style.transform = 'none';
                        spans[1].style.opacity = '1';
                        spans[2].style.transform = 'none';
                    }

                    // Scroll
                    window.scrollTo({
                        top: targetSection.offsetTop - 80, // Offset for header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /* ==========================================================================
       4. Scroll Animations (Intersection Observer)
       ========================================================================== */
    // Checks for user preference to disable animations for accessibility
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const revealElements = document.querySelectorAll('.js-reveal, .fade-in');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -10% 0px', // Trigger slightly before it hits bottom
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible', 'visible');
                    // Stop observing once revealed
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        revealElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // If reduced motion is preferred, immediately show all elements safely
        document.querySelectorAll('.js-reveal, .fade-in').forEach(el => {
            el.classList.add('is-visible', 'visible');
        });
    }

    /* ==========================================================================
       5. Step Cards Interaction Logic (Click/Focus/Tap/Hover for Accessibility)
       ========================================================================== */
    const stepCards = document.querySelectorAll('.business-simple__step');
    
    if (stepCards.length > 0) {
        const setActiveStep = (selectedCard) => {
            // Remove active class from all
            stepCards.forEach(card => card.classList.remove('is-active'));
            // Add active class to selected
            selectedCard.classList.add('is-active');
        };

        stepCards.forEach(card => {
            // Handle Mouse Hover
            card.addEventListener('mouseenter', () => setActiveStep(card));

            // Handle Mouse Click & Touch Tap
            card.addEventListener('click', () => setActiveStep(card));
            
            // Handle Keyboard Focus (Tab Navigation)
            card.addEventListener('focus', () => setActiveStep(card));

            // Handle Keydown (Enter / Space)
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveStep(card);
                }
            });
        });
    }

    /* ==========================================================================
       6. Luxury Curated Image Fade Slider
       ========================================================================== */
    const luxurySlides = document.querySelectorAll('.luxury-slide');
    const luxurySliderReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (luxurySlides.length > 1 && !luxurySliderReducedMotion) {
        let currentLuxurySlide = 0;

        setInterval(() => {
            luxurySlides[currentLuxurySlide].classList.remove('is-active');

            currentLuxurySlide = (currentLuxurySlide + 1) % luxurySlides.length;

            luxurySlides[currentLuxurySlide].classList.add('is-active');
        }, 4000);
    }

    /* ==========================================================================
       8. Home from Home Hero Fade Slideshow
       ========================================================================== */
    const h4hSlides = document.querySelectorAll('.h4h-slide');
    const h4hReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (h4hSlides.length > 1 && !h4hReducedMotion) {
        let currentH4hSlide = 0;

        setInterval(() => {
            h4hSlides[currentH4hSlide].classList.remove('is-active');

            currentH4hSlide = (currentH4hSlide + 1) % h4hSlides.length;

            h4hSlides[currentH4hSlide].classList.add('is-active');
        }, 2800);
    }

});

/* ==========================================================================
       7. Corporate Stays Interactions
       ========================================================================== */
    const corporatePainCards = document.querySelectorAll('.corporate-pain-card');
    const corporateGuaranteeCards = document.querySelectorAll('.corporate-guarantee-card');
    const corporateWhyBlocks = document.querySelectorAll('.corporate-why-block');
    const corporateContactForm = document.getElementById('corporate-contact-form-element');
    const corporateFormCard = document.querySelector('.corporate-form-card--heartbeat');

    if (corporateContactForm && corporateFormCard) {
        corporateContactForm.addEventListener('focusin', () => {
            corporateFormCard.classList.add('is-being-used');
        });

        corporateContactForm.addEventListener('focusout', () => {
            setTimeout(() => {
                if (!corporateContactForm.contains(document.activeElement)) {
                    corporateFormCard.classList.remove('is-being-used');
                }
            }, 0);
        });
    }

    // Generic function to handle active states for grouped cards
    const handleCorporateCardActivation = (cardsGroup, selectedCard) => {
        cardsGroup.forEach(card => card.classList.remove('is-active'));
        selectedCard.classList.add('is-active');
    };

    // Attach listeners for Pain Points Cards
    if (corporatePainCards.length > 0) {
        corporatePainCards.forEach(card => {
            card.addEventListener('mouseenter', () => handleCorporateCardActivation(corporatePainCards, card));
            card.addEventListener('click', () => handleCorporateCardActivation(corporatePainCards, card));
            card.addEventListener('focus', () => handleCorporateCardActivation(corporatePainCards, card));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCorporateCardActivation(corporatePainCards, card);
                }
            });
        });
    }

    // Attach listeners for Guarantee Cards
    if (corporateGuaranteeCards.length > 0) {
        corporateGuaranteeCards.forEach(card => {
            card.addEventListener('mouseenter', () => handleCorporateCardActivation(corporateGuaranteeCards, card));
            card.addEventListener('click', () => handleCorporateCardActivation(corporateGuaranteeCards, card));
            card.addEventListener('focus', () => handleCorporateCardActivation(corporateGuaranteeCards, card));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCorporateCardActivation(corporateGuaranteeCards, card);
                }
            });
        });
    }

    // Attach listeners for 'Why Choose Us' Blocks
    if (corporateWhyBlocks.length > 0) {
        corporateWhyBlocks.forEach(block => {
            block.addEventListener('mouseenter', () => handleCorporateCardActivation(corporateWhyBlocks, block));
            block.addEventListener('click', () => handleCorporateCardActivation(corporateWhyBlocks, block));
            block.addEventListener('focus', () => handleCorporateCardActivation(corporateWhyBlocks, block));
            block.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCorporateCardActivation(corporateWhyBlocks, block);
                }
            });
        });
    }

    // Handle Contact Form Mailto Logic
    if (corporateContactForm) {
        corporateContactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Helper function to safely extract values
            const getFieldValue = (id) => {
                const element = document.getElementById(id);
                return (element && element.value.trim()) ? element.value.trim() : 'Not provided';
            };

            const fullName = getFieldValue('contact-name');
            const phone = getFieldValue('contact-phone');
            const email = getFieldValue('contact-email');
            const location = getFieldValue('contact-location');
            const arrival = getFieldValue('contact-arrival');
            const guests = getFieldValue('contact-guests');
            const bedrooms = getFieldValue('contact-bedrooms');
            const extraReqs = getFieldValue('contact-extra');

            // Construct email body
            const emailBody = `Hello Holt Accommodation Solutions,

I would like help finding suitable accommodation for a team stay.

Full name: ${fullName}
Phone number: ${phone}
Email address: ${email}
Location of accommodation: ${location}
Arrival date: ${arrival}
Number of guests/team members: ${guests}
Bedrooms needed: ${bedrooms}

Tell us what your team needs:
${extraReqs}

Please get back to me with suitable options when possible.

Kind regards,
${fullName}`;

            const mailtoLink = 'mailto:hello@holtaccommodation.co.uk' 
                + '?subject=' + encodeURIComponent('Corporate accommodation enquiry') 
                + '&body=' + encodeURIComponent(emailBody);

            // Open email client
            window.location.href = mailtoLink;

            // Show success message
            const successMsg = document.getElementById('contact-success-msg');
            if (successMsg) {
                successMsg.style.display = 'block';
                successMsg.style.opacity = '0';
                successMsg.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    successMsg.style.opacity = '1';
                }, 50);
            }
        });
    }

    /* ==========================================================================
   Contact Us Page Specific Interactions
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const contactCards = document.querySelectorAll('.contact-page .contact-card');
    
    if (contactCards.length > 0) {
        contactCards.forEach(card => {
            // Adds active class for smooth hover/focus highlighting
            card.addEventListener('mouseenter', () => {
                contactCards.forEach(c => c.classList.remove('is-active'));
                card.classList.add('is-active');
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('is-active');
            });

            // Accessibility: Trigger same states on focus-within for keyboard users
            card.addEventListener('focusin', () => {
                contactCards.forEach(c => c.classList.remove('is-active'));
                card.classList.add('is-active');
            });
            
            card.addEventListener('focusout', () => {
                card.classList.remove('is-active');
            });
        });
    }
});

/* ==========================================================================
   News Page Specific Interactions
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const newsShakeBtn = document.getElementById('newsShakeBtn');
    
    // Safety check ensuring this logic only fires on the news page
    if (newsShakeBtn) {
        
        // Triggers the animation every 4 seconds
        setInterval(() => {
            newsShakeBtn.classList.add('shake-active');
            
            // Removes the class after the animation completes (600ms matching CSS)
            setTimeout(() => {
                newsShakeBtn.classList.remove('shake-active');
            }, 600);
            
        }, 4000); 
    }
});

/* ==========================================================================
   LUXURY RETREAT PAGE — Old Rectory framed image gallery
   Fully isolated. Runs only if the gallery exists on the current page.
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const oldRectorySlides = document.querySelectorAll('.oldrectory-gallery-slide');
    const oldRectoryReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (oldRectorySlides.length > 1 && !oldRectoryReducedMotion) {
        let oldRectoryIndex = 0;

        setInterval(() => {
            oldRectorySlides[oldRectoryIndex].classList.remove('is-active');
            oldRectoryIndex = (oldRectoryIndex + 1) % oldRectorySlides.length;
            oldRectorySlides[oldRectoryIndex].classList.add('is-active');
        }, 4200);
    }
});
/* ==========================================================================
   HOMEPAGE — Business Accommodation image crossfade slider
   Isolated. Runs only if the business slider exists on the current page.
   Respects prefers-reduced-motion (no auto-rotate when reduced motion is on).
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const businessSlides = document.querySelectorAll('.business-simple__image-slide');
    const businessReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (businessSlides.length > 1 && !businessReducedMotion) {
        let businessIndex = 0;

        setInterval(() => {
            businessSlides[businessIndex].classList.remove('is-active');
            businessIndex = (businessIndex + 1) % businessSlides.length;
            businessSlides[businessIndex].classList.add('is-active');
        }, 4500); // fade every ~2.8s (within the 2.5–3s range)
    }
});

/* ==========================================================================
   HEADER NAV — "Stay With Us" dropdown accessibility sync
   Keeps aria-expanded in step with hover/keyboard focus on desktop.
   Purely additive — CSS handles the actual show/hide; no impact on the
   hamburger menu, header scroll effect, hero, or other sliders.
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const dropdownParents = document.querySelectorAll('.nav-item-dropdown');

    dropdownParents.forEach(parent => {
        const trigger = parent.querySelector('.nav-link');
        if (!trigger) return;

        const setExpanded = (state) => trigger.setAttribute('aria-expanded', state ? 'true' : 'false');

        // Mouse
        parent.addEventListener('mouseenter', () => setExpanded(true));
        parent.addEventListener('mouseleave', () => setExpanded(false));

        // Keyboard focus moving in/out of the dropdown group
        parent.addEventListener('focusin', () => setExpanded(true));
        parent.addEventListener('focusout', (e) => {
            // Only collapse if focus has left the dropdown entirely
            if (!parent.contains(e.relatedTarget)) {
                setExpanded(false);
            }
        });
    });
});


