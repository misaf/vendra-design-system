// Search text (components/utils/commerce.js): Persian typed any way finds what is indexed.
import assert from 'node:assert/strict';
import {commerce} from '../../../packages/design-system/components/utils/commerce.js';
import {VF_PRODUCTS, vfSearchProducts} from '../shared/domain/catalog.js';
import {VF_POSTS} from '../shared/translations/journal-content.js';

const {normalizeSearchText, searchIndex, matchesSearch} = commerce;
const finds = (text, query) => matchesSearch(searchIndex(text), query);

// Arabic letters as their Persian forms.
assert.equal(normalizeSearchText('باكس گل'), 'باکس گل', 'Arabic ك → ک');
assert.equal(normalizeSearchText('هديه'), 'هدیه', 'Arabic ي → ی');
assert.equal(normalizeSearchText('مصطفى'), 'مصطفی', 'ى → ی');
assert.equal(normalizeSearchText('هدية'), 'هدیه', 'ة → ه');
assert.equal(normalizeSearchText('هدیۀ'), 'هدیه', 'ۀ → ه');
assert.equal(normalizeSearchText('أرکیده إ آ'), 'ارکیده ا ا', 'hamza and madda forms of alef → ا');
assert.equal(normalizeSearchText('مؤسسه'), 'موسسه', 'ؤ → و');
// Half-spaces and zero-width characters are spaces; spaces collapse.
assert.equal(normalizeSearchText('دسته‌گل'), 'دسته گل', 'ZWNJ → space');
assert.equal(normalizeSearchText(' گل​‍  رز﻿ '), 'گل رز', 'zero-width → space');
// Diacritics and stretching are dropped.
assert.equal(normalizeSearchText('گُلِ سُرخ'), 'گل سرخ', 'diacritics');
assert.equal(normalizeSearchText('گــــل'), 'گل', 'stretching (ـ)');
assert.equal(normalizeSearchText('مُحَمَّد'), 'محمد', 'shadda and fatha');
// Persian and Arabic digits are Latin; Latin text is lower case; punctuation separates words.
assert.equal(normalizeSearchText('۱۲ و ١٢ و 12'), '12 و 12 و 12');
assert.equal(normalizeSearchText('Red ROSES, white.'), 'red roses white');
assert.equal(normalizeSearchText('گل، رز؛ لیلیوم؟'), 'گل رز لیلیوم');
assert.equal(normalizeSearchText(null), '');

// Every row of the problem: typed → indexed.
assert.ok(finds('باکس گل', 'باكس گل'), 'Arabic keyboard ک');
assert.ok(finds('هدیه تولد', 'هديه'), 'Arabic keyboard ی');
assert.ok(finds('دسته‌گل', 'دسته گل'), 'space for a half-space');
assert.ok(finds('دسته‌گل', 'دستهگل'), 'joined for a half-space');
assert.ok(finds('دسته گل', 'دسته‌گل'), 'half-space for a space');
assert.ok(finds('باکس گل', 'گل باکس'), 'any word order');
assert.ok(finds('گل سرخ', 'گُلِ سُــرخ'), 'diacritics and stretching typed');
assert.ok(finds('۱۲ شاخه رز', '12 شاخه'), 'Latin digits find Persian');
assert.ok(finds('12 شاخه رز', '١٢'), 'Arabic digits find Latin');
assert.ok(finds('Red roses', 'ROSES red'), 'Latin case and order');
// Every word must be there; an empty query finds nothing.
assert.ok(!finds('باکس گل', 'باکس ارکیده'), 'a missing word');
assert.ok(!finds('باکس گل', '   '), 'blank query');
assert.ok(!finds('باکس گل', '،؛'), 'punctuation-only query');

// Product search: each Persian way of typing a category finds the same products.
const ids = query => vfSearchProducts(query).map(product => product.id);
const boxes = ids('باکس گل');
assert.ok(boxes.length > 0, 'flower boxes are found');
assert.deepEqual(ids('باكس گل'), boxes, 'Arabic ك');
assert.deepEqual(ids('گل باکس'), boxes, 'word order');
assert.deepEqual(ids('باکـــس  گُل'), boxes, 'stretching, diacritics, extra spaces');
const bouquets = ids('دسته‌گل');
assert.ok(bouquets.length > 0, 'bouquets are found');
assert.deepEqual(ids('دسته گل'), bouquets, 'space for a half-space');
assert.deepEqual(ids('دستهگل'), bouquets, 'joined');
assert.deepEqual(ids('FLOWER box'), ids('box flower'), 'English in any order and case');
assert.deepEqual(vfSearchProducts('  '), [], 'blank query finds nothing');
// A code still finds its product, typed with Persian digits or dashes.
const product = VF_PRODUCTS[0];
const persianCode = product.id.replace(/\d/g, digit => '۰۱۲۳۴۵۶۷۸۹'[digit]).toLowerCase();
assert.ok(ids(persianCode).includes(product.id), 'code with Persian digits');

// Journal posts are indexed the same way: the Persian title with a space for its half-space.
const autumn = VF_POSTS.find(post => post.id === 'autumn');
const autumnIndex = searchIndex(autumn.fa.join(' '));
assert.ok(matchesSearch(autumnIndex, 'گلهای پاییز'), 'joined half-space, words skipped');
assert.ok(matchesSearch(autumnIndex, 'پاييز گل ها'), 'Arabic ي, any order');
assert.ok(matchesSearch(autumnIndex, '۵ دقیقه'), 'digits');

console.log('search tests passed');
