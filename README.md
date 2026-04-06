# Genesis Website Frontend

> Official website for **GENESIS Group Japan** and **Edify Inc.** — a bilingual (Japanese / English) corporate website covering company identity, services, team, global presence, careers, and Japan portfolio.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Routing Architecture](#4-routing-architecture)
5. [Pages & Sections](#5-pages--sections)
6. [Design System](#6-design-system)
7. [Animation System](#7-animation-system)
8. [Internationalisation (i18n)](#8-internationalisation-i18n)
9. [Supabase Integration](#9-supabase-integration)
10. [Custom Hooks & Utilities](#10-custom-hooks--utilities)
11. [Build & Deploy](#11-build--deploy)
12. [Environment Variables](#12-environment-variables)
13. [Getting Started](#13-getting-started)
14. [Key Design Decisions](#14-key-design-decisions)

---

## 1. Project Overview

| Field | Value |
|---|---|
| Company | Genesis Group Japan / Edify Inc. |
| Headquarters | Hiroshima, Japan (4-6-4 Yaga, Higashi-ku) |
| Japan Offices | Hiroshima · Hakata (Fukuoka) · Sapporo |
| India Office | New Delhi |
| UAE Office | Dubai *(expanding)* |
| Contact | enquiry@edify.jp |
| Default Language | Japanese (`ja`) |
| Secondary Language | English (`en`) |
| Established | 2018 |

The site serves as both a **marketing presence** and a **recruitment pipeline**, with Supabase-backed form submissions for careers and contact enquiries.

---

## 2. Tech Stack

### Runtime & Framework

| Package | Version | Role |
|---|---|---|
| `react` | ^19.2.0 | UI framework |
| `react-dom` | ^19.2.0 | DOM renderer |
| `typescript` | ~5.9.3 | Type safety |
| `vite` | ^7.2.4 | Build tool & dev server |
| `@vitejs/plugin-react-swc` | ^4.2.2 | SWC-powered Fast Refresh |

### Styling

| Package | Version | Role |
|---|---|---|
| `tailwindcss` | ^4.1.18 | Utility-first CSS |
| `@tailwindcss/vite` | ^4.1.18 | Vite integration for Tailwind v4 |
| `autoprefixer` | ^10.4.24 | CSS vendor prefixes |
| `postcss` | ^8.5.6 | CSS post-processing |

### Animation

| Package | Version | Role |
|---|---|---|
| `gsap` | ^3.14.2 | Scroll-pinned timelines, entrance animations |
| `framer-motion` | ^12.34.0 | Hover tilt, parallax, whileInView reveals |
| `lenis` | ^1.3.17 | Smooth scroll (RAF-synced with GSAP ticker) |

### Internationalisation

| Package | Version | Role |
|---|---|---|
| `i18next` | ^25.8.6 | i18n core |
| `react-i18next` | ^16.5.4 | React bindings (`useTranslation`) |

### Backend / Data

| Package | Version | Role |
|---|---|---|
| `@supabase/supabase-js` | ^2.95.3 | Database reads + file storage |

### UI / Particles

| Package | Version | Role |
|---|---|---|
| `lucide-react` | ^0.563.0 | Icon set |
| `@tsparticles/react` | ^3.0.0 | Particle background (Starry component) |
| `@tsparticles/slim` | ^3.9.1 | Slim tsparticles bundle |

### Dev Tooling

| Package | Version | Role |
|---|---|---|
| `eslint` | ^9.39.1 | Linter |
| `typescript-eslint` | ^8.46.4 | TypeScript ESLint rules |
| `eslint-plugin-react-hooks` | ^7.0.1 | React Hooks linting |
| `eslint-plugin-react-refresh` | ^0.4.24 | HMR safety checks |
| `@types/node` | ^24.10.1 | Node type definitions |
| `globals` | ^16.5.0 | Global variable definitions |

---

## 3. Project Structure

```
genesis_website_frontend/
├── public/
│   ├── fonts/
│   │   ├── ITALIANTYPE - ETRUSCONOW MEDIUM.OTF
│   │   └── ITALIANTYPE - ETRUSCONOWCONDENSED BOLD.OTF
│   └── .htaccess                   # Apache SPA rewrite rules
│
├── src/
│   ├── main.tsx                    # React entry point
│   ├── App.tsx                     # Root: routing, Lenis, GSAP lifecycle
│   ├── index.css                   # Global styles, font declarations, keyframes
│   ├── i18n.ts                     # i18next configuration
│   │
│   ├── locales/
│   │   ├── en.json                 # English translations (~300 keys)
│   │   └── ja.json                 # Japanese translations (~300 keys)
│   │
│   ├── lib/
│   │   ├── supabase.ts             # Supabase client initialisation
│   │   ├── types.ts                # Shared TypeScript interfaces
│   │   └── useIsMobile.ts          # Responsive breakpoint hook (768 px)
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   └── Starry.tsx          # tsParticles ambient background
│   │   │
│   │   ├── sections/               # All page sections (see §5)
│   │   │   ├── Navbar.tsx
│   │   │   ├── MenuOverlay.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Core.tsx
│   │   │   ├── Global_Footprint.tsx
│   │   │   ├── JapanOffices.tsx
│   │   │   ├── Partners.tsx
│   │   │   ├── CeoVision.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── AboutUs.tsx
│   │   │   ├── TeamMarquee.tsx
│   │   │   ├── Careers.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── JapanPortfolio.tsx
│   │   │   ├── ImpactInnovation.tsx
│   │   │   ├── SignatureEvent.tsx
│   │   │   ├── SocialInitiatives.tsx
│   │   │   ├── JoinUs.tsx
│   │   │   └── Updates.tsx
│   │   │
│   │   └── images/                 # Static assets (JPG, PNG, WEBP, MP4)
│   │
│   └── pages/                      # Page wrapper components (see §5)
│       ├── AboutUsPage.tsx
│       ├── CareersPage.tsx
│       ├── ContactUsPage.tsx
│       ├── GxBrochurePage.tsx
│       ├── GxTrainingPage.tsx
│       ├── ImpactInnovationPage.tsx
│       ├── JapanPortfolioPage.tsx
│       ├── JoinUsPage.tsx
│       ├── OpenApplicationPage.tsx
│       ├── ServicesPage.tsx
│       ├── SocialInitiativesPage.tsx
│       └── UpdatesPage.tsx
│
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── package.json
```

---

## 4. Routing Architecture

The project uses a **custom client-side router** built directly in `App.tsx` — no React Router dependency.

### How It Works

```typescript
// State
const [currentPage, setCurrentPage] = useState<Page>("home");
const [homeKey, setHomeKey]         = useState(0);   // forces remount on home reset
const [pageKey, setPageKey]         = useState(0);   // forces remount on navigation

// Navigation
const handleNavigate = (page: Page) => {
  cleanupScrollState();                          // kills GSAP ScrollTrigger + Lenis
  window.history.pushState({ page }, "", url);  // updates browser URL
  setCurrentPage(page);
  setPageKey(k => k + 1);                       // key change = full component remount
};
```

Each page remounts on navigation via the `key` prop, which naturally re-initialises all GSAP and Lenis contexts without needing manual teardown per-component.

Browser **back / forward** is handled via a `popstate` event listener that reads `event.state.page`.

### Route Map

| Page | URL | Component |
|---|---|---|
| `home` | `/` | Inline in App.tsx |
| `about-us` | `/about-us` | `AboutUsPage` |
| `services` | `/services` | `ServicesPage` |
| `impact-innovation` | `/impact-innovation` | `ImpactInnovationPage` |
| `careers` | `/careers` | `CareersPage` |
| `social-initiatives` | `/social-initiatives` | `SocialInitiativesPage` |
| `join-us` | `/join-us` | `JoinUsPage` |
| `updates` | `/updates` | `UpdatesPage` |
| `open-application` | `/open-application` | `OpenApplicationPage` |
| `japan-portfolio` | `/japan-portfolio` | `JapanPortfolioPage` |
| `contact-us` | `/contact-us` | `ContactUsPage` |
| `gx-training` | `/gx-training` | `GxTrainingPage` |
| `gx-brochure` | `/gx-brochure` | `GxBrochurePage` |

---

## 5. Pages & Sections

### Homepage Section Order

```
Hero
About
Core
Global_Footprint
JapanOffices
Partners
CeoVision
Contact
```

### 会社概要 / About Us Page

```
AboutUs
TeamMarquee
Global_Footprint
JapanOffices
```

### Section Reference

| Section | File | Description |
|---|---|---|
| `Navbar` | `Navbar.tsx` | Fixed top bar — logo, tagline "Technology Pioneers", JOIN US + UPDATES buttons, hamburger |
| `MenuOverlay` | `MenuOverlay.tsx` | Full-screen overlay with 6 nav links, earth-toned radial gradient, map texture |
| `Hero` | `Hero.tsx` | Video background (desktop) / static image (mobile), animated city coordinates |
| `About` | `About.tsx` | Scroll-pinned mask-text reveal, 3 content pairs |
| `Core` | `Core.tsx` | 5 service capability cards — Green Transformation, Outsourcing, Crypto, Reskilling, Drone |
| `Global_Footprint` | `Global_Footprint.tsx` | World map with animated stamp cards for Hiroshima, New Delhi, Dubai |
| `JapanOffices` | `JapanOffices.tsx` | Editorial 3-column grid — Hiroshima HQ, Hakata satellite, Sapporo satellite |
| `Partners` | `Partners.tsx` | Infinite CSS marquee of partner logos |
| `CeoVision` | `CeoVision.tsx` | CEO quote with portrait, amber-framed layout |
| `Contact` | `Contact.tsx` | Footer — company links, follow us, Hiroshima address, Edify branding |
| `AboutUs` | `AboutUs.tsx` | 700% scroll-hijacked GSAP timeline, 3 animated content pairs |
| `TeamMarquee` | `TeamMarquee.tsx` | Dual infinite marquee — Leadership team + Mentors with avatar circles |
| `Careers` | `Careers.tsx` | Job roles with filter, CV upload to Supabase Storage |
| `Services` | `Services.tsx` | 7 service cards with 3D holographic tilt, outsourcing banner, how-it-works steps |
| `JapanPortfolio` | `JapanPortfolio.tsx` | Products grid — HOMA Drone, REAGVIS DeepTrust, Van Rakshak, Bihar Heritage AR/VR |
| `ImpactInnovation` | `ImpactInnovation.tsx` | Academic partner logos (IIT Mandi, IIT Ropar, Kyushu University), defence areas, parallax |
| `SignatureEvent` | `SignatureEvent.tsx` | Hackathon — timeline, gallery images, event status badges |
| `SocialInitiatives` | `SocialInitiatives.tsx` | Yoga / mindfulness culture programs, community initiatives |
| `JoinUs` | `JoinUs.tsx` | Role cards with mouse-tracking tilt, open application CTA |
| `Updates` | `Updates.tsx` | Press / transmission cards fetched live from Supabase, 3D holographic tilt |

### Menu Overlay Links

| Label key | Navigates to |
|---|---|
| `navbar.aboutusUpper` | `/about-us` |
| `navbar.servicesUpper` | `/services` |
| `navbar.careersUpper` | `/careers` |
| `navbar.socialInitiativesUpper` | `/social-initiatives` |
| `navbar.impactInnovationUpper` | `/impact-innovation` |
| `navbar.japanPortfolioUpper` | `/japan-portfolio` |

---

## 6. Design System

### Typography

The site uses **three font families**:

| Font | Source | Weights | Usage |
|---|---|---|---|
| **EtruscoNow** | Custom OTF (`/public/fonts/`) | 500 (Medium), 700 (Condensed Bold) | Global default (`*` selector), display headers |
| **Inter** | Google Fonts | 300, 400, 500, 600 | UI labels, body copy, card text (`font-['Inter']`) |
| **Montserrat** | Google Fonts | 500, 600, 700, 800 | Secondary headings, eyebrow labels |

**Sizing scale:**

| Context | Class |
|---|---|
| Hero / section title | `text-5xl` – `text-7xl` |
| Card title | `text-2xl` – `text-3xl` |
| Body | `text-sm` – `text-base` |
| Labels / eyebrows | `text-[9px]` – `text-xs` |

**Typographic conventions:**
- Section titles: `font-black` + `tracking-[-0.03em]` (tight)
- Eyebrow labels: `uppercase` + `tracking-[0.25em]` (wide) + amber colour
- Body: `leading-relaxed` + `text-white/50` – `text-white/70`

---

### Colour Palette

| Role | Hex | Tailwind |
|---|---|---|
| Page background | `#050505` | `bg-[#050505]` |
| Card background | `#0a0a0a` | `bg-[#0a0a0a]` |
| **Amber accent** | `#f59e0b` | `text-amber-400` / `bg-amber-400` |
| Amber badge bg | `rgba(251,191,36,0.10)` | `bg-amber-400/10` |
| White primary | `#ffffff` | `text-white` |
| White secondary | `rgba(255,255,255,0.70)` | `text-white/70` |
| White muted | `rgba(255,255,255,0.45)` | `text-white/45` |
| Subtle border | `rgba(255,255,255,0.08)` | `border-white/[0.08]` |
| Button (blue-grey) | `#556982` | `bg-[#556982]` |
| Warm dark | `#1a1200` | `bg-[#1a1200]` |

---

### Spacing & Layout

- Max content width: `max-w-6xl` (1152 px)
- Section vertical padding: `py-24` – `py-32`
- Card gap: `gap-5` – `gap-6`
- Horizontal padding: `px-4 sm:px-6`

---

### Border Radius

| Class | Used on |
|---|---|
| `rounded-full` | Avatars, status dots, badges |
| `rounded-[22px]` | Japan office cards |
| `rounded-[24px]` | Navbar (mobile) |
| `rounded-[28px]` | Update cards |
| `rounded-[32px]` | Section cards |
| `rounded-[40px]` | Navbar (desktop) |
| `rounded-[73px]` | Large CTA buttons |

---

### Glassmorphism Card Pattern

Every card in the site follows this treatment:

```css
bg-[#0a0a0a]/90
backdrop-blur-3xl
border border-white/10
rounded-2xl
shadow-2xl
hover:border-amber-400/30
transition-colors duration-500
```

---

## 7. Animation System

Three animation layers work in concert:

### Layer 1 — Lenis (Smooth Scroll)

```typescript
const lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

// Sync Lenis RAF with GSAP ticker
gsap.ticker.add(time => lenis.raf(time * 1000));
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.lagSmoothing(0);
```

Lenis provides momentum-based smooth scrolling. Its RAF loop is fed directly into the GSAP ticker so ScrollTrigger always receives an accurate scroll position.

---

### Layer 2 — GSAP + ScrollTrigger

Registered in `App.tsx` and re-registered in each section that uses it.

**Standard section pattern:**

```typescript
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=700%",
        pin: true,
        scrub: 1,
      },
    });
    tl.fromTo(".element", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 });
  }, sectionRef);
  return () => ctx.revert();  // scoped cleanup on unmount
}, []);
```

**Sections using GSAP ScrollTrigger:**

| Section | Scroll length | Technique |
|---|---|---|
| `About` | `+=700%` | Pin + mask scale + 3 text pair sequence |
| `AboutUs` | `+=700%` | Pin + sequential text + image transitions |
| `Core` | variable | Pin + staggered card reveals |
| `Global_Footprint` | `+=200%` | Pin + staggered stamp card entrance |
| `JapanOffices` | none (non-pin) | `fromTo` entrance per card + header |

**Navigation cleanup:**

```typescript
ScrollTrigger.getAll().forEach(st => st.kill());
ScrollTrigger.clearScrollMemory();
window.scrollTo(0, 0);
ScrollTrigger.refresh(true);
```

---

### Layer 3 — Framer Motion

Used for interactive, non-scroll micro-animations.

**3D Tilt Cards** (Services, Updates, JoinUs):

```typescript
const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

<motion.div style={{ rotateX: springX, rotateY: springY, perspective: 1000 }}>
```

**whileInView entrances** (most sections):

```typescript
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
  viewport={{ once: true }}
>
```

**Parallax** (ImpactInnovation):

```typescript
const { scrollYProgress } = useScroll({ target: ref });
const y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
```

---

### CSS Keyframes (`index.css`)

```css
@keyframes marquee         { from { transform: translateX(0) }    to { transform: translateX(-50%) } }
@keyframes marquee-reverse { from { transform: translateX(-50%) } to { transform: translateX(0) }    }
```

Both run at `30s linear infinite`. Used in `TeamMarquee` and `Partners`.

---

## 8. Internationalisation (i18n)

### Configuration (`src/i18n.ts`)

```typescript
i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, ja: { translation: ja } },
  lng: "ja",           // default: Japanese
  fallbackLng: "ja",
  interpolation: { escapeValue: false },
});
```

### Locale Files

| File | Language |
|---|---|
| `src/locales/en.json` | English (~300 keys) |
| `src/locales/ja.json` | Japanese (~300 keys) |

### Top-Level Keys

| Key | Section |
|---|---|
| `navbar` | Navigation bar + menu overlay |
| `hero` | Hero landing |
| `aboutSection` | About (homepage) |
| `coreSection` | Core capabilities |
| `globalSection` | Global Footprint map |
| `japanOfficesSection` | Japan 3-city offices |
| `partnersSection` | Partners marquee |
| `ceoSection` | CEO vision |
| `teamSection` | Team marquee (leadership + mentors) |
| `joinUsSection` | Join Us page |
| `updatesSection` | Updates / transmissions |
| `contactSection` | Footer contact |
| `careers_page` | Careers page + job roles |
| `japanPortfolioSection` | Japan portfolio products |
| `aboutus_page` | About Us page content |
| `services_page` | Services page |
| `impact_page` | Impact & Innovation page |
| `signature_event_page` | Hackathon event |
| `social_page` | Social Initiatives |
| `open_application_page` | Open application form |
| `contact_us_page` | Contact Us page |
| `gxSection` | GX reskilling section |
| `gx_training_page` | GX Training page |

**Note:** The navbar includes a language toggle UI (EN / JA buttons), but it is currently **disabled in code** — the site always renders in Japanese by default.

---

## 9. Supabase Integration

### Client (`src/lib/supabase.ts`)

```typescript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

### Tables

| Table | Operation | Component | Purpose |
|---|---|---|---|
| `updates` | `SELECT` | `Updates.tsx` | Press / transmission feed |
| `contact_submissions` | `INSERT` | `ContactUsPage.tsx` | Contact form submissions |
| `open_applications` | `INSERT` | `Careers.tsx`, `OpenApplicationPage.tsx` | Job applications |

**`updates` row shape:**

```typescript
interface UpdateRow {
  transmission_id: string;
  headline_en: string;   headline_ja: string;
  summary_en: string;    summary_ja: string;
  date_en: string;       date_ja: string;
  category_en: string;   category_ja: string;
  featured: boolean;
  created_at: string;
}
```

### Storage

| Bucket | Access | Used in |
|---|---|---|
| `cv-uploads` | Private | `Careers.tsx`, `OpenApplicationPage.tsx` |

CV files are uploaded first, then the returned public URL is stored in `open_applications.cv_url`.

---

## 10. Custom Hooks & Utilities

### `useIsMobile` (`src/lib/useIsMobile.ts`)

Listens to `window.matchMedia("(max-width: 768px)")` and returns a boolean that updates on resize.

Used in every section to:
- Skip GSAP pin animations on mobile (scroll-pinning breaks mobile layout)
- Swap horizontal scroll containers for stacked grid layouts
- Conditionally render mobile-optimised image sizes

---

## 11. Build & Deploy

### Scripts

```bash
npm run dev       # vite — HMR dev server
npm run build     # tsc -b && vite build → dist/
npm run preview   # vite preview — local production preview
npm run lint      # eslint .
```

### Vite Config (`vite.config.ts`)

```typescript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
})
```

All source imports use the `@/` alias (e.g. `@/components/sections/Hero`).

### Deployment — Apache (Onamae shared hosting)

The site is a SPA deployed to Japanese shared hosting via Apache. A `.htaccess` in `public/` handles all routing:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

This redirects every non-file request back to `index.html`, letting the custom router in `App.tsx` handle it.

---

## 12. Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Both are prefixed `VITE_` so Vite exposes them to the browser bundle via `import.meta.env`.

---

## 13. Getting Started

```bash
# 1. Clone
git clone https://github.com/Pranjal250605/genesis_website_frontend.git
cd genesis_website_frontend

# 2. Install
npm install

# 3. Environment
cp .env.example .env
# Fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

# 4. Dev server
npm run dev

# 5. Production build
npm run build

# 6. Preview production build locally
npm run preview
```

---

## 14. Key Design Decisions

| Decision | Rationale |
|---|---|
| **Custom router (no React Router)** | Full control over GSAP / Lenis teardown between navigations; avoids scroll-state leaks that React Router's partial re-renders would cause |
| **Japanese as default language** | Primary market is Japan; SEO and first-load experience must target Japanese visitors out of the box |
| **GSAP + Lenis over CSS scroll-snap** | Scroll-pinned section animations with precise `scrub` control require GSAP's ScrollTrigger; Lenis prevents momentum jank |
| **Framer Motion for hover / tilt** | Spring physics on mouse-tracking interactions are cleaner with Framer Motion's `useSpring` than a GSAP `mousemove` listener |
| **Supabase for all data + storage** | Zero-backend approach — contact forms, CV uploads, and the live press feed all handled via Supabase without a custom API layer |
| **Vite + SWC** | Fastest HMR in development; SWC compile times are significantly faster than Babel |
| **Tailwind v4** | CSS-first configuration — no `tailwind.config.js` required; theme tokens live in the `@theme` CSS block |
| **Static hosting on Apache** | Client's existing Onamae plan; `.htaccess` rewrite rules replicate server-side routing for the SPA at zero additional infrastructure cost |
| **`useLayoutEffect` for GSAP** | Prevents layout thrashing — GSAP reads DOM measurements synchronously before the browser paints |
| **`gsap.context()` scoping** | All GSAP instances are scoped to a `ref`, so `ctx.revert()` cleanly removes all tweens and ScrollTriggers on unmount |

---

*Built by the GENESIS / Edify engineering team. Contact: enquiry@edify.jp*
