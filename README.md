# Rockson Agamaku’s portfolio

A static portfolio covering technical projects, student leadership, STEM outreach, and community ventures. Built with HTML, CSS, and JavaScript; no dependencies or build step.

## Local preview

Run `python3 -m http.server 8765` from this directory, then open http://localhost:8765. Keep `styles.css`, `script.js`, and `assets/` alongside `index.html` when copying or hosting the site.

## Content and media

Edit the introduction, featured cards, project summaries, and captions in `index.html`. Styles are in `styles.css`; progressive galleries and navigation are in `script.js`.

Each photo uses 480px and 960px WebP previews. The `data-full` attribute points to the original JPEG used by the gallery. Use descriptive alternative text and dimensions when adding images. The first photo in each gallery receives a larger layout, so choose a strong overview image. Featured cards link to the relevant story.

Photo galleries initially show up to six images, with a button to reveal the rest. Lightbox arrow keys cycle through the current section’s entire album, including photos beyond the initial selection. Tab stays inside the dialog; Escape closes it and returns focus to the opened photo. Without JavaScript, every photo and caption stays visible, document links work, and videos retain native controls. Desktop navigation switches to a section selector on mobile when JavaScript is available; otherwise section links remain visible.

Documents use contained previews and direct links to their full original files. Keep the document description meaningful. Videos use related project photographs as covers, with duration labels read from the original MP4 metadata. Update the cover, accessible title, caption, and duration when replacing a video; videos only download when requested by the visitor.

Section stories retain the supplied descriptions. New outcomes, impact figures, project capabilities, or personal roles should be added only when confirmed.

## Deployment

Push to `main` to run `.github/workflows/deploy.yml`, which publishes this directory to GitHub Pages. Preview and check changes before pushing.
