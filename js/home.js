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

        track.innerHTML = items.map(createCard).join("");

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
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let realCount = items.length;
        let loopPad = 0;
        let index = 0;
        let isPaused = false;
        let isDragging = false;
        let dragStartX = 0;
        let dragStartTranslate = 0;
        let translateX = 0;
        let animationFrame = null;
        let lastTime = performance.now();
        let autoplayTimer = 0;

        const getSlides = () => Array.from(track.children);

        const getLoopPad = () => {
            const cols = Number(getComputedStyle(track).getPropertyValue("--testimonial-cols")) || 3;
            return Math.min(realCount, Math.max(1, cols));
        };

        const setTransition = (enabled) => {
            track.style.transition = enabled ? "transform 420ms cubic-bezier(.2, .8, .2, 1)" : "none";
        };

        const setTranslateByIndex = () => {
            const slides = getSlides();
            const slide = slides[index];
            if (!slide) return;
            translateX = -slide.offsetLeft;
            track.style.transform = `translate3d(${translateX}px, 0, 0)`;
        };

        const updateDots = () => {
            const activeRealIndex = ((index - loopPad) % realCount + realCount) % realCount;
            dots.forEach((dot, dotIndex) => {
                dot.classList.toggle("is-active", dotIndex === activeRealIndex);
            });
        };

        const buildLoop = () => {
            loopPad = getLoopPad();

            // Remove existing clones
            qsa("[data-clone]", track).forEach((node) => node.remove());

            if (realCount <= loopPad) {
                index = 0;
                setTransition(false);
                setTranslateByIndex();
                updateDots();
                return;
            }

            const originals = getSlides();
            const headClones = originals.slice(0, loopPad).map((node) => node.cloneNode(true));
            const tailClones = originals.slice(-loopPad).map((node) => node.cloneNode(true));

            headClones.forEach((node) => node.setAttribute("data-clone", "true"));
            tailClones.forEach((node) => node.setAttribute("data-clone", "true"));

            tailClones.forEach((node) => track.insertBefore(node, track.firstChild));
            headClones.forEach((node) => track.appendChild(node));

            index = loopPad;
            setTransition(false);
            setTranslateByIndex();
            updateDots();
        };

        const normalizeLoopAfterTransition = () => {
            if (realCount <= loopPad) return;

            if (index >= loopPad + realCount) {
                index = loopPad;
                setTransition(false);
                setTranslateByIndex();
            } else if (index < loopPad) {
                index = loopPad + realCount - 1;
                setTransition(false);
                setTranslateByIndex();
            }
        };

        const goToReal = (realIndex) => {
            if (!Number.isFinite(realIndex)) return;

            isPaused = true;
            setTransition(true);
            index = realIndex + loopPad;
            setTranslateByIndex();
            updateDots();
        };

        const step = (direction, pause = true) => {
            if (realCount <= 1) return;
            if (pause) isPaused = true;
            setTransition(true);
            index += direction;
            setTranslateByIndex();
            updateDots();
        };

        const tick = (time) => {
            const delta = Math.min(40, time - lastTime);
            lastTime = time;

            if (prefersReducedMotion) {
                animationFrame = window.requestAnimationFrame(tick);
                return;
            }

            if (!isPaused && !isDragging && realCount > 1) {
                autoplayTimer += delta;
                if (autoplayTimer >= 4500) {
                    autoplayTimer = 0;
                    step(1, false);
                }
            } else {
                autoplayTimer = 0;
            }

            animationFrame = window.requestAnimationFrame(tick);
        };

        dots.forEach((dot) => {
            dot.addEventListener("click", () => {
                const realIndex = Number(dot.dataset.testimonialDot || 0);
                goToReal(realIndex);
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

        const viewport = qs(".testimonial-viewport", slider) || slider;
        const shouldPause = () => slider.matches(":hover") || slider.contains(doc.activeElement);

        const onPointerDown = (event) => {
            if (event.pointerType === "mouse" && event.button !== 0) return;
            isDragging = true;
            isPaused = true;
            dragStartX = event.clientX;
            dragStartTranslate = translateX;
            setTransition(false);
            viewport.setPointerCapture?.(event.pointerId);
        };

        const onPointerMove = (event) => {
            if (!isDragging) return;
            const dx = event.clientX - dragStartX;
            translateX = dragStartTranslate + dx;

            const slides = getSlides();
            if (slides.length) {
                const maxTranslate = 0;
                const minTranslate = -slides[slides.length - 1].offsetLeft;
                translateX = Math.max(minTranslate, Math.min(maxTranslate, translateX));
            }
            track.style.transform = `translate3d(${translateX}px, 0, 0)`;
        };

        const snapToNearest = () => {
            const slides = getSlides();
            if (!slides.length) return;

            const currentOffset = -translateX;
            let nearest = 0;
            let nearestDistance = Infinity;

            slides.forEach((slide, slideIndex) => {
                const d = Math.abs(slide.offsetLeft - currentOffset);
                if (d < nearestDistance) {
                    nearestDistance = d;
                    nearest = slideIndex;
                }
            });

            index = nearest;
            setTransition(true);
            setTranslateByIndex();
            updateDots();
        };

        const onPointerUp = () => {
            if (!isDragging) return;
            isDragging = false;
            snapToNearest();
        };

        viewport.addEventListener("pointerdown", onPointerDown);
        viewport.addEventListener("pointermove", onPointerMove);
        viewport.addEventListener("pointerup", onPointerUp);
        viewport.addEventListener("pointercancel", onPointerUp);

        viewport.addEventListener(
            "keydown",
            (event) => {
                if (event.key === "ArrowRight") step(1);
                if (event.key === "ArrowLeft") step(-1);
            },
            { passive: true }
        );

        track.addEventListener("transitionend", () => {
            normalizeLoopAfterTransition();
            updateDots();
            isPaused = shouldPause();
        });

        const rebuild = () => {
            realCount = items.length;
            buildLoop();
        };

        window.addEventListener("resize", rebuild);

        rebuild();

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
