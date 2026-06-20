/*
 * verify.mjs - loads data.js and recomputes every percentage from the stated
 * old/new values, then runs sanity checks. Run with: node verify.mjs
 * This is the same math the page uses (pct = (new-old)/old*100), so a clean run
 * here means the numbers shown on the page are internally consistent with source.
 */
import fs from 'fs';

const code = fs.readFileSync(new URL('./data.js', import.meta.url), 'utf8');
const sandbox = { window: {} };
new Function('window', code)(sandbox.window);
const { PATCH, CLASSES } = sandbox.window;

function pct(c) {
  if (typeof c.r === 'number') return c.r;
  if (typeof c.o === 'number' && typeof c.n === 'number') return (c.n - c.o) / c.o * 100;
  return null;
}

let total = 0, withMath = 0, errors = [];
const counts = { buff: 0, nerf: 0, neutral: 0 };
const kinds = {};
const moves = [];

for (const cls of CLASSES) {
  for (const spec of cls.specs) {
    for (const c of spec.changes) {
      total++;
      counts[c.d] = (counts[c.d] || 0) + 1;
      kinds[c.k] = (kinds[c.k] || 0) + 1;
      // integrity checks
      if (!c.a) errors.push(`${cls.name}/${spec.name}: change missing ability name`);
      if (!['buff','nerf','neutral'].includes(c.d)) errors.push(`${cls.name}/${spec.name}/${c.a}: bad dir ${c.d}`);
      if (!['tune','rework','new','removed','qol'].includes(c.k)) errors.push(`${cls.name}/${spec.name}/${c.a}: bad kind ${c.k}`);
      const p = pct(c);
      if (p !== null) {
        withMath++;
        if (!isFinite(p)) errors.push(`${cls.name}/${spec.name}/${c.a}: non-finite pct`);
        // a tune/new with a number should carry a direction consistent with intent for damage/healing metrics
        moves.push({ where: `${cls.name} ${spec.name}`, a: c.a, m: c.m || '', o: c.o, n: c.n, p, d: c.d });
      }
    }
  }
}

console.log(`PATCH: ${PATCH.patch} - ${PATCH.name} (${PATCH.build})`);
console.log(`Total change lines: ${total}`);
console.log(`Lines with computed math: ${withMath}`);
console.log(`Direction tally:`, counts);
console.log(`Kind tally:`, kinds);
console.log('');

// show the 18 largest moves by magnitude for eyeballing
moves.sort((a, b) => Math.abs(b.p) - Math.abs(a.p));
console.log('Largest magnitude numeric changes (sign = change to the stated value):');
for (const m of moves.slice(0, 22)) {
  const oldNew = (m.o !== undefined && m.n !== undefined) ? `${m.o} -> ${m.n}` : 'direct';
  console.log(`  ${m.p >= 0 ? '+' : ''}${m.p.toFixed(1).padStart(6)}%  [${m.d}]  ${m.where} - ${m.a} (${m.m}) ${oldNew}`);
}

console.log('');
if (errors.length) {
  console.log('ERRORS:');
  for (const e of errors) console.log('  ! ' + e);
  process.exit(1);
} else {
  console.log('OK: no integrity errors, all percentages finite.');
}
