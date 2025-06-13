import ShortURL from '../models/ShortURL.js';
import Visit from '../models/Visit.js';
import { getDeviceType } from '../utils/device.js';
import { hashVisitor } from '../utils/hashVisitor.js';

export const handleRedirect = async (req, res) => {
  const { code } = req.params;
  const url = await ShortURL.findOne({ shortCode: code });

  if (!url) return res.status(404).json({ msg: 'URL not found' });
  if (url.expiresAt && new Date(url.expiresAt) < new Date())
    return res.status(410).json({ msg: 'URL expired' });

  const ip = req.ip;
  const userAgent = req.get('User-Agent');
  const referrer = req.get('Referrer') || 'direct';
  const deviceType = getDeviceType(userAgent);
  const visitorHash = hashVisitor(ip, userAgent);

  const isUnique = !(await Visit.findOne({ shortCode: code, visitorHash }));

  await Visit.create({
    shortCode: code,
    timestamp: new Date(),
    ip,
    referrer,
    deviceType,
    visitorHash,
  });

  url.totalVisits += 1;
  if (isUnique) url.uniqueVisitors += 1;
  await url.save();

  res.redirect(302, url.originalUrl);
};
