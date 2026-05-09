"use strict";

(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.warn("SITE_CONFIG is missing on home page.");
        return;
    }

    const doc = document;
    const qsa = (selector, scope = doc) => Array.from(scope.querySelectorAll(selector));
    const qs = (selector, scope = doc) => scope.querySelector(selector);

    const escapeHTML = (value) => {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    };

    const getInitials = (name) => {
        return String(name || "P")
            .split(" ")
            .filter(Boolean)
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    };

    const renderStars = (rating) => {
        const total = Math.max(1, Math.min(5, Number(rating) || 5));
        return "★".repeat(total);
    };

    const createCard = (item) => {
        return `
            <article class="testimonial-card">
                <div class="testimonial-rating" aria-label="${escapeHTML(item.rating || 5)} out of 5 stars">
                    ${renderStars(item.rating)}
                </div>

                <blockquote>
                    ${escapeHTML(item.quote)}
                </blockquote>

                <div class="testimonial-person">
                    <div class="testimonial-avatar" aria-hidden="true">
                        ${escapeHTML(getInitials(item.name))}
                    </div>

                    <div>
                        <strong>${escapeHTML(item.name)}</strong>
                        <span>${escapeHTML(item.location)}</span>
                    </div>
                </div>
            </article>
        `;
    };

    const initTestimonials = () => {
        const slider = qs("[data-testimonial-slider]");
        const track = qs("[data-testimonial-track]");
        const controls = qs("[data-testimonial-controls]");

        if (!slider || !track || !controls) return;

        const items = config.socialProof?.items || [];

        if (!items.length) return;

        const duplicatedItems = [...items, ...items];

        track.innerHTML = duplicatedItems.map(createCard).join("");

        controls.innerHTML = items
            .map((_, index) => {
                return `
                    <button
                        class="testimonial-dot${index === 0 ? " is-active" : ""}"
                        type="button"
                        aria-label="Go to testimonial ${index + 1}"
                        data-testimonial-dot="${index}">
                    </button>
                `;
            })
            .join("");

        const dots = qsa("[data-testimonial-dot]", controls);
        let currentIndex = 0;
        let currentX = 0;
        let targetX = 0;
        let cardWidth = 0;
        let fullWidth = 0;
        let isPaused = false;
        let animationFrame = null;
        let lastTime = performance.now();

        const measure = () => {
            const firstCard = qs(".testimonial-card", track);
            if (!firstCard) return;

            const styles = window.getComputedStyle(track);
            const gap = parseFloat(styles.columnGap || styles.gap || "0");

            cardWidth = firstCard.getBoundingClientRect().width + gap;
            fullWidth = cardWidth * items.length;
            targetX = -currentIndex * cardWidth;
            currentX = targetX;
            track.style.transform = `translate3d(${currentX}px, 0, 0)`;
        };

        const updateDots = () => {
            const activeIndex = Math.abs(Math.round(currentX / cardWidth)) % items.length;

            dots.forEach((dot, index) => {
                dot.classList.toggle("is-active", index === activeIndex);
            });
        };

        const goTo = (index) => {
            currentIndex = index;
            targetX = -currentIndex * cardWidth;
            updateDots();
        };

        const tick = (time) => {
            const delta = Math.min(40, time - lastTime);
            lastTime = time;

            if (!isPaused && cardWidth > 0 && fullWidth > 0) {
                targetX -= delta * 0.035;
            }

            currentX += (targetX - currentX) * 0.08;

            if (Math.abs(currentX) >= fullWidth) {
                currentX += fullWidth;
                targetX += fullWidth;
                currentIndex = Math.abs(Math.round(currentX / cardWidth)) % items.length;
            }

            track.style.transform = `translate3d(${currentX}px, 0, 0)`;
            updateDots();

            animationFrame = window.requestAnimationFrame(tick);
        };

        dots.forEach((dot) => {
            dot.addEventListener("click", () => {
                const index = Number(dot.dataset.testimonialDot || 0);
                goTo(index);
            });
        });

        slider.addEventListener("mouseenter", () => {
            isPaused = true;
        });

        slider.addEventListener("mouseleave", () => {
            isPaused = false;
        });

        slider.addEventListener("focusin", () => {
            isPaused = true;
        });

        slider.addEventListener("focusout", () => {
            isPaused = false;
        });

        window.addEventListener("resize", measure);

        measure();

        animationFrame = window.requestAnimationFrame(tick);

        window.addEventListener("beforeunload", () => {
            if (animationFrame) window.cancelAnimationFrame(animationFrame);
        });
    };

    const initHeroPointerGlow = () => {
        const hero = qs(".home-hero");
        if (!hero) return;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        hero.addEventListener("pointermove", (event) => {
            const rect = hero.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;

            hero.style.setProperty("--hero-x", `${x}%`);
            hero.style.setProperty("--hero-y", `${y}%`);
        });
    };

    const init = () => {
        initTestimonials();
        initHeroPointerGlow();
    };

    if (doc.readyState === "loading") {
        doc.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();