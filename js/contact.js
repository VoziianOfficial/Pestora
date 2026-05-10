"use strict";

(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.warn("SITE_CONFIG is missing on contact page.");
        return;
    }

    const doc = document;
    const qs = (selector, scope = doc) => scope.querySelector(selector);
    const qsa = (selector, scope = doc) => Array.from(scope.querySelectorAll(selector));

    const escapeHTML = (value) => {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    };

    const toOptionValue = (label) => {
        return String(label || "")
            .toLowerCase()
            .replaceAll("&", "and")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    const initSmoothFormScroll = () => {
        qsa('a[href="#requestForm"]').forEach((link) => {
            link.addEventListener("click", (event) => {
                const target = qs("#requestForm");
                if (!target) return;

                event.preventDefault();

                const headerHeight = qs("[data-header]")?.offsetHeight || 0;
                const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 18;

                window.scrollTo({
                    top,
                    behavior: "smooth"
                });

                window.setTimeout(() => {
                    qs("input, select, textarea", target)?.focus({ preventScroll: true });
                }, 450);
            });
        });
    };

    const populatePestOptions = () => {
        const options = config.forms?.pestOptions || [];

        qsa('select[name="pestType"]').forEach((select) => {
            const currentValue = select.value;

            select.innerHTML = `
                <option value="">${escapeHTML(config.forms?.pestProblemPlaceholder || "Select pest type")}</option>
                ${options
                    .map((option) => {
                        return `<option value="${escapeHTML(toOptionValue(option))}">${escapeHTML(option)}</option>`;
                    })
                    .join("")}
            `;

            if (currentValue) {
                select.value = currentValue;
            }
        });
    };

    const initMapMotion = () => {
        const card = qs(".contact-map-card");
        const map = qs(".abstract-map");

        if (!card || !map) return;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        card.addEventListener("pointermove", (event) => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            map.style.transform = `translate3d(${x * 5}px, ${y * 5}px, 0) rotateX(${y * -2}deg) rotateY(${x * 2}deg)`;
        });

        card.addEventListener("pointerleave", () => {
            map.style.transform = "";
        });
    };

    const initContactCardHover = () => {
        const links = qsa(".contact-link");
        if (!links.length) return;

        links.forEach((link) => {
            link.addEventListener("mouseenter", () => {
                links.forEach((item) => {
                    item.classList.toggle("is-soft-muted", item !== link);
                });
            });

            link.addEventListener("mouseleave", () => {
                links.forEach((item) => {
                    item.classList.remove("is-soft-muted");
                });
            });
        });
    };

    const initFormProgress = () => {
        const form = qs(".contact-form-card [data-request-form]");
        if (!form) return;

        const fields = qsa("input, select, textarea", form).filter((field) => {
            return field.type !== "hidden" && field.type !== "submit";
        });

        fields.forEach((field) => {
            const update = () => {
                const wrapper = field.closest(".form-field, .form-check");
                if (!wrapper) return;

                const hasValue = field.type === "checkbox" ? field.checked : field.value.trim().length > 0;
                wrapper.classList.toggle("has-value", hasValue);
            };

            field.addEventListener("input", update);
            field.addEventListener("change", update);
            update();
        });
    };

    const init = () => {
        populatePestOptions();
        initSmoothFormScroll();
        initMapMotion();
        initContactCardHover();
        initFormProgress();
    };

    if (doc.readyState === "loading") {
        doc.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();


/* Dynamic Google Maps link from SITE_CONFIG address */
(function () {
    const config = window.SITE_CONFIG;
    const mapLinks = document.querySelectorAll("[data-map-link]");

    if (!config || !config.address || !config.address.full || !mapLinks.length) return;

    const address = config.address.full;
    const query = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

    mapLinks.forEach((link) => {
        link.href = mapsUrl;
        link.setAttribute("aria-label", `Open ${config.companyName || "company"} address in Google Maps: ${address}`);
    });
})();