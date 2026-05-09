"use strict";

(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.warn("SITE_CONFIG is missing on services page.");
        return;
    }

    const doc = document;
    const qs = (selector, scope = doc) => scope.querySelector(selector);
    const qsa = (selector, scope = doc) => Array.from(scope.querySelectorAll(selector));

    const initSmoothAnchorOffset = () => {
        qsa('a[href^="#"]').forEach((link) => {
            link.addEventListener("click", (event) => {
                const targetId = link.getAttribute("href");
                if (!targetId || targetId === "#") return;

                const target = qs(targetId);
                if (!target) return;

                event.preventDefault();

                const headerHeight = qs("[data-header]")?.offsetHeight || 0;
                const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

                window.scrollTo({
                    top: targetTop,
                    behavior: "smooth"
                });
            });
        });
    };

    const initComparisonHover = () => {
        const items = qsa(".comparison-item");
        if (!items.length) return;

        items.forEach((item) => {
            item.addEventListener("mouseenter", () => {
                items.forEach((other) => {
                    other.classList.toggle("is-muted", other !== item);
                });
            });

            item.addEventListener("mouseleave", () => {
                items.forEach((other) => {
                    other.classList.remove("is-muted");
                });
            });
        });
    };

    const initServiceCardLabels = () => {
        qsa(".services-grid .service-card").forEach((card, index) => {
            const service = config.services[index];
            if (!service) return;

            card.setAttribute("data-service-id", service.id);
        });
    };

    const init = () => {
        initSmoothAnchorOffset();
        initComparisonHover();
        initServiceCardLabels();
    };

    if (doc.readyState === "loading") {
        doc.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();