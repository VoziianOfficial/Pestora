"use strict";

(function () {
    const config = window.SITE_CONFIG;

    if (!config) {
        console.warn("SITE_CONFIG is missing. Make sure /js/config.js is loaded before /js/main.js.");
        return;
    }

    const doc = document;
    const root = doc.documentElement;
    const body = doc.body;

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

    const getCurrentFile = () => {
        const path = window.location.pathname;
        const file = path.split("/").pop();
        return file || "index.html";
    };

    const getServiceByCurrentPage = () => {
        const currentFile = getCurrentFile();
        return config.services.find((service) => service.href === currentFile) || null;
    };

    const setText = (selector, value) => {
        qsa(selector).forEach((element) => {
            element.textContent = value || "";
        });
    };

    const setLink = (selector, href, text, ariaLabel) => {
        qsa(selector).forEach((element) => {
            if (href) element.setAttribute("href", href);
            if (ariaLabel) element.setAttribute("aria-label", ariaLabel);
            if (typeof text === "string") element.textContent = text;
        });
    };

    const getConfigValue = (path) => {
        return String(path || "")
            .split(".")
            .filter(Boolean)
            .reduce((obj, key) => (obj ? obj[key] : undefined), config);
    };

    const icon = (name) => {
        const icons = {
            phone: `
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.6 10.8c1.5 3 3.7 5.1 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.3 1.3.4 2.6.6 4 .6.7 0 1.2.5 1.2 1.2v3.5c0 .7-.5 1.2-1.2 1.2C10.4 21.9 2.1 13.6 2.1 3.4c0-.7.5-1.2 1.2-1.2h3.5c.7 0 1.2.5 1.2 1.2 0 1.4.2 2.7.6 4 .1.4 0 .8-.3 1.2l-1.7 2.2Z"/>
                </svg>
            `,
            menu: `
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 7h16M4 12h16M4 17h16"/>
                </svg>
            `,
            close: `
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m6 6 12 12M18 6 6 18"/>
                </svg>
            `,
            arrow: `
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
            `,
            check: `
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m5 12 4 4L19 6"/>
                </svg>
            `,
            shield: `
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.8 20 6v5.9c0 5-3.4 8.2-8 9.4-4.6-1.2-8-4.4-8-9.4V6l8-3.2Z"/>
                    <path d="m8.8 12.2 2.1 2.1 4.5-5"/>
                </svg>
            `,
            clock: `
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/>
                    <path d="M12 7v5l3 2"/>
                </svg>
            `,
            pin: `
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 21s7-5.2 7-11.2A7 7 0 0 0 5 9.8C5 15.8 12 21 12 21Z"/>
                    <path d="M12 12.2a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z"/>
                </svg>
            `,
            clipboard: `
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 3h6l1 2h3v16H5V5h3l1-2Z"/>
                    <path d="M9 11h6M9 15h4"/>
                </svg>
            `,
            compare: `
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 7h13M7 17h13"/>
                    <path d="M4 7h.01M4 17h.01"/>
                    <path d="m15 4 3 3-3 3M9 14l-3 3 3 3"/>
                </svg>
            `,
            quote: `
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 4h14v16H5V4Z"/>
                    <path d="M8 8h8M8 12h8M8 16h4"/>
                </svg>
            `,
            ant: `
                <svg viewBox="0 0 80 80" aria-hidden="true">
                    <path d="M38 35c-5-5-11-6-15-2-5 4-3 11 2 15 5 5 13 4 17-1"/>
                    <path d="M43 33c5-5 12-5 16-1 4 5 3 12-2 16-5 4-12 3-16-2"/>
                    <path d="M38 39h8"/>
                    <path d="M24 34 13 25M23 43 10 46M30 50 22 64"/>
                    <path d="M56 34 67 24M57 43l13 4M50 50l8 14"/>
                    <path d="M41 30 35 20M45 30l8-10"/>
                    <circle cx="41" cy="40" r="5"/>
                </svg>
            `,
            cockroach: `
                <svg viewBox="0 0 96 96" aria-hidden="true">
                    <path d="M27 52c0-17 9-31 21-31s21 14 21 31-9 31-21 31-21-14-21-31Z"/>
                    <path d="M34 31c8 6 20 6 28 0"/>
                    <path d="M48 22v60"/>
                    <path d="M31 40 12 28M29 51 8 49M31 62 13 75"/>
                    <path d="M65 40l19-12M67 51l21-2M65 62l18 13"/>
                    <path d="M42 22 30 8M54 22 68 8"/>
                    <path d="M37 74c5 3 17 3 22 0"/>
                    <path d="M35 54c8 4 18 4 26 0"/>
                </svg>
            `,
            termite: `
                <svg viewBox="0 0 80 80" aria-hidden="true">
                    <path d="M20 43c0-10 8-18 20-18s20 8 20 18-8 20-20 20-20-10-20-20Z"/>
                    <path d="M29 28c1-8 6-13 11-13s10 5 11 13"/>
                    <path d="M40 15v48"/>
                    <path d="M25 38H11M25 48H10M31 58l-8 11"/>
                    <path d="M55 38h14M55 48h15M49 58l8 11"/>
                    <path d="M34 20 24 9M46 20 56 9"/>
                    <path d="M31 42h18M32 51h16"/>
                </svg>
            `,
            spider: `
                <svg viewBox="0 0 80 80" aria-hidden="true">
                    <circle cx="40" cy="42" r="13"/>
                    <circle cx="40" cy="25" r="7"/>
                    <path d="M30 37 15 27M30 43 10 43M31 49 16 61"/>
                    <path d="M50 37l15-10M50 43h20M49 49l15 12"/>
                    <path d="M36 29 26 17M44 29l10-12"/>
                    <path d="M35 54 27 68M45 54l8 14"/>
                </svg>
            `,
            mosquito: `
                <svg viewBox="0 0 90 90" aria-hidden="true">
                    <path d="M40 46c8-7 18-9 24-4 5 5 3 13-5 18-8 6-18 5-24-1"/>
                    <path d="M36 43 18 25"/>
                    <path d="M33 48 11 48"/>
                    <path d="M36 53 19 68"/>
                    <path d="M53 39 65 18M60 43l20-8M62 51l18 8"/>
                    <path d="M32 41c-5-7-6-14-2-17 5-4 12 1 15 11"/>
                    <path d="M46 38c3-9 10-14 15-10 4 4 1 12-6 17"/>
                    <path d="M21 25 9 15"/>
                    <circle cx="39" cy="51" r="4"/>
                </svg>
            `,
            bedbug: `
                <svg viewBox="0 0 80 80" aria-hidden="true">
                    <path d="M24 44c0-16 7-27 16-27s16 11 16 27-7 25-16 25-16-9-16-25Z"/>
                    <path d="M30 25c5 4 15 4 20 0"/>
                    <path d="M40 18v50"/>
                    <path d="M25 38H12M25 48H11M29 58l-9 10"/>
                    <path d="M55 38h13M55 48h14M51 58l9 10"/>
                    <path d="M32 34h16M30 44h20M32 54h16"/>
                    <path d="M36 18 29 9M44 18l7-9"/>
                </svg>
            `,
            beetle: `
                <svg viewBox="0 0 80 80" aria-hidden="true">
                    <path d="M22 43c0-15 8-27 18-27s18 12 18 27-8 27-18 27-18-12-18-27Z"/>
                    <path d="M40 17v52"/>
                    <path d="M28 28c7 5 17 5 24 0"/>
                    <path d="M24 39H10M24 50H9M29 60 20 72"/>
                    <path d="M56 39h14M56 50h15M51 60l9 12"/>
                    <path d="M35 19 25 7M45 19 55 7"/>
                </svg>
            `,
            mouse: `
                <svg viewBox="0 0 90 90" aria-hidden="true">
                    <path d="M24 53c0-16 13-28 30-28 14 0 25 9 25 21 0 14-13 27-31 27-14 0-24-8-24-20Z"/>
                    <path d="M28 38c-9-1-16 4-18 12"/>
                    <path d="M56 25c2-8 11-12 17-7 5 4 4 12-2 16"/>
                    <path d="M39 30c-3-8-12-10-17-5-4 5-2 12 5 15"/>
                    <path d="M77 45h9M76 51l9 4M76 39l8-4"/>
                    <circle cx="66" cy="43" r="2.5"/>
                    <path d="M36 70c-10 7-22 5-27-3"/>
                </svg>
            `
        };

        return icons[name] || icons.check;
    };

    const logoMarkup = () => {
        return `
            <span class="site-logo-mark" aria-hidden="true">
                ${icon("cockroach")}
            </span>
            <span class="site-logo-copy">
                <span class="site-logo-text" data-company-name>${escapeHTML(config.brand.logoText || config.companyName)}</span>
            </span>
        `;
    };

    const populateConfigValues = () => {
        setText("[data-company-name]", config.companyName);
        setText("[data-company-id]", config.companyId);
        setText("[data-brand-short]", config.brand.shortName);
        setText("[data-phone-text]", config.phone);
        setText("[data-phone-button-text]", config.phoneButtonText || config.phone);
        setText("[data-email-text]", config.email);
        setText("[data-address-text]", config.address.full);
        setText("[data-footer-text]", config.footerText);
        setText("[data-service-area]", config.serviceArea);
        setText("[data-disclaimer]", config.disclaimer);
        setText("[data-legal-notice]", config.legalNotice);

        setLink("[data-phone-link]", config.phoneHref, null, config.phoneLabel);
        setLink("[data-email-link]", `mailto:${config.email}`, null, `Email ${config.companyName}`);

        qsa("[data-phone-link][data-phone-text]").forEach((element) => {
            element.textContent = config.phone;
        });

        qsa("[data-email-link][data-email-text]").forEach((element) => {
            element.textContent = config.email;
        });

        qsa("[data-config-text]").forEach((element) => {
            const path = element.getAttribute("data-config-text");
            const value = getConfigValue(path);
            if (value === undefined || value === null) return;
            element.textContent = String(value);
        });

        qsa("[data-config-href]").forEach((element) => {
            const path = element.getAttribute("data-config-href");
            let value = getConfigValue(path);

            if (path === "email") {
                value = `mailto:${config.email}`;
            }

            if (value === undefined || value === null) return;
            element.setAttribute("href", String(value));
        });
    };

    const updateMapLinks = () => {
        const addressFull = config.address?.full;
        if (!addressFull) return;

        const href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressFull)}`;
        const aria = `Open ${config.companyName} address in Google Maps`;

        qsa("[data-map-link]").forEach((element) => {
            element.setAttribute("href", href);
            element.setAttribute("aria-label", aria);
        });
    };

    const replaceHardcodedConfigTokens = () => {
        const CONFIG_DEFAULTS = {
            companyName: "Pestora",
            companyId: "Pestora Provider Matching LLC",
            phone: "(877) 555-0199",
            phoneHref: "tel:+18775550199",
            email: "hello@pestora.com",
            emailHref: "mailto:hello@pestora.com",
            addressFull: "1254 Market St, Ste 200, Denver, CO 80202, USA"
        };

        const replacements = [
            [CONFIG_DEFAULTS.companyId, config.companyId],
            [CONFIG_DEFAULTS.addressFull, config.address?.full],
            [CONFIG_DEFAULTS.phoneHref, config.phoneHref],
            [CONFIG_DEFAULTS.emailHref, `mailto:${config.email}`],
            [CONFIG_DEFAULTS.phone, config.phone],
            [CONFIG_DEFAULTS.email, config.email],
            [CONFIG_DEFAULTS.companyName, config.companyName]
        ]
            .filter(([from, to]) => typeof from === "string" && from.length && typeof to === "string" && to.length)
            .sort((a, b) => b[0].length - a[0].length);

        const shouldSkipNode = (node) => {
            const skipTags = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "SVG"]);
            let current = node?.nodeType === 1 ? node : node?.parentNode;

            while (current && current !== body) {
                if (current.nodeType === 1 && skipTags.has(current.tagName)) return true;
                current = current.parentNode;
            }

            return false;
        };

        const replaceInText = (text) => {
            let next = text;
            for (const [from, to] of replacements) {
                if (!next.includes(from)) continue;
                next = next.split(from).join(to);
            }
            return next;
        };

        const walker = doc.createTreeWalker(body, NodeFilter.SHOW_TEXT);
        let textNode = walker.nextNode();

        while (textNode) {
            const value = textNode.nodeValue;
            if (value && !shouldSkipNode(textNode)) {
                const updated = replaceInText(value);
                if (updated !== value) textNode.nodeValue = updated;
            }
            textNode = walker.nextNode();
        }

        const allowedAttrs = ["href", "aria-label", "title", "alt", "content", "placeholder"];
        const elements = qsa("*", body);

        elements.forEach((element) => {
            if (shouldSkipNode(element)) return;
            if (element.matches("[data-map-link]")) return;

            allowedAttrs.forEach((attr) => {
                if (!element.hasAttribute(attr)) return;
                const value = element.getAttribute(attr);
                if (!value) return;

                const updated = replaceInText(value);
                if (updated !== value) element.setAttribute(attr, updated);
            });
        });
    };

    const applyPageMeta = () => {
        const file = getCurrentFile();
        const meta = config.pageMeta[file];

        if (!meta) {
            console.warn(`No pageMeta found for ${file}`);
            return;
        }

        if (meta.title) {
            doc.title = meta.title;
        }

        let description = qs('meta[name="description"]');

        if (!description) {
            description = doc.createElement("meta");
            description.setAttribute("name", "description");
            doc.head.appendChild(description);
        }

        description.setAttribute("content", meta.description || "");
    };

    const buildNavigation = (mode = "desktop") => {
        const currentFile = getCurrentFile();

        return config.navigation
            .map((item) => {
                const hrefFile = item.href.split("#")[0] || "index.html";
                const isActive = hrefFile === currentFile && !item.href.includes("#");

                return `
                    <a class="${mode === "mobile" ? "mobile-nav-link" : "site-nav-link"}${isActive ? " is-active" : ""}"
                       href="${escapeHTML(item.href)}"
                       ${isActive ? 'aria-current="page"' : ""}>
                        ${escapeHTML(item.label)}
                    </a>
                `;
            })
            .join("");
    };

    const buildServiceLinks = (mode = "footer") => {
        return config.services
            .map((service) => {
                return `
                    <a class="${mode === "mobile" ? "mobile-service-link" : "footer-link"}"
                       href="${escapeHTML(service.href)}">
                        ${escapeHTML(service.shortTitle || service.title)}
                    </a>
                `;
            })
            .join("");
    };

    const injectHeader = () => {
        const mount = qs("[data-site-header]");
        if (!mount) return;

        mount.innerHTML = `
            <header class="site-header" data-header>
                <a class="skip-link" href="#main">Skip to content</a>

                <div class="container-wide site-header-inner">
                    <a class="site-logo" href="index.html" aria-label="${escapeHTML(config.brand.logoLabel)}">
                        ${logoMarkup()}
                    </a>

                    <nav class="site-nav" aria-label="Primary navigation">
                        ${buildNavigation("desktop")}
                    </nav>

                    <div class="site-header-actions">
                        <a class="header-phone" href="${escapeHTML(config.phoneHref)}" aria-label="${escapeHTML(config.phoneLabel)}">
                            <span class="header-phone-icon">${icon("phone")}</span>
                            <span>${escapeHTML(config.phoneButtonText || config.phone)}</span>
                        </a>

                        <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu" data-menu-open>
                            ${icon("menu")}
                        </button>
                    </div>
                </div>
            </header>

            <div class="mobile-menu" id="mobileMenu" hidden inert data-mobile-menu>
                <button class="mobile-menu-backdrop" type="button" aria-label="Close menu" data-menu-close></button>

                <aside class="mobile-menu-panel" aria-label="Mobile navigation">
                    <div class="mobile-menu-top">
                        <a class="site-logo" href="index.html" aria-label="${escapeHTML(config.brand.logoLabel)}">
                            ${logoMarkup()}
                        </a>

                        <button class="mobile-menu-close" type="button" aria-label="Close menu" data-menu-close>
                            ${icon("close")}
                        </button>
                    </div>

                    <nav class="mobile-nav" aria-label="Mobile primary navigation">
                        ${buildNavigation("mobile")}
                    </nav>

                    <div class="mobile-menu-services">
                        <p class="mobile-menu-label">Service categories</p>
                        <div class="mobile-service-list">
                            ${buildServiceLinks("mobile")}
                        </div>
                    </div>

                    <div class="mobile-menu-contact">
                        <a href="${escapeHTML(config.phoneHref)}" aria-label="${escapeHTML(config.phoneLabel)}">
                            ${icon("phone")}
                            <span>${escapeHTML(config.phone)}</span>
                        </a>

                        <a href="mailto:${escapeHTML(config.email)}" aria-label="Email ${escapeHTML(config.companyName)}">
                            <span>@</span>
                            <span>${escapeHTML(config.email)}</span>
                        </a>
                    </div>
                </aside>
            </div>
        `;
    };

    const injectFooter = () => {
        const mount = qs("[data-site-footer]");
        if (!mount) return;

        const navLinks = config.navigation
            .filter((item) => !item.href.includes("#"))
            .map((item) => {
                return `<a class="footer-link" href="${escapeHTML(item.href)}">${escapeHTML(item.label)}</a>`;
            })
            .join("");

        const legalLinks = config.legalLinks
            .map((item) => {
                return `<a class="footer-link" href="${escapeHTML(item.href)}">${escapeHTML(item.label)}</a>`;
            })
            .join("");

        mount.innerHTML = `
            <footer class="site-footer">
                <div class="footer-insect footer-insect-left" aria-hidden="true">${icon("mosquito")}</div>
                <div class="footer-insect footer-insect-right" aria-hidden="true">${icon("cockroach")}</div>

                <div class="container-wide footer-grid">
                    <div class="footer-brand">
                        <a class="site-logo footer-logo" href="index.html" aria-label="${escapeHTML(config.brand.logoLabel)}">
                            ${logoMarkup()}
                        </a>

                        <p data-footer-text>${escapeHTML(config.footerText)}</p>

                        <div class="footer-social" aria-label="Platform notes">
                            <span>${icon("shield")}</span>
                            <span>${icon("compare")}</span>
                            <span>${icon("check")}</span>
                        </div>
                    </div>

                    <div class="footer-column">
                        <h2>Navigation</h2>
                        <nav aria-label="Footer navigation">
                            ${navLinks}
                        </nav>
                    </div>

                    <div class="footer-column">
                        <h2>Services</h2>
                        <nav aria-label="Footer service links">
                            ${buildServiceLinks("footer")}
                        </nav>
                    </div>

                    <div class="footer-column">
                        <h2>Contact</h2>
                        <address>
                            <a class="footer-link" href="${escapeHTML(config.phoneHref)}">${escapeHTML(config.phone)}</a>
                            <a class="footer-link" href="mailto:${escapeHTML(config.email)}">${escapeHTML(config.email)}</a>
                            <span>${escapeHTML(config.address.full)}</span>
                        </address>
                    </div>

                    <div class="footer-column footer-map-column">
                        <h2>Service Area</h2>
                        <p data-service-area>${escapeHTML(config.serviceArea)}</p>
                        <div class="footer-map" aria-hidden="true">
                            <span></span>
                        </div>
                    </div>
                </div>

                <div class="container-wide footer-legal">
                    <div class="footer-legal-links">
                        ${legalLinks}
                    </div>

                    <p data-company-id>${escapeHTML(config.companyId)}</p>

                    <p class="footer-disclaimer" data-disclaimer>${escapeHTML(config.disclaimer)}</p>
                </div>
            </footer>
        `;
    };

    const setElementInert = (element, value) => {
        if (!element) return;

        if ("inert" in element) {
            element.inert = value;
        } else if (value) {
            element.setAttribute("inert", "");
        } else {
            element.removeAttribute("inert");
        }
    };

    const initMobileMenu = () => {
        const openButton = qs("[data-menu-open]");
        const menu = qs("[data-mobile-menu]");
        const closeButtons = qsa("[data-menu-close]");
        if (!openButton || !menu) return;

        let closeTimer = null;

        const focusableSelector = [
            "a[href]",
            "button:not([disabled])",
            "input:not([disabled])",
            "select:not([disabled])",
            "textarea:not([disabled])",
            '[tabindex]:not([tabindex="-1"])'
        ].join(",");

        const getFocusable = () => qsa(focusableSelector, menu).filter((item) => item.offsetParent !== null);

        const openMenu = () => {
            clearTimeout(closeTimer);
            menu.hidden = false;
            setElementInert(menu, false);
            body.classList.add("menu-open");
            openButton.setAttribute("aria-expanded", "true");

            requestAnimationFrame(() => {
                menu.classList.add("is-open");
                const focusable = getFocusable();
                if (focusable.length) focusable[0].focus({ preventScroll: true });
            });
        };

        const closeMenu = () => {
            menu.classList.remove("is-open");
            body.classList.remove("menu-open");
            openButton.setAttribute("aria-expanded", "false");
            setElementInert(menu, true);

            closeTimer = window.setTimeout(() => {
                menu.hidden = true;
                openButton.focus({ preventScroll: true });
            }, 260);
        };

        openButton.addEventListener("click", openMenu);

        closeButtons.forEach((button) => {
            button.addEventListener("click", closeMenu);
        });

        qsa("a", menu).forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        doc.addEventListener("keydown", (event) => {
            if (!menu.classList.contains("is-open")) return;

            if (event.key === "Escape") {
                event.preventDefault();
                closeMenu();
                return;
            }

            if (event.key !== "Tab") return;

            const focusable = getFocusable();
            if (!focusable.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && doc.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && doc.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        });
    };

    const renderServiceCards = () => {
        qsa("[data-service-cards]").forEach((mount) => {
            const variant = mount.dataset.serviceCards || "photo";

            mount.innerHTML = config.services
                .map((service) => {
                    return `
                        <article class="service-card service-card-${escapeHTML(variant)} reveal-up">
                            <a href="${escapeHTML(service.href)}" aria-label="View ${escapeHTML(service.title)}">
                                <div class="service-card-media">
                                    <img src="${escapeHTML(service.image)}" alt="${escapeHTML(service.title)}" loading="lazy">
                                </div>

                                <div class="service-card-shade"></div>

                                <div class="service-card-icon" aria-hidden="true">
                                    ${icon(service.icon)}
                                </div>

                                <div class="service-card-content">
                                    <p>${escapeHTML(service.pageKicker || "Provider matching")}</p>
                                    <h3>${escapeHTML(service.title)}</h3>
                                    <span>
                                        ${escapeHTML(service.cardText || service.summary)}
                                    </span>
                                </div>

                                <div class="service-card-arrow" aria-hidden="true">
                                    ${icon("arrow")}
                                </div>
                            </a>
                        </article>
                    `;
                })
                .join("");
        });
    };

    const renderPestCategories = () => {
        qsa("[data-pest-categories]").forEach((mount) => {
            mount.innerHTML = config.pestCategories
                .map((item) => {
                    return `
                        <article class="pest-category reveal-up">
                            <div class="pest-category-icon" aria-hidden="true">
                                ${icon(item.icon)}
                            </div>
                            <h3>${escapeHTML(item.label)}</h3>
                            <p>${escapeHTML(item.text)}</p>
                        </article>
                    `;
                })
                .join("");
        });
    };

    const renderHowSteps = () => {
        qsa("[data-how-steps]").forEach((mount) => {
            mount.innerHTML = config.howItWorks
                .map((step, index) => {
                    const stepIcons = ["clipboard", "compare", "quote", "shield"];

                    return `
                        <article class="how-step reveal-up">
                            <div class="how-step-icon" aria-hidden="true">
                                ${icon(stepIcons[index] || "check")}
                            </div>
                            <span class="how-step-number">0${index + 1}</span>
                            <h3>${escapeHTML(step.title)}</h3>
                            <p>${escapeHTML(step.text)}</p>
                        </article>
                    `;
                })
                .join("");
        });
    };

    const renderBenefits = () => {
        qsa("[data-benefits]").forEach((mount) => {
            mount.innerHTML = config.benefits
                .map((benefit, index) => {
                    const benefitIcons = ["clock", "compare", "pin", "shield"];

                    return `
                        <article class="benefit-item reveal-up">
                            <div class="benefit-icon" aria-hidden="true">
                                ${icon(benefitIcons[index] || "check")}
                            </div>
                            <h3>${escapeHTML(benefit.title)}</h3>
                            <p>${escapeHTML(benefit.text)}</p>
                        </article>
                    `;
                })
                .join("");
        });
    };

    const getFaqItemsForPage = () => {
        const service = getServiceByCurrentPage();
        if (service && Array.isArray(service.faq)) return service.faq;
        return config.faq || [];
    };

    const renderFaq = () => {
        const faqItems = getFaqItemsForPage();

        qsa("[data-faq-list]").forEach((mount) => {
            mount.innerHTML = faqItems
                .map((item, index) => {
                    const id = `faq-panel-${index + 1}`;
                    const buttonId = `faq-button-${index + 1}`;

                    return `
                        <article class="faq-item">
                            <h3>
                                <button class="faq-question" id="${buttonId}" type="button" aria-expanded="false" aria-controls="${id}">
                                    <span>${escapeHTML(item.question)}</span>
                                    <span class="faq-toggle" aria-hidden="true">+</span>
                                </button>
                            </h3>

                            <div class="faq-answer" id="${id}" role="region" aria-labelledby="${buttonId}" hidden>
                                <p>${escapeHTML(item.answer)}</p>
                            </div>
                        </article>
                    `;
                })
                .join("");
        });

        qsa("[data-faq-schema]").forEach((schemaNode) => {
            const schema = {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqItems.map((item) => ({
                    "@type": "Question",
                    name: item.question,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: item.answer
                    }
                }))
            };

            schemaNode.textContent = JSON.stringify(schema);
        });
    };

    const initFaqAccordion = () => {
        qsa(".faq-question").forEach((button) => {
            button.addEventListener("click", () => {
                const targetId = button.getAttribute("aria-controls");
                const panel = targetId ? doc.getElementById(targetId) : null;
                const isOpen = button.getAttribute("aria-expanded") === "true";

                if (!panel) return;

                button.setAttribute("aria-expanded", String(!isOpen));
                panel.hidden = isOpen;
                button.closest(".faq-item")?.classList.toggle("is-open", !isOpen);
            });
        });
    };

    const renderPolicyBanner = () => {
        let mount = qs("[data-policy-banner]");

        if (!mount) {
            mount = doc.createElement("div");
            mount.setAttribute("data-policy-banner", "");
            body.appendChild(mount);
        }

        const bannerConfig = config.cookieBanner;
        const storedChoice = localStorage.getItem(bannerConfig.storageKey);

        if (storedChoice) {
            mount.remove();
            return;
        }

        const links = bannerConfig.links
            .map((item) => {
                return `<a href="${escapeHTML(item.href)}">${escapeHTML(item.label)}</a>`;
            })
            .join("");

        mount.innerHTML = `
            <aside class="policy-banner" aria-label="Privacy preferences">
                <div class="policy-banner-copy">
                    <h2>${escapeHTML(bannerConfig.title)}</h2>
                    <p>${escapeHTML(bannerConfig.text)}</p>
                    <div class="policy-banner-links">
                        ${links}
                    </div>
                </div>

                <div class="policy-banner-actions">
                    <button class="btn btn-small btn-primary" type="button" data-policy-accept>
                        ${escapeHTML(bannerConfig.accept)}
                    </button>
                    <button class="btn btn-small btn-ghost" type="button" data-policy-decline>
                        ${escapeHTML(bannerConfig.decline)}
                    </button>
                </div>
            </aside>
        `;

        const saveChoice = (choice) => {
            localStorage.setItem(bannerConfig.storageKey, choice);
            mount.classList.add("is-hiding");

            window.setTimeout(() => {
                mount.remove();
            }, 220);
        };

        qs("[data-policy-accept]", mount)?.addEventListener("click", () => saveChoice("accepted"));
        qs("[data-policy-decline]", mount)?.addEventListener("click", () => saveChoice("declined"));
    };

    const initReveal = () => {
        const revealItems = qsa(".reveal-up:not(.is-visible), [data-reveal]:not(.is-visible)");
        if (!revealItems.length) return;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            revealItems.forEach((item) => item.classList.add("is-visible"));
            return;
        }

        if (!initReveal._observer) {
            const ObservedSet = "WeakSet" in window ? WeakSet : Set;
            initReveal._observed = new ObservedSet();
            initReveal._observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("is-visible");
                    initReveal._observer.unobserve(entry.target);
                });
            },
            {
                root: null,
                threshold: 0.14,
                rootMargin: "0px 0px -8% 0px"
            }
        );
        }

        revealItems.forEach((item) => {
            if (initReveal._observed.has(item)) return;
            initReveal._observed.add(item);
            initReveal._observer.observe(item);
        });
    };

    window.PestoraApp = window.PestoraApp || {};
    window.PestoraApp.refreshReveal = initReveal;

    const initRequestForms = () => {
        qsa("[data-request-form]").forEach((form) => {
            const status = qs("[data-form-status]", form) || qs("[data-form-status]");
            const requiredFields = qsa("[required]", form);

            form.addEventListener("submit", (event) => {
                event.preventDefault();

                let isValid = true;

                requiredFields.forEach((field) => {
                    const valid = field.type === "checkbox" ? field.checked : field.value.trim().length > 0;
                    field.closest(".form-field, .form-check")?.classList.toggle("has-error", !valid);

                    if (!valid) isValid = false;
                });

                if (!isValid) {
                    if (status) {
                        status.textContent = config.forms.errorMessage;
                        status.className = "form-status is-error";
                    }

                    const firstInvalid = requiredFields.find((field) => {
                        return field.type === "checkbox" ? !field.checked : !field.value.trim();
                    });

                    firstInvalid?.focus();
                    return;
                }

                form.reset();

                if (status) {
                    status.textContent = config.forms.successMessage;
                    status.className = "form-status is-success";
                }
            });

            requiredFields.forEach((field) => {
                field.addEventListener("input", () => {
                    field.closest(".form-field, .form-check")?.classList.remove("has-error");
                });

                field.addEventListener("change", () => {
                    field.closest(".form-field, .form-check")?.classList.remove("has-error");
                });
            });
        });
    };

    const preventHorizontalScrollBugs = () => {
        root.classList.add("pestora-js-ready");

        window.addEventListener(
            "load",
            () => {
                if (doc.documentElement.scrollWidth > window.innerWidth + 2) {
                    console.warn("Horizontal overflow detected. Check wide elements, images, or fixed-position sections.");
                }
            },
            { once: true }
        );
    };

    const init = () => {
        applyPageMeta();
        injectHeader();
        injectFooter();
        populateConfigValues();
        replaceHardcodedConfigTokens();
        updateMapLinks();

        renderPestCategories();
        renderServiceCards();
        renderHowSteps();
        renderBenefits();
        renderFaq();
        renderPolicyBanner();

        populateConfigValues();
        replaceHardcodedConfigTokens();
        updateMapLinks();

        initMobileMenu();
        initFaqAccordion();
        initReveal();
        initRequestForms();
        preventHorizontalScrollBugs();
    };

    if (doc.readyState === "loading") {
        doc.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
