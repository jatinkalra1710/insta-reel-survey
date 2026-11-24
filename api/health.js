const blob = require('@vercel/blob');
const { dbConfigured, auth } = require('./_lib');

// Open /api/health in the browser to check that storage is connected.
module.exports = async (req, res) => {
  const out = {
    storageConnected: dbConfigured,
    adminPasswordSet: Boolean(process.env.ADMIN_PASSWORD),
  };
  if (!dbConfigured) {
    out.problem = 'No Blob connection found. In Vercel open Storage, connect the Blob store to this project, then redeploy.';
    return res.status(200).json(out);
  }
  try {
    await blob.list({ prefix: 'responses/', limit: 1, ...auth() });
    out.canRead = true;
    out.problem = null;
  } catch (e) {
    out.canRead = false;
    out.problem = 'Token found but reading failed: ' + (e && e.message ? e.message : 'unknown error');
  }
  return res.status(200).json(out);
};
