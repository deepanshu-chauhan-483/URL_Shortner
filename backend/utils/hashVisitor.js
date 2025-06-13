import crypto from 'crypto';

export const getDeviceType = (userAgent = '') => {
  const ua = userAgent.toLowerCase();
  if (/mobile|iphone|android/.test(ua)) return 'mobile';
  if (/tablet|ipad/.test(ua)) return 'tablet';
  return 'desktop';
};



/**
 * Creates a hash of the IP + User-Agent to uniquely identify visitors.
 * @param {string} ip
 * @param {string} userAgent
 * @returns {string} hash string
 */
export const hashVisitor = (ip, userAgent) => {
  const hash = crypto.createHash('sha256');
  hash.update(ip + userAgent);
  return hash.digest('hex');
};
