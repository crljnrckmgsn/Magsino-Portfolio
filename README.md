# CJ Portfolio

Personal portfolio of Carl Janrick Aurelio Magsino. Open `index.html` in any browser. No server or build step needed. All files live directly in this folder (no subfolders).

## Files
- **Pages:** `index.html` (entry point), `about.html`, `education.html`, `skills.html`, `projects.html`, `experience.html`, `achievements.html`, `contact.html`. They share one nav and footer.
- **Projects (unchanged):** `kaepalan-ni-cj.html`, `mama-ms-store.html`, `periodic-table.html`, with previews `*-preview.jpg`.
- **CSS (load in this order):** `style.css` (design system), `components.css`, `animations.css`, `responsive.css`.
- **JavaScript:** `main.js` loads first (helpers and startup); then `navigation.js`, `motion.js` (scroll reveals, parallax), plus `loader.js` (home), `projects.js` (projects page), `contact.js` (contact page). Plain scripts, not ES modules, so they work from `file://`.
- **Media:** `profile.png` (hero portrait), `favicon.png`, `resume.pdf`.

## Notes
- Fonts load from Google Fonts when online and fall back to system sans-serif offline.
- The contact form opens your email app (`mailto:`); there is no server to store messages.
- To update the resume or portrait, replace `resume.pdf` or `profile.png` (same names).
