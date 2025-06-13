import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { shortenUrl } from '../services/api';
import Navbar from "../components/Navbar";

const ShortenUrl = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [tags, setTags] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.shortUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-blue-100">
          {/* Header */}
          <div className="bg-blue-600 px-8 py-6 text-white">
            <h2 className="text-3xl font-bold text-center">Create Short URL</h2>
            <p className="text-center text-blue-100 mt-2">
              Generate custom short links with advanced tracking capabilities
            </p>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border-l-4 border-red-500 flex items-start">
                <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="originalUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Original URL <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <input
                    id="originalUrl"
                    type="url"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    required
                    placeholder="https://example.com/your-long-url"
                    className="block w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="customCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Custom Code (Optional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <input
                      id="customCode"
                      type="text"
                      value={customCode}
                      onChange={(e) => setCustomCode(e.target.value)}
                      placeholder="my-custom-code"
                      className="block w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Leave empty for auto-generated code</p>
                </div>

                <div>
                  <label htmlFor="expiresAt" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date (Optional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      id="expiresAt"
                      type="datetime-local"
                      value={expiresAt}
                      onChange={(e) => setExpiresAt(e.target.value)}
                      className="block w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Leave empty for no expiration</p>
                </div>
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma-separated)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <input
                    id="tags"
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="marketing, product, sales"
                    className="block w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Helps organize and filter your URLs</p>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium transition duration-200 ${
                    isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      Generate Short URL
                    </>
                  )}
                </button>
              </div>
            </form>

            {result && (
              <div className="mt-8 bg-blue-50 rounded-xl border border-blue-200 overflow-hidden">
                <div className="bg-blue-600 px-6 py-3">
                  <h3 className="text-white font-semibold">Your Short URL is Ready!</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-blue-700 mb-2">Short URL:</p>
                    <div className="flex items-center bg-white rounded-lg border border-blue-200 p-3">
                      <a 
                        href={result.shortUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:text-blue-800 font-medium break-all flex-1 transition-colors duration-200"
                      >
                        {result.shortUrl}
                      </a>
                      <button
                        onClick={handleCopy}
                        className={`ml-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                          copySuccess 
                            ? 'bg-green-100 text-green-700 border border-green-200' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {copySuccess ? (
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Copied!
                          </span>
                        ) : 'Copy URL'}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      {result.expiresAt && (
                        <div>
                          <p className="text-sm font-medium text-blue-700 mb-2">Expires At:</p>
                          <div className="bg-white rounded-lg border border-blue-200 p-3">
                            <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full">
                              {new Date(result.expiresAt).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {result.qrCode && (
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-sm font-medium text-blue-700 mb-2 self-start">QR Code:</p>
                        <div className="bg-white p-4 rounded-lg border-2 border-blue-200 shadow-sm">
                          <img src={result.qrCode || "/placeholder.svg"} alt="QR Code" className="w-36 h-36" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link
                      to="/dashboard"
                      className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 text-sm"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                      View All URLs
                    </Link>
                    <button
                      onClick={() => {
                        setOriginalUrl('');
                        setCustomCode('');
                        setTags('');
                        setExpiresAt('');
                        setResult(null);
                      }}
                      className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors duration-200 text-sm"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Create Another
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortenUrl;