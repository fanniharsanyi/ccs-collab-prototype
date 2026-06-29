# Unification notes

You asked for one unified experience, pixel-faithful but corrected where the
flow was inconsistent — and to flag changes rather than make them silently.
Here's what was unified and what's flagged for your call.

## Unified (applied)

1. **Accent blue → #1953A8 everywhere.** Some flow frames were drawn with an
   older blue (`#006…`). Per the CCS Component Library, the CVC skin's
   `c_btn_primary_bg`, `c_link`, `c_header_primary_text`, and `c_footer_bg` are
   all **#1953A8**; the `#006D8F` blue belongs to the *Texas* skin. Everything
   (buttons, links, footer, header text, focus rings, active tab) uses #1953A8.

2. **Footer logo.** The flow mixed two footer lockups — a "Quottly" wordmark on
   some screens and a "Cross Enrollment" lockup on others. Per your "one unified
   experience" instruction, the footer uses your uploaded Quottly mark on every
   screen. → If you'd rather match each original screen's footer exactly, say so
   and I'll restore both.

3. **Footer color.** Standardized to the CVC `c_footer_bg` (#1953A8) on all
   screens, rather than the dark slate footer that appeared on a couple of
   frames.

4. **Form borders & placeholders.** Inputs/selects use Gray/600 `#757575`
   borders and Gray/700 `#616161` placeholders — the corrected, AA-passing
   values from the component handoff (the library notes the old `#999` border
   and `#757575` placeholder failed contrast).

5. **Checkbox accent.** Amber `#FFB000` (`c_form_highlight`) for checked boxes,
   per the Checkbox spec.

6. **Status notice (publish blocker).** The program-detail "must add
   Requirements to publish" uses the documented Error status-notice styling
   (translucent red fill, Red/600 border, underlined inline link).

## Flagged for your decision

- **Footer logo** (see #2) — confirm single Quottly mark vs. per-screen match.
- **Banner image** — placeholder gradient stands in for the AI-generated
  banner. Drop in any image when ready (one line per file).
- **Dates** — normalized to a 2026 timeline for a current-feeling demo
  (created/published "06.2026"). Adjust if the demo needs specific dates.

## Known design-system gaps (carried over, not invented)

The library's own dev-handoff docs flag several open items (focus-ring token
reuse, icon-only button accessible names, Notice icon contrast on Info/Warning).
The prototype reproduces the *designed* appearance and doesn't try to fix these
underlying system gaps — they're noted here only so nothing looks like an
accidental deviation.
