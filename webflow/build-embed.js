#!/usr/bin/env node
/* Assembles webflow/gap-chart-embed.html — the single copy-paste snippet
 * for a Webflow Embed element — from gap-chart.js. Re-run after editing
 * gap-chart.js:  node webflow/build-embed.js
 */
const fs = require('fs');
const path = require('path');

const dir = __dirname;

// Light, safe compaction to fit Webflow's 10,000-char embed limit: drop the
// leading block comment, full-line // comments, blank lines, and indentation.
// (Only full-line comments are stripped, so string contents like "http://"
// are never touched.)
const js = fs.readFileSync(path.join(dir, 'gap-chart.js'), 'utf8')
  .replace(/^\/\*[\s\S]*?\*\/\s*/, '')
  .split('\n')
  .filter(l => !/^\s*\/\//.test(l) && l.trim() !== '')
  .map(l => l.trim())
  .join('\n')
  .trim();

const html = `<!-- Capability-gap chart. Paste this whole block into a Webflow
     Embed element. Attributes on <gap-chart> override the label text;
     see webflow/README.md in the repo for colors + options.
     If you prefer a plain image, use gap-chart.svg / gap-chart.png instead. -->
<gap-chart></gap-chart>
<script>
${js}
</script>
`;

const out = path.join(dir, 'gap-chart-embed.html');
fs.writeFileSync(out, html);
console.log(`${out}: ${html.length} chars (Webflow embed limit: 10,000)`);
