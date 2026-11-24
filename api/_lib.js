const blob = require('@vercel/blob');
const crypto = require('crypto');

// Each response is saved as one tiny file in Vercel Blob. The answers are
// written into the file NAME, e.g.  responses/1732450000000-form-1234545454-a1b2c3.txt
// so the dashboard can read everything from a simple file listing.
const PREFIX = 'responses/';

// Highest valid code for each of the 10 questions (answers are stored 1-based).
const MAX = [4, 4, 4, 5, 5, 4, 5, 5, 4, 5];

function token() {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  const k = Object.keys(process.env).find((k) => k.endsWith('READ_WRITE_TOKEN') && process.env[k]);
  return k ? process.env[k] : undefined;
}
// Newer Vercel connections use OIDC + a store id instead of a token; the SDK handles that itself.
const hasStoreId = Object.keys(process.env).some((k) => k.endsWith('BLOB_STORE_ID') && process.env[k]);
const dbConfigured = Boolean(token() || hasStoreId);
// Only pass a token when one exists, otherwise let the SDK use OIDC.
const auth = () => (token() ? { token: token() } : {});

function clean(a) {
  if (!Array.isArray(a) || a.length !== MAX.length) return null;
  const out = [];
  for (let i = 0; i < MAX.length; i++) {
    const v = Number(a[i]);
    if (!Number.isInteger(v) || v < 1 || v > MAX[i]) return null;
    out.push(v);
  }
  return out;
}

function isAdmin(req) {
  const pw = process.env.ADMIN_PASSWORD;
  return Boolean(pw) && req.headers['x-admin-key'] === pw;
}

function encode(a, src) {
  const rand = crypto.randomBytes(3).toString('hex');
  return `${PREFIX}${Date.now()}-${src}-${a.join('')}-${rand}.txt`;
}

function decode(pathname) {
  const m = pathname.slice(PREFIX.length).replace(/\.txt$/, '').split('-');
  if (m.length < 3) return null;
  const codes = m[2].split('').map(Number);
  if (codes.length !== MAX.length || codes.some((n) => !n)) return null;
  return { t: Number(m[0]), s: m[1], a: codes };
}

// The store can be set to public or private; try one, remember what works.
let accessMode = null;
async function putOne(pathname) {
  const modes = accessMode ? [accessMode] : ['public', 'private'];
  let lastErr;
  for (const m of modes) {
    try {
      await blob.put(pathname, '1', {
        access: m,
        contentType: 'text/plain',
        addRandomSuffix: false,
        ...auth(),
      });
      accessMode = m;
      return;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

async function listAll() {
  const out = [];
  let cursor;
  do {
    const r = await blob.list({ prefix: PREFIX, limit: 1000, cursor, ...auth() });
    out.push(...r.blobs);
    cursor = r.hasMore ? r.cursor : undefined;
  } while (cursor);
  return out;
}

async function removeAll() {
  const all = await listAll();
  for (let i = 0; i < all.length; i += 100) {
    await blob.del(all.slice(i, i + 100).map((b) => b.url), auth());
  }
  return all.length;
}

module.exports = { dbConfigured, auth, token, MAX, clean, isAdmin, encode, decode, putOne, listAll, removeAll };
