"use strict";

(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.warn("SITE_CONFIG is missing on about page.");
        return;
    }

    const doc = document;
    const qs = (selector, scope = doc) => scope.querySelector(selector);
    const qsa = (selector, scope = doc) => Array.from(scope.querySelectorAll(selector));

    const initAboutMediaMotion = () => {
        const media = qs(".about-model-media");
        const photo = qs(".about-round-photo");
        const note = qs(".about-floating-note");

        if (!media || !photo || !note) return;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        media.addEventListener("pointermove", (event) => {
            const rect = media.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            photo.style.transform = `translate3d(${x * 8}px, ${y * 8}px, 0)`;
            note.style.transform = `translate3d(${x * -10}px, ${y * -8}px, 0) rotate(-6deg)`;
        });

        media.addEventListener("pointerleave", () => {
            photo.style.transform = "";
            note.style.transform = "rotate(-6deg)";
        });
    };

    const initValueHover = () => {
        const cards = qsa(".value-card");
        if (!cards.length) return;

        cards.forEach((card) => {
            card.addEventListener("mouseenter", () => {
                cards.forEach((item) => {
                    item.classList.toggle("is-soft-muted", item !== card);
                });
            });

            card.addEventListener("mouseleave", () => {
                cards.forEach((item) => {
                    item.classList.remove("is-soft-muted");
                });
            });
        });
    };

    const initStripHover = () => {
        const points = qsa(".about-strip-point");
        if (!points.length) return;

        points.forEach((point) => {
            point.addEventListener("mouseenter", () => {
                points.forEach((item) => {
                    item.classList.toggle("is-soft-muted", item !== point);
                });
            });

            point.addEventListener("mouseleave", () => {
                points.forEach((item) => {
                    item.classList.remove("is-soft-muted");
                });
            });
        });
    };

    const init = () => {
        initAboutMediaMotion();
        initValueHover();
        initStripHover();
    };

    if (doc.readyState === "loading") {
        doc.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();