import assert from 'node:assert/strict';
import test from 'node:test';
import { locales } from '../src/i18n/config.ts';
import {
  getShowcaseCategoryBySlug,
  getShowcaseCategorySlug,
  getShowcaseCategorySeo,
  getShowcaseRecencySeo,
  showcaseCategoryDefinitions,
  showcaseRouteSlugs,
} from '../src/i18n/showcase.ts';

test('showcase categories have stable, unique routes', () => {
  assert.equal(showcaseCategoryDefinitions.length, 10);
  assert.equal(new Set(showcaseCategoryDefinitions.map(({ slug }) => slug)).size, 10);

  for (const category of showcaseCategoryDefinitions) {
    assert.deepEqual(getShowcaseCategoryBySlug(category.slug), category);
  }
});

test('showcase route slugs map to the canonical source categories', () => {
  assert.deepEqual(
    showcaseCategoryDefinitions.map(({ slug, sourceCategory }) => [slug, sourceCategory]),
    [
      ['games', 'Games & real time'],
      ['productivity', 'Tools & apps'],
      ['content-marketing', 'Content & growth'],
      ['data-analysis', 'Research & data'],
      ['development', 'Dev tools'],
      ['automation', 'Agents & browsers'],
      ['task-routing', 'Triage & routing'],
      ['security-review', 'Safety & moderation'],
      ['financial-trading', 'Trading & markets'],
      ['hardware', 'Robotics & devices'],
    ],
  );

  assert.equal(getShowcaseCategorySlug('Tools & apps'), 'productivity');
  assert.equal(getShowcaseCategorySlug('Games & real time'), 'games');
});

test('showcase recency pages have localized titles and descriptions with counts', () => {
  for (const locale of locales) {
    const today = getShowcaseRecencySeo(locale, 'today', 3);
    const thisWeek = getShowcaseRecencySeo(locale, 'this-week', 8);

    assert.match(today.title, /3/);
    assert.match(today.description, /3/);
    assert.match(thisWeek.title, /8/);
    assert.match(thisWeek.description, /8/);
    assert.notEqual(today.title, thisWeek.title);
    assert.notEqual(today.description, thisWeek.description);
  }
});

test('showcase exposes standalone recency and category routes', () => {
  assert.deepEqual(showcaseRouteSlugs.slice(0, 2), ['today', 'this-week']);
  assert.equal(showcaseRouteSlugs.length, showcaseCategoryDefinitions.length + 2);
  assert.ok(showcaseRouteSlugs.includes('productivity'));
});

test('every locale and category has distinct SEO copy with count and environment', () => {
  for (const locale of locales) {
    const titles = new Set();
    const descriptions = new Set();

    for (const category of showcaseCategoryDefinitions) {
      const count = 7;
      const seo = getShowcaseCategorySeo(locale, category.id, count);

      assert.match(seo.title, /7/);
      assert.match(seo.description, /7/);
      assert.ok(seo.description.includes(seo.environment));
      assert.ok(seo.heroTitle.includes(seo.name));
      titles.add(seo.title);
      descriptions.add(seo.description);
    }

    assert.equal(titles.size, showcaseCategoryDefinitions.length);
    assert.equal(descriptions.size, showcaseCategoryDefinitions.length);
  }
});
