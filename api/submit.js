const { clean, encode, putOne } = require('./_lib');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  try {
    const body = req.body || {};
    // Hidden field that real people never fill in.
    if (body.website) return res.status(200).json({ ok: true });

    const a = clean(body.a);
    if (!a) return res.status(400).json({ error: 'Please answer all 10 questions.' });

    await putOne(encode(a, 'form'));
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('submit failed:', e);
    return res.status(500).json({ error: 'Could not save your response. Please try again.' });
  }
};
