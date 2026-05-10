"use strict";

(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.warn("SITE_CONFIG is missing on service page.");
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

    const currentFile = () => {
        const file = window.location.pathname.split("/").pop();
        return file || "index.html";
    };

    const getCurrentService = () => {
        return config.services.find((service) => service.href === currentFile()) || null;
    };

    const icon = (name) => {
        const icons = {
            cockroach: `
                <svg viewBox="0 0 96 96" aria-hidden="true">
                    <path d="M27 52c0-17 9-31 21-31s21 14 21 31-9 31-21 31-21-14-21-31Z"></path>
                    <path d="M34 31c8 6 20 6 28 0"></path>
                    <path d="M48 22v60"></path>
                    <path d="M31 40 12 28M29 51 8 49M31 62 13 75"></path>
                    <path d="M65 40l19-12M67 51l21-2M65 62l18 13"></path>
                    <path d="M42 22 30 8M54 22 68 8"></path>
                    <path d="M37 74c5 3 17 3 22 0"></path>
                    <path d="M35 54c8 4 18 4 26 0"></path>
                </svg>
            `,
            termite: `
                <svg viewBox="0 0 80 80" aria-hidden="true">
                    <path d="M20 43c0-10 8-18 20-18s20 8 20 18-8 20-20 20-20-10-20-20Z"></path>
                    <path d="M29 28c1-8 6-13 11-13s10 5 11 13"></path>
                    <path d="M40 15v48"></path>
                    <path d="M25 38H11M25 48H10M31 58l-8 11"></path>
                    <path d="M55 38h14M55 48h15M49 58l8 11"></path>
                    <path d="M34 20 24 9M46 20 56 9"></path>
                    <path d="M31 42h18M32 51h16"></path>
                </svg>
            `,
            mouse: `
                <svg viewBox="0 0 90 90" aria-hidden="true">
                    <path d="M24 53c0-16 13-28 30-28 14 0 25 9 25 21 0 14-13 27-31 27-14 0-24-8-24-20Z"></path>
                    <path d="M28 38c-9-1-16 4-18 12"></path>
                    <path d="M56 25c2-8 11-12 17-7 5 4 4 12-2 16"></path>
                    <path d="M39 30c-3-8-12-10-17-5-4 5-2 12 5 15"></path>
                    <path d="M77 45h9M76 51l9 4M76 39l8-4"></path>
                    <circle cx="66" cy="43" r="2.5"></circle>
                    <path d="M36 70c-10 7-22 5-27-3"></path>
                </svg>
            `,
            mosquito: `
                <svg viewBox="0 0 90 90" aria-hidden="true">
                    <path d="M40 46c8-7 18-9 24-4 5 5 3 13-5 18-8 6-18 5-24-1"></path>
                    <path d="M36 43 18 25"></path>
                    <path d="M33 48 11 48"></path>
                    <path d="M36 53 19 68"></path>
                    <path d="M53 39 65 18M60 43l20-8M62 51l18 8"></path>
                    <path d="M32 41c-5-7-6-14-2-17 5-4 12 1 15 11"></path>
                    <path d="M46 38c3-9 10-14 15-10 4 4 1 12-6 17"></path>
                    <path d="M21 25 9 15"></path>
                    <circle cx="39" cy="51" r="4"></circle>
                </svg>
            `
        };

        return icons[name] || icons.cockroach;
    };

    const serviceSpecificContent = {
        "ant-cockroach-control.html": {
            bodyClass: "service-ant-cockroach",
            overviewTitle: "Compare providers for everyday indoor pest concerns.",
            overviewText:
                "Ant and cockroach requests often depend on property type, activity location, timing, and whether the provider offers follow-up options. Pestora helps homeowners compare provider details before choosing independently.",
            note: "Indoor pest request matching",
            compareIntro:
                "Use your request to compare how providers explain ant and cockroach service scope, quote process, and availability.",
            ctaTitle: "Start an ant and cockroach provider matching request."
        },
        "termite-control.html": {
            bodyClass: "service-termite",
            overviewTitle: "Compare termite provider options with clearer request details.",
            overviewText:
                "Termite-related service categories may involve inspection steps, documentation, treatment category explanations, and follow-up language. Pestora helps organize the request so homeowners can compare provider options more clearly.",
            note: "Termite provider comparison",
            compareIntro:
                "Compare inspection process, estimate details, treatment category language, and provider qualifications before choosing.",
            ctaTitle: "Start a termite provider matching request."
        },
        "rodent-control.html": {
            bodyClass: "service-rodent",
            overviewTitle: "Compare rodent provider options by property needs.",
            overviewText:
                "Rodent-related requests can involve activity signs, property layout, entry-point review, follow-up timing, and service scope. Pestora helps homeowners compare local provider options based on the request details.",
            note: "Rodent request matching",
            compareIntro:
                "Compare initial visit scope, entry-point review, follow-up process, pricing, and provider availability in your area.",
            ctaTitle: "Start a rodent provider matching request."
        },
        "mosquito-outdoor-pests.html": {
            bodyClass: "service-mosquito",
            overviewTitle: "Compare mosquito and outdoor pest provider options.",
            overviewText:
                "Outdoor pest requests may vary by season, yard size, property layout, recurring service options, and local provider availability. Pestora helps organize the request for easier comparison.",
            note: "Outdoor pest comparison",
            compareIntro:
                "Compare seasonal service options, outdoor scope, recurring visit terms, pricing, and local provider availability.",
            ctaTitle: "Start a mosquito and outdoor pest provider matching request."
        }
    };

    const renderServicePage = () => {
        const service = getCurrentService();

        if (!service) {
            console.warn(`No service config found for ${currentFile()}`);
            return;
        }

        const pageContent = serviceSpecificContent[currentFile()] || serviceSpecificContent["ant-cockroach-control.html"];

        doc.body.classList.add(pageContent.bodyClass);

        qsa("[data-service-kicker]").forEach((element) => {
            element.textContent = service.pageKicker || "Provider matching";
        });

        qsa("[data-service-title]").forEach((element) => {
            element.textContent = service.pageTitle || service.title;
        });

        qsa("[data-service-intro]").forEach((element) => {
            element.textContent = service.pageIntro || service.summary;
        });

        qsa("[data-service-overview-title]").forEach((element) => {
            element.textContent = pageContent.overviewTitle;
        });

        qsa("[data-service-overview-text]").forEach((element) => {
            element.textContent = pageContent.overviewText;
        });

        qsa("[data-service-note]").forEach((element) => {
            element.innerHTML = escapeHTML(pageContent.note).replaceAll(" ", "<br>");
        });

        qsa("[data-service-compare-intro]").forEach((element) => {
            element.textContent = pageContent.compareIntro;
        });

        qsa("[data-service-cta-title]").forEach((element) => {
            element.textContent = pageContent.ctaTitle;
        });

        qsa("[data-service-card-icon]").forEach((element) => {
            element.innerHTML = icon(service.icon);
        });

        qsa("[data-service-overview-image]").forEach((image) => {
            image.setAttribute("src", service.image);
            image.setAttribute("alt", `${service.title} provider matching visual`);
        });

        qsa("[data-service-factors]").forEach((mount) => {
            mount.innerHTML = service.evaluationPoints
                .map((point, index) => {
                    return `
                        <article class="factor-card reveal-up">
                            <div class="factor-number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</div>
                            <div>
                                <h3>${escapeHTML(getFactorTitle(point, index))}</h3>
                                <p>${escapeHTML(point)}</p>
                            </div>
                        </article>
                    `;
                })
                .join("");
        });

        qsa("[data-service-compare-items]").forEach((mount) => {
            mount.innerHTML = service.compareItems
                .map((item, index) => {
                    return `
                        <article class="compare-pill reveal-up">
                            <span aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
                            <h3>${escapeHTML(item)}</h3>
                            <p>${escapeHTML(getCompareDescription(item, service.id))}</p>
                        </article>
                    `;
                })
                .join("");
        });

        const canRefreshReveal = typeof window.PestoraApp?.refreshReveal === "function";
        window.PestoraApp?.refreshReveal?.();

        if (!canRefreshReveal) {
            window.requestAnimationFrame(() => {
                doc.querySelectorAll(".factor-card.reveal-up:not(.is-visible), .compare-pill.reveal-up:not(.is-visible)").forEach(
                    (element) => element.classList.add("is-visible")
                );
            });
        }
    };

    const getFactorTitle = (text, index) => {
        const titles = [
            "Provider scope",
            "Quote process",
            "Service terms",
            "Verification step"
        ];

        if (/license|insurance|qualifications/i.test(text)) return "Licensing and insurance";
        if (/pricing|quote|estimate/i.test(text)) return "Quote and pricing";
        if (/follow|warranty|recurring/i.test(text)) return "Follow-up terms";
        if (/inspection/i.test(text)) return "Inspection process";
        if (/availability/i.test(text)) return "Local availability";

        return titles[index] || "Comparison factor";
    };

    const getCompareDescription = (item, serviceId) => {
        const lower = item.toLowerCase();

        if (lower.includes("inspection")) {
            return "Ask how the provider handles inspection steps, scheduling, and any related terms.";
        }

        if (lower.includes("estimate") || lower.includes("quote") || lower.includes("pricing")) {
            return "Compare how pricing is explained and whether any fees or conditions apply.";
        }

        if (lower.includes("follow") || lower.includes("warranty") || lower.includes("recurring")) {
            return "Review follow-up language, recurring service options, and any provider-specific terms.";
        }

        if (lower.includes("availability") || lower.includes("zip")) {
            return "Provider availability can vary by ZIP code, timing, season, and service category.";
        }

        if (lower.includes("outdoor") || lower.includes("yard") || lower.includes("season")) {
            return "Compare how each provider defines outdoor scope, seasonal timing, and service area.";
        }

        if (lower.includes("entry")) {
            return "Ask how entry-point review is handled and what is included in the provider’s scope.";
        }

        if (serviceId === "termite") {
            return "Compare provider documentation, service category explanation, and required verification steps.";
        }

        if (serviceId === "rodent") {
            return "Compare property-specific process, timing, follow-up options, and service scope.";
        }

        if (serviceId === "mosquito-outdoor") {
            return "Compare outdoor service scope, seasonal options, timing, and recurring terms.";
        }

        return "Review this detail directly with each independent provider before choosing.";
    };

    const initServiceMediaMotion = () => {
        const media = qs(".service-overview-media");
        const photo = qs(".service-overview-photo");
        const note = qs(".service-overview-note");

        if (!media || !photo || !note) return;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        media.addEventListener("pointermove", (event) => {
            const rect = media.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            photo.style.transform = `translate3d(${x * 8}px, ${y * 8}px, 0)`;
            note.style.transform = `translate3d(${x * -10}px, ${y * -8}px, 0) rotate(-5deg)`;
        });

        media.addEventListener("pointerleave", () => {
            photo.style.transform = "";
            note.style.transform = "rotate(-5deg)";
        });
    };

    const initHoverGroups = () => {
        const groups = [qsa(".factor-card"), qsa(".compare-pill")];

        groups.forEach((items) => {
            if (!items.length) return;

            items.forEach((item) => {
                item.addEventListener("mouseenter", () => {
                    items.forEach((other) => {
                        other.classList.toggle("is-soft-muted", other !== item);
                    });
                });

                item.addEventListener("mouseleave", () => {
                    items.forEach((other) => {
                        other.classList.remove("is-soft-muted");
                    });
                });
            });
        });
    };

    const init = () => {
        renderServicePage();
        initServiceMediaMotion();
        initHoverGroups();
    };

    if (doc.readyState === "loading") {
        doc.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();

/* Service snapshot dynamic content */
(function () {
    const config = window.SITE_CONFIG;
    if (!config || !Array.isArray(config.services)) return;

    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const service = config.services.find((item) => item.href === currentPage);

    if (!service || !service.snapshot) return;

    const snapshot = service.snapshot;

    const setText = (selector, value) => {
        const element = document.querySelector(selector);
        if (element && value) element.textContent = value;
    };

    setText("[data-service-snapshot-word]", snapshot.word);
    setText("[data-service-snapshot-kicker]", snapshot.kicker);
    setText("[data-service-snapshot-title]", snapshot.title);
    setText("[data-service-snapshot-text]", snapshot.text);

    const flowRoot = document.querySelector("[data-service-snapshot-flow]");

    if (flowRoot && Array.isArray(snapshot.flow)) {
        flowRoot.innerHTML = "";

        snapshot.flow.forEach((item, index) => {
            const span = document.createElement("span");
            span.textContent = item;
            flowRoot.appendChild(span);

            if (index < snapshot.flow.length - 1) {
                const divider = document.createElement("i");
                divider.setAttribute("aria-hidden", "true");
                flowRoot.appendChild(divider);
            }
        });
    }
})();