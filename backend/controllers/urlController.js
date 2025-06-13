import ShortURL from '../models/ShortURL.js';
import shortid from 'shortid';
import QRCode from 'qrcode';

export const createShortURL = async (req, res) => {
  const { originalUrl, customCode, expiresAt, tags } = req.body;
  const userId = req.user.id;

  let shortCode = customCode || shortid.generate();
  const exists = await ShortURL.findOne({ shortCode });
  if (exists) return res.status(400).json({ msg: 'Short code exists' });

  const shortUrl = `${process.env.BASE_URL}/short/${shortCode}`;
  const qrCode = await QRCode.toDataURL(shortUrl);

  const newUrl = await ShortURL.create({
    originalUrl,
    shortCode,
    userId,
    tags,
    expiresAt,
    qrCode,
  });

  res.json({ shortUrl, qrCode, expiresAt });
};


// Backend Controller
export const getUserUrls = async (req, res) => {
  try {
    const urls = await ShortURL.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(urls);
  } catch (error) {
    console.error('Error fetching user URLs:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



