const { isAdmin, decode, listAll, removeAll } = require('./_lib');

module.exports = async (req, res) => {
  if (!isAdmin(req)) return res.status(401).json({ error: 'Wrong password' });
  try {
    if (req.method === 'GET') {
      const all = await listAll();
      const responses = all
        .map((b) => decode(b.pathname))
        .filter(Boolean)
        .sort((x, y) => x.t - y.t);
      return res.status(200).json({ responses });
    }
    if (req.method === 'DELETE') {
      await removeAll();
      return res.status(200).json({ ok: true });
    }
    return res.status(405).json({ error: 'Not allowed' });
  } catch (e) {
    console.error('responses failed:', e);
    return res.status(500).json({ error: 'Storage error. Open /api/health to check the Blob setup.' });
  }
};
