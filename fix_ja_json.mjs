/**
 * Deep-merges all duplicate top-level keys in ja.json, then rewrites the file.
 * Strategy: extract each top-level block as a raw JSON snippet, parse it,
 * and merge all occurrences of the same key (later keys win on conflict).
 */
import { readFileSync, writeFileSync } from 'fs';

const filePath = './src/locales/ja.json';
const raw = readFileSync(filePath, 'utf8');

// Extract all top-level key→object pairs in ORDER (preserving first occurrence position)
// We walk char-by-char to handle nesting correctly.
function extractTopLevelBlocks(jsonStr) {
  // Skip opening {
  let i = 0;
  while (jsonStr[i] !== '{') i++;
  i++; // past {

  const blocks = []; // [{key, value}]
  const seenKeys = new Set();
  const mergedOrder = []; // keys in first-appearance order

  function skipWhitespace() {
    while (i < jsonStr.length && /\s/.test(jsonStr[i])) i++;
  }

  function readString() {
    // We are at the opening "
    i++; // skip "
    let s = '';
    while (i < jsonStr.length) {
      if (jsonStr[i] === '\\') {
        s += jsonStr[i] + jsonStr[i + 1];
        i += 2;
      } else if (jsonStr[i] === '"') {
        i++; // skip closing "
        break;
      } else {
        s += jsonStr[i++];
      }
    }
    return s;
  }

  function readValue() {
    skipWhitespace();
    const ch = jsonStr[i];
    if (ch === '{') {
      return readObject();
    } else if (ch === '[') {
      return readArray();
    } else if (ch === '"') {
      return readString();
    } else {
      // number, bool, null
      let val = '';
      while (i < jsonStr.length && !/[,}\]]\s*/.test(jsonStr[i]) || (val === '' && jsonStr[i] === '-')) {
        val += jsonStr[i++];
      }
      return JSON.parse(val.trim());
    }
  }

  function readObject() {
    i++; // skip {
    const obj = {};
    skipWhitespace();
    while (i < jsonStr.length && jsonStr[i] !== '}') {
      skipWhitespace();
      if (jsonStr[i] === '"') {
        const key = readString();
        skipWhitespace();
        i++; // skip :
        skipWhitespace();
        const val = readValue();
        obj[key] = val;
        skipWhitespace();
        if (jsonStr[i] === ',') i++;
        skipWhitespace();
      } else {
        break;
      }
    }
    i++; // skip }
    return obj;
  }

  function readArray() {
    i++; // skip [
    const arr = [];
    skipWhitespace();
    while (i < jsonStr.length && jsonStr[i] !== ']') {
      skipWhitespace();
      if (jsonStr[i] !== ']') {
        arr.push(readValue());
        skipWhitespace();
        if (jsonStr[i] === ',') i++;
        skipWhitespace();
      }
    }
    i++; // skip ]
    return arr;
  }

  // Root object
  skipWhitespace();
  while (i < jsonStr.length && jsonStr[i] !== '}') {
    skipWhitespace();
    if (jsonStr[i] === '"') {
      const key = readString();
      skipWhitespace();
      i++; // skip :
      skipWhitespace();
      const val = readValue();
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        mergedOrder.push(key);
        blocks.push({ key, values: [val] });
      } else {
        const existing = blocks.find(b => b.key === key);
        existing.values.push(val);
      }
      skipWhitespace();
      if (jsonStr[i] === ',') i++;
      skipWhitespace();
    } else {
      break;
    }
  }

  return blocks;
}

function deepMerge(target, source) {
  const out = { ...target };
  for (const [k, v] of Object.entries(source)) {
    if (v && typeof v === 'object' && !Array.isArray(v) &&
        out[k] && typeof out[k] === 'object' && !Array.isArray(out[k])) {
      out[k] = deepMerge(out[k], v);
    } else {
      // source wins only if target doesn't have the key (first-occurrence wins for values)
      if (!(k in out)) {
        out[k] = v;
      }
    }
  }
  return out;
}

const blocks = extractTopLevelBlocks(raw);

const merged = {};
const keyOrder = [];

for (const { key, values } of blocks) {
  keyOrder.push(key);
  if (values.length === 1) {
    merged[key] = values[0];
  } else {
    // Deep merge: start with first occurrence, layer in unique keys from later ones
    let result = values[0];
    for (let j = 1; j < values.length; j++) {
      result = deepMerge(result, values[j]);
    }
    merged[key] = result;
    console.log(`Merged duplicate key "${key}" (${values.length} occurrences)`);
  }
}

// Reconstruct in original key order
const output = {};
for (const key of keyOrder) {
  output[key] = merged[key];
}

writeFileSync(filePath, JSON.stringify(output, null, 2), 'utf8');
console.log(`\nDone! Wrote ${Object.keys(output).length} top-level keys to ${filePath}`);
