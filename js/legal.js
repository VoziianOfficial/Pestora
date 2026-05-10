"use strict";

(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.warn("SITE_CONFIG is missing on legal page.");
        return;
    }

    const doc = document;
    const qs = (selector, scope = doc) => scope.querySelector(selector);
    const qsa = (selector, scope = doc) => Array.from(scope.querySelectorAll(selector));

    const getCurrentFile = () => {
        const file = window.location.pathname.split("/").pop();
        return file || "index.html";
    };

    const initActiveLegalLink = () => {
        const current = getCurrentFile();

        qsa(".legal-sidebar-card a").forEach((link) => {
            const href = link.getAttribute("href") || "";
            const isActive = href === current;

            link.classList.toggle("is-active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "page");
            }
        });
    };

    const initLegalSectionReveal = () => {
        const sections = qsa(".legal-section");
        if (!sections.length) return;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            sections.forEach((section) => section.classList.add("is-readable"));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    entry.target.classList.toggle("is-readable", entry.isIntersecting);
                });
            },
            {
                root: null,
                threshold: 0.28,
                rootMargin: "-12% 0px -52% 0px"
            }
        );

        sections.forEach((section) => observer.observe(section));
    };

    const initLegalAnchorSmoothing = () => {
        qsa('a[href^="#"]').forEach((link) => {
            link.addEventListener("click", (event) => {
                const id = link.getAttribute("href");
                if (!id || id === "#") return;

                const target = qs(id);
                if (!target) return;

                event.preventDefault();

                const headerHeight = qs("[data-header]")?.offsetHeight || 0;
                const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

                window.scrollTo({
                    top,
                    behavior: "smooth"
                });
            });
        });
    };

    const initLegalContactFocus = () => {
        const box = qs(".legal-contact-box");
        if (!box) return;

        qsa("a", box).forEach((link) => {
            link.addEventListener("focus", () => {
                box.classList.add("is-focused");
            });

            link.addEventListener("blur", () => {
                box.classList.remove("is-focused");
            });
        });
    };

    const init = () => {
        initActiveLegalLink();
        initLegalSectionReveal();
        initLegalAnchorSmoothing();
        initLegalContactFocus();
        window.PestoraApp?.applyConfigEverywhere?.();
    };

    if (doc.readyState === "loading") {
        doc.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
