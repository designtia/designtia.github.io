import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const study = JSON.parse(readFileSync('content/case-studies/speiz-editorial.json', 'utf8'));
const sections = study.sections.flatMap(section => [section, ...(section.children ?? [])]);
const ids = ['overview', ...sections.map(section => section.id)];
assert.equal(new Set(ids).size, ids.length, 'Section anchors must be unique');
assert.equal(study.sections.length, 7);
assert.equal(study.sections.find(section => section.id === 'final-solution').children.length, 5);
const references = [study.heroMedia, ...study.gallery.media];
for (const section of sections) {
  assert(section.nav && section.label);
  for (const block of section.blocks ?? []) {
    if (typeof block.media === 'string') references.push(block.media);
    if (Array.isArray(block.media)) references.push(...block.media);
    if (block.stages) references.push(...block.stages.map(stage => stage.media));
  }
}
for (const id of references) assert(study.media[id], 'Missing media: ' + id);
for (const media of Object.values(study.media)) {
  assert(media.title && media.variant);
  if (media.image) {
    assert(media.image.alt && media.image.width > 0 && media.image.height > 0);
    assert(existsSync('public' + media.image.src), 'Missing replacement screenshot');
  }
}
assert(existsSync('content/case-studies/' + study.nextProject.slug + '.json'));
console.log('Editorial Speiz: 13 section anchors, all media references and next-project target valid.');
