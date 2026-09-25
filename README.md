# Tioluwani Akinloye — Perception Systems

Personal portfolio for a software / AI engineer working toward robotics, computer vision, and intelligent systems.

The site is designed as a **perception stack**, not a generic developer template with a robotics skin.

## Design direction

**Pipeline:** Perceive → Understand → Build → Act

**Interface metaphor:** a research-lab viewport — coordinate frame, tracker, case files, mission log, capability stack, handshake.

**Visual language:** dark graphite, warm paper type, brass (not neon), IBM Plex + Instrument Serif, CAD corners, grids, schematics.

**Content rule:** edit facts in `src/data/content.ts`. Placeholders are intentional. Do not invent results.

## Architecture

```
src/
  data/content.ts      ← all copy, projects, timeline, skills, links
  types.ts
  pages/               Home + immersive case-study route
  sections/            one file per page section
  components/
    vision/            boot sequence + pointer-linked tracker
    system/            section headers, architecture SVG
    layout/            HUD chrome
  hooks/
  styles/              tokens/layout/sections
```

Projects are data-driven. `/work/:slug` is a full dossier (problem, approach, contribution, result, schematic, tech table, screenshot frames).

## Scripts

```bash
npm install
npm run dev
npm run build
```

Deployed as a SPA (Netlify redirects included). Update `index.html` canonical URL, `public/sitemap.xml`, and `public/robots.txt` when the production domain is final.

## Fill in later

- Email, LinkedIn, resume in `profile.links`
- Timeline roles and prior education
- Project years, metrics, and screenshots under `public/work/<slug>/`
- Personal about paragraph
