<!-- Tool Icons Collection - Add this to main.js or separate file -->

const TOOL_ICONS = {
  'json-formatter': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9h18v12H3zm2 2v8m14-8v8M3 6l9-4 9 4m-14 0h18"/></svg>`,
  'qr-code': `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="8" height="8" fill="currentColor"/><rect x="14" y="2" width="8" height="8" fill="currentColor"/><rect x="2" y="14" width="8" height="8" fill="currentColor"/><rect x="6" y="6" width="2" height="2" fill="white"/><rect x="18" y="6" width="2" height="2" fill="white"/><rect x="6" y="18" width="2" height="2" fill="white"/><circle cx="18" cy="18" r="3" fill="currentColor" stroke="white" stroke-width="1"/></svg>`,
  'password-generator': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/><circle cx="12" cy="15" r="1"/><circle cx="8" cy="15" r="1"/><circle cx="16" cy="15" r="1"/></svg>`,
  'base64': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 4h18v16H3z"/><text x="6" y="14" font-size="6" font-weight="bold">B64</text></svg>`,
  'image-compressor': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M21 15l-5-5L5 21"/></svg>`,
  'word-counter': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948-.684l1.498-4.493a1 1 0 011.896 0l1.498 4.493a1 1 0 00.948.684H19a2 2 0 012 2v2M3 9h18M3 12h18M3 15h18M3 18h18"/></svg>`,
  'currency-converter': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 6v12M15 9h-6a3 3 0 000 6h6a3 3 0 000-6z"/></svg>`,
  'unit-converter': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 18h18M6 9v6M12 9v6M18 9v6M3 6v12a2 2 0 002 2h14a2 2 0 002-2V6"/></svg>`,
  'html-minifier': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 4 7 6"></polyline><polyline points="17 6 19 4 21 6"></polyline><line x1="12" y1="4" x2="12" y2="20"/><path d="M3 12h18"/></svg>`,
  'box-shadow': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="6" width="12" height="12" rx="1"/><rect x="8" y="8" width="8" height="8" rx="1" fill="currentColor" opacity="0.3"/></svg>`,
  'pomodoro': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 3"/><circle cx="12" cy="2" r="1" fill="currentColor"/></svg>`,
  'text-to-speech': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 14c3.314 0 6-2.686 6-6v-6c0-3.314-2.686-6-6-6S6 2.686 6 6v6c0 3.314 2.686 6 6 6z"/><path d="M6 20c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z" fill="currentColor" opacity="0.5"/></svg>`,
  'images-to-pdf': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M10 9H6"/><path d="M18 15a3 3 0 11-6 0 3 3 0 016 0z" fill="currentColor" opacity="0.3"/></svg>`
};

// Add icons to tool cards dynamically
document.querySelectorAll('[data-tags]').forEach(card => {
  const toolName = card.querySelector('h3')?.textContent.toLowerCase().replace(/\s+/g, '-') || '';
  const icon = TOOL_ICONS[toolName];
  if (icon) {
    const iconEl = document.createElement('div');
    iconEl.innerHTML = icon;
    iconEl.style.cssText = 'width:48px;height:48px;margin:0 auto 15px;color:var(--accent);display:flex;align-items:center;justify-content:center;';
    card.insertBefore(iconEl, card.firstChild);
  }
});

export { TOOL_ICONS };
