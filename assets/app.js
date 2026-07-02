/* Shared chrome + nav for the CCS CVC prototype.
   Each screen is a standalone HTML file; this injects the
   common top bar, breadcrumb strip, and footer, and provides
   a tiny toast helper for the happy-path transitions. */

const NAV_ITEMS = ['Settings', 'Course Management', 'Enrollment Management', 'Course Search Reports'];

function chromeTop(crumbs, opts = {}) {
  const account = opts.admin
    ? `<span class="crumbs"><a href="dashboard.html">Admin</a> <span class="sep">›</span></span>`
    : '';
  const navButtons = NAV_ITEMS.map(n => `<button>${n}<span class="caret"></span></button>`).join('');
  const crumbHtml = crumbs.map((c, i) => {
    const sep = i < crumbs.length - 1 ? ' <span class="sep">›</span> ' : '';
    return c.href ? `<a href="${c.href}">${c.label}</a>${sep}` : `<span>${c.label}</span>${sep}`;
  }).join('');

  return `
  <header class="topbar">
    <div class="topbar-inner">
      <span class="brand"><img src="assets/header-logo.svg" alt="California Community Colleges"></span>
      <nav>${navButtons}</nav>
    </div>
  </header>
  <div class="subbar">
    <div class="subbar-inner">
      <div class="crumbs">${crumbHtml}</div>
      <div class="account">
        <button><span class="ico"><svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.42 0-8 2.24-8 5v3h16v-3c0-2.76-3.58-5-8-5z"/></svg></span> Profile</button>
        <button><span class="ico"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg></span> Log Out</button>
      </div>
    </div>
  </div>`;
}

function chromeFooter() {
  return `
  <footer class="footer">
    <div class="footer-inner">
      <img src="assets/footer-logo.svg" alt="Quottly">
      <span class="footer-copy">&copy; 2026 Quottly, Inc. All rights reserved.</span>
    </div>
  </footer>`;
}

function mountChrome(crumbs, opts) {
  const host = document.getElementById('app');
  host.insertAdjacentHTML('afterbegin', chromeTop(crumbs, opts));
  host.insertAdjacentHTML('beforeend', chromeFooter());
}

/* toast that fires once on the next page after an action */
function flashToast(msg) { sessionStorage.setItem('ccs_toast', msg); }
function showPendingToast() {
  const msg = sessionStorage.getItem('ccs_toast');
  if (!msg) return;
  sessionStorage.removeItem('ccs_toast');
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2600);
}

function go(url) { window.location.href = url; }

/* ---- Custom checkbox markup (amber checked, per CCS spec) ---- */
function checkbox(labelHtml, {checked=false, sm=false, name=''}={}) {
  const check = `<svg viewBox="0 0 12 12" fill="none"><path d="M1 6l3.5 3.5L11 2.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  return `<label class="ccs-check ${sm?'sm':''}">
    <input type="checkbox" ${checked?'checked':''} ${name?`data-name="${name}"`:''}>
    <span class="box">${check}</span>
    <span class="lbl">${labelHtml}</span>
  </label>`;
}

/* ---- Toggle switch markup (blue track when on, per CCS spec) ---- */
function switchToggle(labelHtml, {checked=false}={}) {
  return `<label class="switch-row">
    <span class="switch"><input type="checkbox" ${checked?'checked':''}><span class="track"><span class="thumb"></span></span></span>
    <span class="switch-lbl">${labelHtml}</span>
  </label>`;
}

/* ---- Confirmation modal ---- */
function confirmModal({header='Confirm', title, body, confirmLabel='Confirm', cancelLabel='Cancel', onConfirm}) {
  const ov = document.createElement('div');
  ov.className = 'modal-overlay';
  ov.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="m-t">
    <div class="modal-head"><h3 id="m-t">${header}</h3><button class="modal-close" data-x="cancel" aria-label="Close">&times;</button></div>
    <div class="modal-body">
      <span class="modal-warn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span>
      <div><p class="modal-q">${title}</p><p class="modal-detail">${body}</p></div>
    </div>
    <div class="modal-actions">
      <button class="btn btn-outline btn-md" data-x="cancel">${cancelLabel}</button>
      <button class="btn btn-primary btn-md" data-x="ok">${confirmLabel}</button>
    </div></div>`;
  document.body.appendChild(ov);
  requestAnimationFrame(()=>ov.classList.add('show'));
  const close = ()=>{ ov.classList.remove('show'); setTimeout(()=>ov.remove(),200); };
  ov.querySelector('[data-x=cancel]').onclick = close;
  ov.addEventListener('click', e=>{ if(e.target===ov) close(); });
  document.addEventListener('keydown', function esc(e){ if(e.key==='Escape'){ close(); document.removeEventListener('keydown',esc);} });
  ov.querySelector('[data-x=ok]').onclick = ()=>{ close(); onConfirm && onConfirm(); };
  ov.querySelector('[data-x=ok]').focus();
}

/* ---- Drag-and-drop reorder for a .priority-list ---- */
function makeReorderable(listEl) {
  let dragEl = null;
  function refreshDisabled() {
    const rows = [...listEl.querySelectorAll('.priority-row')];
    rows.forEach((r,i)=>{
      const up = r.querySelector('[data-m=up]'), dn = r.querySelector('[data-m=down]');
      if (up) up.disabled = i===0;
      if (dn) dn.disabled = i===rows.length-1;
    });
  }
  listEl.querySelectorAll('.priority-row').forEach(row=>{
    row.setAttribute('draggable','true');
    row.addEventListener('dragstart',()=>{ dragEl=row; row.classList.add('dragging'); });
    row.addEventListener('dragend',()=>{ row.classList.remove('dragging'); listEl.querySelectorAll('.priority-row').forEach(r=>r.classList.remove('drop-target')); refreshDisabled(); });
    row.addEventListener('dragover',e=>{ e.preventDefault(); if(row!==dragEl) row.classList.add('drop-target'); });
    row.addEventListener('dragleave',()=>row.classList.remove('drop-target'));
    row.addEventListener('drop',e=>{
      e.preventDefault(); row.classList.remove('drop-target');
      if(!dragEl||dragEl===row) return;
      const rows=[...listEl.querySelectorAll('.priority-row')];
      if(rows.indexOf(dragEl) < rows.indexOf(row)) row.after(dragEl); else row.before(dragEl);
      refreshDisabled();
    });
  });
  // arrow buttons
  listEl.addEventListener('click',e=>{
    const b=e.target.closest('[data-m]'); if(!b) return;
    const row=b.closest('.priority-row');
    if(b.dataset.m==='up' && row.previousElementSibling) row.previousElementSibling.before(row);
    if(b.dataset.m==='down' && row.nextElementSibling) row.nextElementSibling.after(row);
    refreshDisabled();
  });
  refreshDisabled();
}

document.addEventListener('DOMContentLoaded', showPendingToast);

/* Empty-state preview: append ?empty=1 to a list page to show its empty
   states instead of the seeded rows. Hides every [data-list] and reveals
   every [data-empty] on the page. (JS-rendered lists honor ?empty on their own.) */
function applyEmptyPreview() {
  if (!/[?&]empty=/.test(location.search)) return;
  document.querySelectorAll('[data-list]').forEach(function (el) { el.classList.add('hide'); });
  document.querySelectorAll('[data-empty]').forEach(function (el) { el.classList.remove('hide'); });
}
document.addEventListener('DOMContentLoaded', applyEmptyPreview);
