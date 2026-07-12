# Andrea Bolognino — Portfolio

Static website for the artist **Andrea Bolognino**, served at
[www.andreabolognino.com](https://www.andreabolognino.com/).

All content (statement, project texts, titles, media, dimensions) is transcribed
verbatim from the artist's portfolio PDF.

## Structure

```
.
├── assets/images/       # artwork images (also where uploads from the panel land)
├── content/
│   ├── sito.json        # site name, statement, contact info
│   └── progetti.json    # every exhibition/project + its works, newest first
├── .pages.yml           # Pages CMS config (powers the editing panel)
├── CNAME                # custom domain for GitHub Pages (www.andreabolognino.com)
├── README.md
├── index.html           # page markup
├── portfolio.pdf        # downloadable full portfolio
├── script.js            # renders content/*.json into the page + lightbox
├── style.css            # styling
└── .nojekyll             # tell GitHub Pages to serve files as-is
```

## Editing content

The easiest way is the **editing panel** (Pages CMS) — see "Content panel" below;
no code, no GitHub website needed.

If editing by hand instead: everything lives in the two JSON files in `content/`.

- `content/sito.json` — `statement` (artist bio), `email` (leave `""` to hide the
  contact line), `name`, `domain`.
- `content/progetti.json` — array of projects, newest first. Each has a `title`,
  `year`, optional `subtitle`/`venue`/`curator`/`credits`, a `summary`, and a list
  of `works` (`{ image, title, medium }`). `image` is the path to a file in
  `assets/images/`. The page anchor/URL for each project is generated
  automatically from its title, so there's no id to manage by hand.

## Content panel (Pages CMS)

This repo is set up for [Pages CMS](https://pagescms.org), a free web panel that
lets anyone add/edit projects and upload images without touching code or GitHub
directly — same tool used on the tumugaogao.com site.

1. Whoever owns the GitHub repo signs in at https://app.pagescms.org with GitHub
   and selects this repository. `.pages.yml` is picked up automatically.
2. To give the artist (or anyone without a GitHub account) access: inside Pages
   CMS, open **Collaborators** for this repo and invite them by email. They'll
   get a link to sign in and edit — no GitHub account required.
3. In the panel: **"Mostre / Progetti"** = add/edit/reorder exhibitions and their
   images; **"Impostazioni sito"** = statement and contact info. Every save is
   committed straight to GitHub, and the live site updates within a couple of
   minutes.

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
