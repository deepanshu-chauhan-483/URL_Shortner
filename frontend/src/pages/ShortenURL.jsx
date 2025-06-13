import React, { useState } from 'react';
import { shortenUrl } from '../services/api';
import Navbar from "../components/Navbar";

const ShortenUrl = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [tags, setTags] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    try {
      const payload = {
        originalUrl,
        customCode: customCode.trim() || undefined,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        expiresAt: expiresAt || undefined,
      };

      const response = await shortenUrl(payload);
      setResult(response.data);
    } catch (err) {
      console.error('Error shortening URL:', err);
      setError(err?.response?.data?.msg || 'Failed to shorten URL.');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Navbar stays at the top, outside content container */}
      <Navbar />

      <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">Shorten a URL</h2>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="originalUrl" className="block text-sm font-medium text-gray-700">
              Original URL
            </label>
            <input
              id="originalUrl"
              type="url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
              placeholder="https://example.com"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="customCode" className="block text-sm font-medium text-gray-700">
              Custom Code (Optional)
            </label>
            <input
              id="customCode"
              type="text"
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value)}
              placeholder="my-custom-code"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
              Tags (comma-separated)
            </label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="marketing, product, sales"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="expiresAt" className="block text-sm font-medium text-gray-700">
              Expiry Date (Optional)
            </label>
            <input
              id="expiresAt"
              type="datetime-local"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Shorten URL
          </button>
        </form>

        {result && (
          <div className="mt-8 p-5 bg-blue-100 rounded-md text-sm">
            <p className="mb-2 text-gray-800">
              <strong>Short URL:</strong>{' '}
              <a href={result.shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                {result.shortUrl}
              </a>
            </p>
            {result.expiresAt && (
              <p className="mb-2 text-gray-800">
                <strong>Expires At:</strong> {new Date(result.expiresAt).toLocaleString()}
              </p>
            )}
            {result.qrCode && (
              <div className="mt-3">
                <p className="text-gray-800 font-medium mb-2">QR Code:</p>
                <img src={result.qrCode} alt="QR Code" className="w-32 h-32" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortenUrl;
