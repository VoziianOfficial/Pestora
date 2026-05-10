"use strict";



window.SITE_CONFIG = {
    companyName: "Pestora",
    companyId: "Pestora Provider Matching LLC",

    brand: {
        shortName: "Pestora",
        tagline: "Compare local pest control provider options with clarity.",
        logoLabel: "Pestora home",
        logoText: "Pestora"
    },

    phone: "(877) 555-0199",
    phoneHref: "tel:+18775550199",
    phoneLabel: "Call Pestora at (877) 555-0199",
    phoneButtonText: "(877) 555-0199",

    email: "hello@pestora.com",

    address: {
        line1: "1254 Market St, Ste 200",
        city: "Denver",
        state: "CO",
        zip: "80202",
        country: "USA",
        full: "1254 Market St, Ste 200, Denver, CO 80202, USA"
    },

    serviceArea: "Pestora helps homeowners compare local pest control provider options across the United States.",

    footerText:
        "Independent pest control provider matching platform for homeowners across the United States.",

    disclaimer:
        "Disclaimer: This site is a free service to assist homeowners in connecting with local service providers. All contractors/providers are independent and this site does not warrant or guarantee any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed. All persons depicted in a photo or video are actors or models and not contractors listed on this site.",

    legalNotice:
        "Pestora is an independent provider matching platform. Pestora does not perform pest control services directly and does not send its own technicians. Provider availability, pricing, qualifications, insurance, licensing, and service details should be verified by the homeowner before hiring any provider.",

    navigation: [
        {
            label: "Home",
            href: "index.html"
        },
        {
            label: "Services",
            href: "services.html"
        },
        {
            label: "About",
            href: "about.html"
        },
        {
            label: "How It Works",
            href: "index.html#how-it-works"
        },
        {
            label: "Reviews",
            href: "index.html#reviews"
        },
        {
            label: "Contact",
            href: "contact.html"
        }
    ],

    legalLinks: [
        {
            label: "Privacy Policy",
            href: "privacy-policy.html"
        },
        {
            label: "Cookie Policy",
            href: "cookie-policy.html"
        },
        {
            label: "Terms of Service",
            href: "terms-of-service.html"
        }
    ],

    pestCategories: [
        {
            label: "Ants",
            icon: "ant",
            text: "Common indoor and outdoor pest concern."
        },
        {
            label: "Cockroaches",
            icon: "cockroach",
            text: "Provider options for roach-related requests."
        },
        {
            label: "Termites",
            icon: "termite",
            text: "Compare providers for termite service categories."
        },
        {
            label: "Spiders",
            icon: "spider",
            text: "Request options for spider-related concerns."
        },
        {
            label: "Mosquitoes",
            icon: "mosquito",
            text: "Outdoor pest provider matching."
        },
        {
            label: "Bed Bugs",
            icon: "bedbug",
            text: "Compare local provider options by area."
        }
    ],

    services: [
        {
            id: "ant-cockroach",
            title: "Ant & Cockroach",
            shortTitle: "Ant & Cockroach",
            href: "ant-cockroach-control.html",
            icon: "cockroach",
            image: "./assets/images/service-ant-cockroach.jpg",
            heroImage: "./assets/images/hero-ant-cockroach.jpg",
            summary:
                "Compare independent local pest control provider options for ant and cockroach service requests.",
            cardText:
                "Share your pest concern and compare local providers that may handle ant.",
            pageKicker: "Ant & cockroach provider",
            pageTitle: "Compare local ant and cockroach provider options.",
            pageIntro:
                "Pestora helps homeowners organize request details and compare independent local providers for ant and cockroach-related pest control categories.",
            evaluationPoints: [
                "Ask which pests are included in the provider’s service category.",
                "Compare inspection or estimate processes before choosing.",
                "Review pricing, service timing, follow-up options, and treatment details.",
                "Verify licensing, insurance, and local service availability."
            ],
            compareItems: [
                "Indoor and outdoor service scope",
                "Quote or estimate process",
                "Follow-up visit options",
                "Provider availability by ZIP code"
            ],
            faq: [
                {
                    question: "Does Pestora remove ants or cockroaches directly?",
                    answer:
                        "No. Pestora does not perform pest control services directly. The platform helps homeowners compare independent local provider options."
                },
                {
                    question: "What should I compare before choosing a provider?",
                    answer:
                        "Homeowners should review service scope, pricing, licensing, insurance, availability, and whether follow-up visits are offered."
                },
                {
                    question: "Can provider availability vary by area?",
                    answer:
                        "Yes. Provider availability may vary by ZIP code, pest type, timing, and service category."
                },
                {
                    question: "Do I need to identify the exact pest before submitting a request?",
                    answer:
                        "No. Share what you’re noticing (where activity is happening, timing, and any property notes). Independent providers can explain scope and confirm details during the quote or inspection process."
                }
            ],
            snapshot: {
                word: "INDOOR PESTS",
                kicker: "Request snapshot",
                title: "A clearer request starts with where activity is happening.",
                text:
                    "For ant and cockroach-related requests, homeowners can compare provider options more clearly when the request includes pest activity, room or area notes, property type, timing, and ZIP code.",
                flow: ["Activity area", "Property notes", "Timing", "ZIP code"]
            },
        },
        {
            id: "termite",
            title: "Termite Control",
            shortTitle: "Termite",
            href: "termite-control.html",
            icon: "termite",
            image: "./assets/images/service-termite.jpg",
            heroImage: "./assets/images/hero-termite.jpg",
            summary:
                "Review local provider options for termite-related service requests and compare important details before choosing.",
            cardText:
                "Compare termite service provider options, quote details, inspection steps, and local availability.",
            pageKicker: "Termite provider matching",
            pageTitle: "Compare local termite provider options.",
            pageIntro:
                "Pestora helps homeowners compare independent providers for termite-related pest control categories, including service scope, estimates, and provider availability.",
            evaluationPoints: [
                "Ask whether an inspection is required before pricing.",
                "Compare treatment categories and service documentation.",
                "Review warranty or follow-up language directly with the provider.",
                "Verify licensing, insurance, and local qualifications."
            ],
            compareItems: [
                "Inspection process",
                "Estimate details",
                "Treatment category explanation",
                "Warranty or follow-up terms"
            ],
            faq: [
                {
                    question: "Does Pestora inspect for termites?",
                    answer:
                        "No. Pestora does not inspect homes directly. Homeowners can use Pestora to compare independent provider options."
                },
                {
                    question: "Should I verify provider qualifications?",
                    answer:
                        "Yes. Homeowners should verify licensing, insurance, qualifications, pricing, and service details before hiring any provider."
                },
                {
                    question: "Are termite quotes always the same?",
                    answer:
                        "No. Pricing and quote structure can vary based on property details, pest concern, provider process, and local availability."
                },
                {
                    question: "Why do some providers require an inspection before giving an estimate?",
                    answer:
                        "Some providers may need an inspection step to confirm property conditions, documentation needs, and service scope before explaining pricing or treatment category details."
                }
            ],

            snapshot: {
                word: "TERMITE NOTES",
                kicker: "Inspection context",
                title: "Termite provider comparison often starts with inspection details.",
                text:
                    "For termite-related requests, homeowners can compare providers more clearly by noting visible signs, affected areas, property type, documentation needs, and whether an inspection is required before pricing.",
                flow: ["Visible signs", "Inspection step", "Estimate terms", "Verification"]
            },
        },
        {
            id: "rodent",
            title: "Rodent Control",
            shortTitle: "Rodent",
            href: "rodent-control.html",
            icon: "mouse",
            image: "./assets/images/service-rodent.jpg",
            heroImage: "./assets/images/hero-rodent.jpg",
            summary:
                "Compare local provider options for rodent-related pest control requests and property-specific service needs.",
            cardText:
                "Request matching for rodent service categories and compare provider scope, timing.",
            pageKicker: "Rodent provider matching",
            pageTitle: "Compare local rodent provider options.",
            pageIntro:
                "Pestora helps homeowners prepare request details and compare independent local providers for rodent-related service categories.",
            evaluationPoints: [
                "Compare what the provider includes in the initial visit.",
                "Ask about entry-point review, exclusion options, and follow-up steps.",
                "Review pricing and property-specific service scope.",
                "Verify licensing, insurance, and availability in your area."
            ],
            compareItems: [
                "Initial visit scope",
                "Entry-point review",
                "Follow-up process",
                "Property-specific pricing"
            ],
            faq: [
                {
                    question: "Does Pestora send rodent control technicians?",
                    answer:
                        "No. Pestora does not send technicians or perform services. It helps homeowners compare independent local provider options."
                },
                {
                    question: "What details should I share in a rodent request?",
                    answer:
                        "Helpful details include property type, visible activity, timing, ZIP code, and whether you want to compare inspection or follow-up options."
                },
                {
                    question: "Can I choose my own provider?",
                    answer:
                        "Yes. Homeowners remain in control and should choose independently after reviewing provider details."
                },
                {
                    question: "What does \"exclusion\" mean in rodent service categories?",
                    answer:
                        "Exclusion generally refers to identifying and sealing potential entry points to help reduce future activity. What is included, how it is priced, and what follow-up terms apply can vary by independent provider."
                }
            ],

            snapshot: {
                word: "RODENT SIGNS",
                kicker: "Property snapshot",
                title: "Rodent requests are easier to compare when property details are clear.",
                text:
                    "For rodent-related requests, provider options may differ by initial visit scope, entry-point review, follow-up process, exclusion options, and property-specific pricing.",
                flow: ["Activity signs", "Entry points", "Follow-up", "Property type"]
            },
        },
        {
            id: "mosquito-outdoor",
            title: "Mosquito",
            shortTitle: "Mosquito & Outdoor",
            href: "mosquito-outdoor-pests.html",
            icon: "mosquito",
            image: "./assets/images/service-mosquito.jpg",
            heroImage: "./assets/images/hero-mosquito.jpg",
            summary:
                "Compare provider options for mosquito and outdoor pest-related service requests in your local area.",
            cardText:
                "Explore provider options for outdoor pest concerns, seasonal service categories.",
            pageKicker: "Mosquito & outdoor provider",
            pageTitle: "Compare mosquito and outdoor pest provider options.",
            pageIntro:
                "Pestora helps homeowners compare independent local providers for mosquito and outdoor pest-related service categories.",
            evaluationPoints: [
                "Ask whether service is seasonal, one-time, or recurring.",
                "Compare yard, patio, perimeter, and outdoor scope details.",
                "Review timing, pricing, and provider availability.",
                "Verify license, insurance, and service terms before hiring."
            ],
            compareItems: [
                "Seasonal service options",
                "Outdoor scope details",
                "Recurring visit terms",
                "Local provider availability"
            ],
            faq: [
                {
                    question: "Does Pestora treat yards for mosquitoes?",
                    answer:
                        "No. Pestora does not perform outdoor pest services directly. It helps homeowners compare independent provider options."
                },
                {
                    question: "Can outdoor pest service vary by season?",
                    answer:
                        "Yes. Availability and service options may vary by location, season, provider, and pest category."
                },
                {
                    question: "What should I verify before choosing?",
                    answer:
                        "Verify provider licensing, insurance, pricing, service scope, scheduling, and any recurring service terms."
                },
                {
                    question: "Is mosquito service usually one-time or recurring?",
                    answer:
                        "It depends on the provider, location, season, and service category. Some providers may offer one-time visits, while others may explain recurring visit options and timing."
                }
            ],
            snapshot: {
                word: "OUTDOOR PESTS",
                kicker: "Outdoor request snapshot",
                title: "Outdoor pest matching depends on season, space, and service scope.",
                text:
                    "For mosquito and outdoor pest-related requests, homeowners can compare provider options by yard or patio area, seasonal timing, one-time or recurring options, and local availability.",
                flow: ["Yard area", "Season", "Visit type", "Availability"]
            },
        }
    ],

    forms: {
        requestTitle: "Start your pest provider matching request",
        requestIntro:
            "Share a few details so your request is easier to review before comparing independent local provider options.",
        fullNameLabel: "Full Name",
        fullNamePlaceholder: "Your name",
        phoneLabel: "Phone Number",
        phonePlaceholder: "(555) 123-4567",
        emailLabel: "Email Address",
        emailPlaceholder: "you@example.com",
        zipLabel: "Property ZIP Code",
        zipPlaceholder: "Enter ZIP code",
        pestProblemLabel: "Pest Problem",
        pestProblemPlaceholder: "Select pest type",
        messageLabel: "Project Notes",
        messagePlaceholder: "Tell us about the pest concern, property type, timing, and what you want to compare.",
        consentLabel:
            "I understand Pestora is a matching platform and does not perform pest control services directly.",
        submitText: "Get Matched Now",
        successTitle: "Request received.",
        successMessage:
            "Thanks. Your request details are ready for review. Remember to verify provider licensing, insurance, pricing, and service terms before choosing.",
        errorMessage:
            "Please complete the required fields before submitting your request.",
        pestOptions: [
            "Ants",
            "Cockroaches",
            "Termites",
            "Rodents",
            "Mosquitoes",
            "Spiders",
            "Bed bugs",
            "Other outdoor pests"
        ]
    },

    cookieBanner: {
        storageKey: "pestora_policy_choice",
        title: "Privacy preferences",
        text:
            "Pestora uses basic cookies and local storage to improve site experience and remember your policy choice. Review our Privacy Policy, Cookie Policy, and Terms of Service.",
        accept: "Accept",
        decline: "Decline",
        links: [
            {
                label: "Privacy Policy",
                href: "privacy-policy.html"
            },
            {
                label: "Cookie Policy",
                href: "cookie-policy.html"
            },
            {
                label: "Terms of Service",
                href: "terms-of-service.html"
            }
        ]
    },

    faq: [
        {
            question: "Does Pestora perform pest control services directly?",
            answer:
                "No. Pestora is an independent provider matching platform. Pestora does not perform pest control services, does not send technicians, and does not guarantee pest removal."
        },
        {
            question: "How does Pestora help homeowners?",
            answer:
                "Pestora helps homeowners organize request details and compare independent local pest control provider options based on pest category, location, availability, and service details."
        },
        {
            question: "What should I verify before choosing a provider?",
            answer:
                "Homeowners should verify licensing, insurance, qualifications, service scope, pricing, scheduling, warranty language, and any contract terms before hiring a provider."
        },
        {
            question: "Are quotes always free?",
            answer:
                "Quote and inspection policies vary by provider. Homeowners should confirm pricing, estimate terms, and any fees directly with the provider."
        },
        {
            question: "Can provider availability vary by ZIP code?",
            answer:
                "Yes. Provider availability may vary by ZIP code, city, pest category, season, and provider capacity."
        }
    ],

    socialProof: {
        eyebrow: "Homeowner feedback",
        title: "What homeowners say about Pestora",
        items: [
            {
                rating: 5,
                quote:
                    "Pestora helped me find a few local company options and compare what each provider offered before making calls.",
                name: "Jessica M.",
                location: "Dallas, TX"
            },
            {
                rating: 5,
                quote:
                    "Very easy process. I compared several providers and chose the one that fit my needs best without feeling locked into one option.",
                name: "Mark T.",
                location: "Phoenix, AZ"
            },
            {
                rating: 5,
                quote:
                    "I like that Pestora does not sell itself as the service. They just connect you with local options that fit your needs.",
                name: "Sandra L.",
                location: "Orlando, FL"
            },
            {
                rating: 5,
                quote:
                    "The request form was simple and helped me organize what I needed before speaking with providers directly.",
                name: "Anthony R.",
                location: "Charlotte, NC"
            },
            {
                rating: 5,
                quote:
                    "It made comparing pest control provider options less confusing. I still verified details before choosing.",
                name: "Megan P.",
                location: "Sacramento, CA"
            },
            {
                rating: 5,
                quote:
                    "Helpful for getting a clearer view of local provider availability without feeling locked into one option or company.",
                name: "Daniel K.",
                location: "Tampa, FL"
            }
        ]
    },

    howItWorks: [
        {
            title: "Share Your Request",
            text:
                "Tell us about your pest concern, property type, ZIP code, and timing."
        },
        {
            title: "Compare Local Providers",
            text:
                "We help match your request with nearby independent pest control provider options."
        },
        {
            title: "Review & Compare Quotes",
            text:
                "Compare service scope, pricing, availability, and provider details."
        },
        {
            title: "Choose with Confidence",
            text:
                "You decide which provider is right after verifying important details."
        }
    ],

    benefits: [
        {
            title: "Save Time",
            text:
                "No need to call multiple companies first. Submit one request and compare matched options."
        },
        {
            title: "Compare Options",
            text:
                "Review multiple providers, service details, and pricing side by side."
        },
        {
            title: "Local Providers",
            text:
                "Connect with providers that may serve your local area."
        },
        {
            title: "You're In Control",
            text:
                "You decide who to hire after comparing all your options."
        }
    ],

    pageMeta: {
        "index.html": {
            title: "Pestora | Compare Local Pest Control Provider Options",
            description:
                "Pestora helps homeowners compare independent local pest control provider options across the USA. Pestora does not perform pest control services directly."
        },
        "services.html": {
            title: "Pest Control Provider Matching Services | Pestora",
            description:
                "Compare independent local provider options for ant, cockroach, termite, rodent, mosquito, and outdoor pest service categories."
        },
        "about.html": {
            title: "About Pestora | Independent Pest Provider Matching Platform",
            description:
                "Learn how Pestora helps homeowners organize pest control requests and compare independent local provider options."
        },
        "contact.html": {
            title: "Contact Pestora | Start a Pest Provider Matching Request",
            description:
                "Start a compact pest provider matching request with Pestora and compare independent local provider options."
        },
        "privacy-policy.html": {
            title: "Privacy Policy | Pestora",
            description:
                "Read the Pestora Privacy Policy for information about data, contact forms, and platform use."
        },
        "cookie-policy.html": {
            title: "Cookie Policy | Pestora",
            description:
                "Read the Pestora Cookie Policy for information about cookies, local storage, and privacy preferences."
        },
        "terms-of-service.html": {
            title: "Terms of Service | Pestora",
            description:
                "Read the Pestora Terms of Service for use of the independent pest control provider matching platform."
        },
        "ant-cockroach-control.html": {
            title: "Ant & Cockroach Provider Matching | Pestora",
            description:
                "Compare local provider options for ant and cockroach-related pest control service categories."
        },
        "termite-control.html": {
            title: "Termite Provider Matching | Pestora",
            description:
                "Compare independent local provider options for termite-related pest control service categories."
        },
        "rodent-control.html": {
            title: "Rodent Provider Matching | Pestora",
            description:
                "Compare independent local provider options for rodent-related pest control service categories."
        },
        "mosquito-outdoor-pests.html": {
            title: "Mosquito & Outdoor Pest Provider Matching | Pestora",
            description:
                "Compare independent local provider options for mosquito and outdoor pest-related service categories."
        }
    }
};
