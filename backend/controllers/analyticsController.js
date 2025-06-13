import Visit from '../models/Visit.js';
import ShortURL from '../models/ShortURL.js';

export const getAnalytics = async (req, res) => {
  const { code } = req.params;
  const url = await ShortURL.findOne({ shortCode: code });
  if (!url) return res.status(404).json({ msg: 'Not found' });

  const visits = await Visit.find({ shortCode: code });

  const devices = visits.reduce((acc, visit) => {
    acc[visit.deviceType] = (acc[visit.deviceType] || 0) + 1;
    return acc;
  }, {});

  const referrers = visits.reduce((acc, visit) => {
    acc[visit.referrer] = (acc[visit.referrer] || 0) + 1;
    return acc;
  }, {});

  const timeSeries = visits.map(v => ({
    date: new Date(v.timestamp).toISOString().split('T')[0],
    count: 1,
  }));

  res.json({
    originalUrl: url.originalUrl,
    totalVisits: url.totalVisits,
    uniqueVisitors: url.uniqueVisitors,
    devices,
    referrers,
    tags: url.tags,
    timeSeries,
  });
};

export const getByTag = async (req, res) => {
  const { tag } = req.params;
  const urls = await ShortURL.find({ tags: tag });
  res.json(urls);
};
