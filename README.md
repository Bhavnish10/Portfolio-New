# Bhavnish Nanda — Premium Personal Portfolio

A world-class, futuristic, and responsive personal portfolio website built to showcase Bhavnish Nanda's hybrid expertise in **Corporate Finance, Data Analytics, and Software Engineering**. 

The website transitions from a traditional layout to a modern, animated, and highly interactive developer-analyst terminal experience.

---

## 🛠️ Technology Stack & Libraries

* **Core**: [Next.js 16 (App Router)](https://nextjs.org/) with [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), and [TypeScript](https://www.typescriptlang.org/).
* **Animations**: [Framer Motion](https://www.framer.com/motion/) (scroll entrance, staggered animations, modal transits, menu drawers, and tab highlights).
* **Scroll System**: [Lenis](https://lenis.darkroom.engineering/) (inertia-based, ultra-smooth scroll easing).
* **Interactive Utility**: [Canvas Confetti](https://github.com/catdad/canvas-confetti) (copy celebration animations).
* **Icons**: [Lucide React](https://lucide.dev/) (minimalist wireframe indicators).
* **Branding**: Native vector-based SVG inline icons for official brand graphics (LinkedIn, GitHub, WhatsApp).

---

## 📂 Source Code Structure

* **`src/app/`**: Root app routers, global styles (`globals.css`), and layout definitions.
* **`src/components/`**: Modular, highly reusable page sections:
  * `Hero.tsx`: Title banner, rotating focus typewriter loops, CTA download links, and floating headshot container.
  * `Navbar.tsx`: Sticky navigation header with scroll-detection opacity and sliding mobile drawer menu.
  * `About.tsx`: Glassmorphic bio cards (Academic hybrid, analytical focus, communication impact) and dynamic color-coded competency tag pills.
  * `Journey.tsx`: Interactive unified timeline mapping MBA/B.Tech education and internships with tab filters (All, Work, Education).
  * `Skills.tsx`: 4-column responsive grid showcasing skill badges matching specific color themes.
  * `Projects.tsx`: Perspective hover cards with deep-dive detail overlay modals.
  * `Certifications.tsx`: Clean accordion tracking Bloomberg, Alteryx, and Deloitte credentials.
  * `Achievements.tsx`: Accordion tracking hackathon final logs.
  * `Contact.tsx`: Social bento grids with 3D glass brand spheres (LinkedIn, GitHub, WhatsApp) and direct copy email utility.
  * `AiAssistant.tsx`: Fixed AI Chatbot simulator responding to skills, contact details, and education paths.
  * `CustomCursor.tsx`: Glow mouse-spotlight follower tracking desktop cursor coords (disabled on mobile touch devices).

---

## 📱 Device Compatibility & Optimization

* **Laptop & Desktop**: Mouse-spotlight glows, spring-scale hover cursor indicators, and 3D social card tilt physics.
* **Mobile & Tablets**: 
  * Responsive navigation dropdown header.
  * Stacking bento cards and email utility structures.
  * Custom cursor automatically disabled on viewports `< 1024px` and touch screens (`pointer: coarse`) to ensure smooth native scrolling.
  * Profile headshot ordered at the top (`order-first`) for immediate visual impact on phones.
* **TV & Large Displays**: Configured container max-widths and ultra-large typography scales (`xl:text-7xl 2xl:text-8xl`) for high-fidelity 4K presentation.

---

## 🚀 Running the Project Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation
1. Open your terminal in the directory:
   ```bash
   cd C:\Users\admin\.gemini\antigravity\scratch\portfolio
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Run the local development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your web browser.

### Production Build
To compile and test the optimized production build:
```bash
npm run build
npm start
```
