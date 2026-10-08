# Brainrot in the Grass — Field Guide

A responsive, dependency-free developer wiki for **Brainrot in the Grass**, with a home page, gameplay guide, searchable character directory, rarity tiers, upgrades, FAQs and contact links.

**Domain:** https://brainrotinthegrasswiki.store/  
**Contact:** contact@brainrotinthegrasswiki.store  
**Current state:** Ready to publish; game is represented as in development. No unverified Roblox game URL, encounter rarities, odds, release date or screenshots have been invented.

## Preview locally

Open `index.html` in a browser, or use `python3 -m http.server 8000` from this folder and open `http://localhost:8000`.

## Publish with GitHub Pages (free)

1. While signed into GitHub as `IAmDaster`, create a **public** repository named `brainrot-in-the-grass-wiki` with **Add a README** checked. The repository must have a `main` default branch.
2. Upload the site files, preserving the `assets/` folder and the `CNAME` file. ChatGPT can add these files through the connected GitHub account after the repository exists.
3. In repository **Settings → Pages**, set **Source → Deploy from a branch**, **Branch → main**, **Folder → / (root)**, and save.
4. In **Settings → Pages**, enter custom domain `brainrotinthegrasswiki.store` if not already shown, then save. GitHub's check may take time.
5. In **Spaceship → Advanced DNS**, add these four separate `A` records for the root (`@`):

   | Type | Host | Value | TTL |
   |---|---|---|---|
   | A | @ | 185.199.108.153 | Auto |
   | A | @ | 185.199.109.153 | Auto |
   | A | @ | 185.199.110.153 | Auto |
   | A | @ | 185.199.111.153 | Auto |

   **Optional `www`:** Add `CNAME` with host `www` and value `IAmDaster.github.io`.

6. **Do not delete or edit any Zoho MX, SPF, DKIM or verification TXT records.** Website `A` records are separate and can coexist with mail DNS.
7. Allow DNS and SSL certificate propagation. Turn on **Enforce HTTPS** under Pages after GitHub makes the setting available. Visit the domain to confirm it loads.

Official GitHub reference: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Updating the wiki

- **Characters:** Edit `const characters` in `app.js`. Rarity assignments are intentionally omitted until the game developer confirms them.
- **Rarity labels:** Edit `const rarities` in `app.js`.
- **Game description, FAQs, upgrades:** Edit `index.html`.
- **Styles and colors:** Edit `styles.css`.
- **Replace illustration with screenshots:** After you have genuine game screenshots and permission to use them, add them to `/assets` and update `index.html`.
- **Roblox experience link:** Add a verified public experience link when available. Do not label a game as published until it is live.

## Claude application description (under 500 characters)

> I'm developing Brainrot in the Grass, a Roblox exploration and collection game where players discover characters, carry them to safety, and upgrade their bases. I plan to use Claude for Luau scripting, debugging, testing, development tools and documentation, and to support a companion game wiki with character guides and gameplay information.

Use only if this truthfully describes your intended use. Having a website and an email address does not establish eligibility for Claude's startup promotion.

## Privacy and dependencies

- No tracking, cookies, forms, or third-party JavaScript libraries.
- Fonts load from Google Fonts if available; the design falls back to system fonts.
- Fully static. No backend or ongoing website-hosting subscription is required on a public GitHub repository.
