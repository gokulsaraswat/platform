const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lum = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => lin(v / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

/** [foreground, background, minimum] pairs the v2 components rely on (WCAG 2.2: 4.5 text, 3 non-text). */
export const pairs = [
  ['text', 'bg', 4.5], ['text', 'surface', 4.5], ['text', 'sunken', 4.5], ['on-highlight', 'highlight', 4.5],
  ['text-muted', 'bg', 4.5], ['text-muted', 'surface', 4.5], ['text-muted', 'sunken', 4.5],
  ['text-subtle', 'bg', 4.5], ['text-subtle', 'surface', 4.5],
  ['accent', 'bg', 4.5], ['accent', 'surface', 4.5],
  ['on-accent', 'accent', 4.5], ['on-accent', 'accent-hover', 4.5], ['on-accent-subtle', 'accent-subtle', 4.5],
  ['danger', 'surface', 4.5], ['danger', 'danger-subtle', 4.5], ['on-danger', 'danger', 4.5],
  ['success', 'surface', 4.5], ['success', 'success-subtle', 4.5],
  ['warning', 'surface', 4.5], ['warning', 'warning-subtle', 4.5],
  ['info', 'surface', 4.5], ['info', 'info-subtle', 4.5],
  ['border-strong', 'surface', 3], ['border-strong', 'bg', 3], ['focus', 'bg', 3], ['focus', 'surface', 3],
];

export function audit(flavors) {
  const rows = [];
  for (const [name, f] of Object.entries(flavors)) {
    for (const mode of ['light', 'dark']) {
      for (const [fg, bg, min] of pairs) {
        const r = ratio(f[mode][fg], f[mode][bg]);
        rows.push({ flavor: name, mode, fg, bg, min, ratio: Math.round(r * 100) / 100, ok: r >= min });
      }
    }
  }
  return rows;
}

if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}` || process.argv[1]?.endsWith('contrast.mjs')) {
  const { readFileSync } = await import('node:fs');
  const src = JSON.parse(readFileSync(new URL('../src/v2/flavors.json', import.meta.url), 'utf8'));
  const rows = audit(src.flavors);
  const bad = rows.filter((r) => !r.ok);
  for (const r of bad) console.log(`FAIL ${r.flavor}/${r.mode} ${r.fg} on ${r.bg}: ${r.ratio} < ${r.min}`);
  const low = rows.filter((r) => r.ok).sort((a, b) => a.ratio / a.min - b.ratio / b.min).slice(0, 6);
  console.log(`checked ${rows.length} pairs, ${bad.length} failing; tightest passing:`);
  for (const r of low) console.log(`  ${r.flavor}/${r.mode} ${r.fg} on ${r.bg}: ${r.ratio} (min ${r.min})`);
  process.exitCode = bad.length ? 1 : 0;
}
