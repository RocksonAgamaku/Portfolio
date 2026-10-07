# Rockson Agamaku’s portfolio

A static portfolio covering leadership, technical projects, STEM outreach, and community ventures. Built with HTML, CSS, and JavaScript; no dependencies or build step.

## Local preview

Run `python3 -m http.server 8765` from this directory, then open http://localhost:8765. Keep `assets/` alongside `index.html` when copying or hosting the site.

## Content and media

Edit section descriptions and captions in `index.html`. Each photo uses 480px and 960px WebP previews; `data-full` points to the original JPEG used by the gallery. Preserve descriptive alternative text when adding photos. Videos are separate MP4 files and download when visitors start playback.

Gallery buttons are added progressively by JavaScript. Without JavaScript, photos, captions, section links, and video controls remain available. The gallery supports Tab, Escape, and left/right arrow keys, with focus returning to the opened photo when closed.

## Deployment

Push to `main` to run `.github/workflows/deploy.yml`, which publishes this directory to GitHub Pages. Preview and check changes before pushing.
