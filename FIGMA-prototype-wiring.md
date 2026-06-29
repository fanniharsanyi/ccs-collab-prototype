# Figma prototype wiring — Proto_SuperAdmin

How to wire the same happy path inside Figma, so the presenter has a second link
(Figma share) alongside the web one. All nodes are in the `Proto_SuperAdmin`
section of the Collaboratives file.

Use **prototype mode** → select the trigger element → drag the arrow to the
destination frame. Unless noted, use: On click → Navigate to → Instant (or
Smart Animate / Move in for the wizard steps, your call).

## Screen → node reference

| Step | Screen | Node id |
|---|---|---|
| 1 | Administrator Dashboard | `838:34100` |
| 2 | Regional Collaboratives (list) | `838:33832` |
| 3 | Create Collaborative · Basic Information | `838:33471` |
| 4 | Create Collaborative · Institution Partners | `838:33573` |
| 5 | Collaborative detail — Program tab (Draft) | `838:31962` |
| 5 | Collaborative detail — Admin tab | `838:32985` |
| 6 | Add Program · Access & Guidance (step 2) | `838:34534` |
| 7 | Program detail — Registered Nursing (empty reqs) | `838:31480` |
| 7 | Program detail — populated reqs | `838:34234` |
| 8 | Add Requirement | `838:34440` |
| 9 | Invite Campus Administrators | `838:31789` |

(There are additional detail-page state variants among the `Wrapper - Desktop
(IMSG)` frames `838:32303 / 32644 / 33228` — use them if you want distinct
before/after-publish or tab states.)

## Connections to draw

1. **Dashboard → Collaboratives list**
   Trigger: the "Collaborative" link (under Equivalencies Management) on `838:34100`
   → `838:33832`.

2. **Collaboratives list → Create wizard step 1**
   Trigger: "Create Collaborative" button on `838:33832` → `838:33471`.

3. **Wizard step 1 → step 2**
   "Next" on `838:33471` → `838:33573`.  ("Back"/"Cancel" → `838:33832`.)

4. **Wizard step 2 → Detail hub**
   "Create" on `838:33573` → `838:31962` (Program tab).  ("Back" → `838:33471`.)

5. **Detail hub tab switch** (the branch point)
   On `838:31962`: the "Admin" tab → `838:32985`.
   On `838:32985`: the "Program" tab → `838:31962`.
   This gives the presenter either-order access to the two sub-flows.

6a. **Program tab → Add Program**
   "Add Program" on `838:31962` → `838:34534` (then wire any earlier Add Program
   step you have to it; in the file the visible step is Access & Guidance).
   Add Program final action → `838:31480` (program detail, empty reqs).

7. **Program detail → Add Requirement**
   "Add requirement" on `838:31480` → `838:34440`.

8. **Add Requirement → populated program detail**
   "Save" on `838:34440` → `838:34234` (program detail with requirements shown).

9. **Populated program → publish back to hub**
   "Publish" on `838:34234` → `838:32985` (detail, Admin tab) — or back to
   `838:31962`, whichever reads better as the payoff.

6b. **Admin tab → Invite Admins**
   "Invite Campus Admin" on `838:32985` → `838:31789`.
   "Invite" on `838:31789` → back to `838:32985`.

## Tips for a clean demo

- Set the starting frame (flow start point) on the Dashboard `838:34100`.
- For the wizard steps, "Move in" right-to-left reads as forward progress;
  "Move out" for Back.
- Add an overlay (not a navigate) for the three-dot row menus if you want them
  to feel live; otherwise leave them static.
- Share with "Anyone with the link can view," set to **Prototype** present mode,
  and copy the share URL. That's the second link for the presenter.
