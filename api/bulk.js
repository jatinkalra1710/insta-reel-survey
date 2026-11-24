const { clean, isAdmin, encode, putOne } = require('./_lib');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  if (!isAdmin(req)) return res.status(401).json({ error: 'Wrong password' });
  try {
    const rows = (req.body && req.body.rows) || [];
    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(400).json({ error: 'No rows received.' });
    }
    const valid = [];
    let skipped = 0;
    for (const r of rows) {
      const a = clean(r);
      if (a) valid.push(a); else skipped++;
    }
    if (valid.length) {
      await putOne(encode(valid[0], 'bulk')); // first one settles the storage mode
      const rest = valid.slice(1);
      for (let i = 0; i < rest.length; i += 25) {
        await Promise.all(rest.slice(i, i + 25).map((a) => putOne(encode(a, 'bulk'))));
      }
    }
    return res.status(200).json({ ok: true, added: valid.length, skipped });
  } catch (e) {
    console.error('bulk failed:', e);
    return res.status(500).json({ error: 'Import failed part-way. Refresh the dashboard to see what was saved.' });
  }
};
