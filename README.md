# Collaborative Manager — clickable prototype (components model)

A pixel-faithful, clickable web prototype of the CVC Cross-Enrollment "create a
collaborative" happy path, built from your Figma flow and the CCS Component
Library (CVC skin). Pure static HTML/CSS/JS — no build step, no dependencies.

This is the **Collaborative Manager** variant, forked from `ccs-collab-prototype`
to carry the model agreed in the June 26, 2026 "Collaborating on Collaboratives"
meeting:

- **Roles renamed.** Super Admin → **Collaborative Manager**; invited campus admin
  → **Collaborative Contributor**.
- **Components.** A new collaborative-level **Components** tab holds the shared
  building blocks. Contributors add their campus's courses to each component (with
  OR grouping for same-course, different-name cases); programs reuse them, so
  courses are entered once.
- **Two-level builder.** A program requirement (the rules: name, credit,
  home-institution-only) now contains **components**, grouped with AND/OR. The
  manager builds structure only — course entry moved out of the builder and onto
  the components.

## The happy path

```
dashboard.html                Administrator Dashboard  → click "Collaborative"
  └ collaboratives.html       Regional Collaboratives  → "Create Collaborative"
      └ create-collab-1.html  Wizard 1 · Basic Information
      └ create-collab-2.html  Wizard 2 · Institution Partners  → "Create"
          └ collab-detail.html   ★ DETAIL HUB (Programs / Components / Admins tabs)
                                   the branch point — any tab, any order
              ├ add-program-1/2/3.html   Add Program wizard (3 steps)
              │   └ program-detail.html  Program (Draft) → Details / Program Requirement
              │       (the requirement builder adds components, grouped AND/OR)
              ├ add-component.html        Create a component (name / display / description)
              │   └ component-detail.html Courses by campus (contributors add courses; OR support)
              │       └ import-equivalencies-1/2.html  Import courses (CSV)
              ├ invite-admin.html        Invite Contributors
              └ (Publish) → collab-published.html   ★ payoff: Published
```

The detail hub is the centerpiece: the **Programs**, **Components**, and **Admins**
tabs let the presenter start anywhere, in any order — matching the real tabbed
design. The story is threaded through one consistent example, "Southern CA Health
Sciences Network," from creation to publish.

Small bits of state (requirement added, published) persist via `sessionStorage`
so the flow feels real on the return trips. "Restart demo" on the final screen
clears it.

## Run locally

Just open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000      # then visit http://localhost:8000
```

## Files

- `index.html` — redirects into `dashboard.html`
- `dashboard.html`, `collaboratives.html`, `create-collab-1/2.html`,
  `collab-detail.html`, `add-program-1/2/3.html`, `program-detail.html`,
  `add-component.html`, `component-detail.html`, `import-equivalencies-1/2.html`,
  `invite-admin.html`, `collab-published.html`
- `add-requirement.html`, `add-requirement-group.html` — the older flat builder,
  retained but unlinked (superseded by the components builder in `program-detail.html`)
- `assets/styles.css` — design tokens + component styles (CVC skin)
- `assets/app.js` — shared header/footer chrome, nav, toast
- `assets/header-logo.svg`, `assets/footer-logo.svg` — your uploaded logos

## Design fidelity notes

- All color, type, button, input, badge, and notice styling is transcribed from
  the CCS Component Library CVC skin. The unified accent blue is **#1953A8**
  (the CVC `c_btn_primary_bg` / `c_link` / `c_footer_bg` token). The older
  `#006…` blue that appeared on some flow frames is the *Texas* skin and was not
  used — see UNIFICATION-NOTES.md.
- Type is Montserrat throughout, per the library.
- The program banner is a placeholder (you mentioned the original was
  AI-generated). Swap the `.banner-img` block in `program-detail.html` and
  `add-program-3.html` for an `<img>` if you want a specific image.
