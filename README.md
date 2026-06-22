# Andrea Bolognino — Portfolio

Static website for the artist **Andrea Bolognino**, served at
[www.andreabolognino.com](https://www.andreabolognino.com/).

All content (statement, project texts, titles, media, dimensions) is transcribed
verbatim from the artist's portfolio PDF.

## Structure

```
.
├── assets/images/   # artwork images extracted from the portfolio
├── CNAME            # custom domain for GitHub Pages (www.andreabolognino.com)
├── README.md
├── data.js          # ← single source of truth: all texts and works
├── index.html       # page markup
├── portfolio.pdf    # downloadable full portfolio
├── script.js        # renders data.js into the page + lightbox
├── style.css        # styling
└── .nojekyll        # tell GitHub Pages to serve files as-is
```

## Editing content

Everything you read on the site lives in **`data.js`** — edit that file, no HTML needed.

- `SITE.statement` — the artist statement.
- `SITE.email` — empty by default; add an email to show it in the Contact section.
- `PROJECTS` — array of projects, newest first. Each has a title, year, venue,
  optional curator/credits, a summary, and a list of `works`
  (`{ src, title, medium }`).

To add an image: drop the file in `assets/images/` and reference it with
`img("filename.jpg")` inside the relevant project's `works` array.

## Local preview

No build step. Open `index.html` directly, or run a local server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a repository and push these files to the `main` branch.
2. In **Settings → Pages**, set the source to **Deploy from a branch**,
   branch `main`, folder `/ (root)`.
3. The `CNAME` file already points the site to `www.andreabolognino.com`.

### DNS (custom domain)

At your domain registrar, add:

- A **CNAME** record for `www` → `<your-username>.github.io`
- Four **A** records for the apex `@` → GitHub Pages IPs:
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

Then in **Settings → Pages → Custom domain**, confirm `www.andreabolognino.com`
and enable **Enforce HTTPS**.
