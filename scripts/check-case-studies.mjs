import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const slugs = ['speiz', 'ai-video-research', 'aml', 'pasaka', 'ai-car-damage', 'tukada'];
const studies = slugs.map(slug => JSON.parse(readFileSync(`content/case-studies/${slug}.json`, 'utf8')));
const types = new Set(['text','list','heading','image','image-pair','image-text','gallery']);
let images = 0;
function checkImage(image) {
  assert(image.src.startsWith('/work/'));
  assert(existsSync(`public${image.src}`), `Missing ${image.src}`);
  assert(image.width > 0 && image.height > 0 && image.alt.trim());
  images++;
}
for (const study of studies) {
  assert(study.title && study.headline && study.source);
  assert.equal(new Set(study.sections.map(section => section.id)).size, study.sections.length);
  assert(slugs.includes(study.nextProject), `Broken next project: ${study.slug}`);
  checkImage(study.heroImage);
  for (const section of study.sections) {
    assert(section.title && section.blocks.length);
    for (const block of section.blocks) {
      assert(types.has(block.type));
      if (block.image) checkImage(block.image);
      block.images?.forEach(checkImage);
      block.paragraphs?.forEach(text => assert(text.trim() && !text.includes('X-Amz-')));
    }
  }
  // All substantive source text must survive migration, independent of block formatting.
  let source = readFileSync(`content/case-studies/sources/${study.slug}.md`, 'utf8');
  const normalize = text => text.replace(/\\([<>~|])/g,'$1').replace(/\*\*/g,'').replace(/\s+/g,' ').trim();
  const migrated = normalize(JSON.stringify(study).replace(/\\n/g,' '));
  source = source.replace(/^Source:.*\n/,'').replace(/<br\s*\/?\s*>/g,'\n').replace(/<[^>]*>/g,'');
  for (const line of source.split('\n').map(normalize)) {
    if (!line || line === '---' || line.includes('[Source image]') || /^(#+ )?Contents$/.test(line)) continue;
    const content = line.replace(/^#+\s*/, '').replace(/^-\s*/, '');
    assert(migrated.includes(content.replace(/"/g,'\\"')), `Source text missing in ${study.slug}: ${content}`);
  }
}
assert.equal(images,79);
assert(!studies.find(study => study.slug === 'speiz').sections.some(section => /results|outcome/i.test(section.title)));
assert(studies.find(study => study.slug === 'aml').sections.some(section => section.title === 'Results'));
console.log(`Verified ${studies.length} case studies, ${images} image references, source text fidelity, optional outcomes, and next-project destinations.`);

await import('./check-editorial-case-studies.mjs');
