# Publishing to GitHub Pages (the shareable link)

Goal: a public URL your presenter opens and clicks through — no install, no login.

## Option A — web upload (no command line)

1. Create a new repository on GitHub, e.g. `ccs-collab-prototype`. Make it
   **Public** (Pages on free accounts needs public). You can leave it empty.
2. On the repo page, click **Add file → Upload files**.
3. Drag in the entire contents of this folder — `index.html`, all the other
   `.html` files, and the `assets/` folder. Keep the structure: `assets/` must
   stay a subfolder. Commit.
4. Go to **Settings → Pages**.
5. Under **Build and deployment → Source**, choose **Deploy from a branch**.
   Set branch to `main` and folder to `/ (root)`. Save.
6. Wait ~1 minute. The page shows your live URL:
   `https://<your-username>.github.io/ccs-collab-prototype/`
7. Open it to confirm, then send that link to whoever is presenting.

## Option B — command line

```bash
cd ccs-proto
git init
git add .
git commit -m "CCS collaborative prototype"
git branch -M main
git remote add origin https://github.com/<you>/ccs-collab-prototype.git
git push -u origin main
```

Then do steps 4–7 above.

## Notes

- The site is fully static, so it works on Pages as-is. No Jekyll, no build.
- The root URL lands on `index.html`, which forwards to `dashboard.html` — the
  start of the happy path.
- Updating later: re-upload changed files (or `git push`); Pages redeploys
  automatically in a minute or two.
- If you'd rather not make a repo public, the same files deploy unchanged to
  Netlify Drop (drag-the-folder) or Cloudflare Pages — any static host works.
