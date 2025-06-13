import { Link } from "react-router-dom";

const baseUrl = "http://localhost:5000/";

const URLCard = ({ url }) => {
  const handleCopy = () => {
    const shortUrl = `${baseUrl}short/${url.shortCode}`;
    navigator.clipboard.writeText(shortUrl);
    alert("Short URL copied to clipboard!");
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 border border-blue-100 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-full">
      {/* Top Content */}
      <div className="flex flex-col gap-4">
        {/* Header Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-semibold text-blue-800">Short URL</h3>
            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
              Active
            </span>
          </div>

          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
            <div className="flex items-center justify-between gap-2">
              <a
                href={`${baseUrl}short/${url.shortCode}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium break-all flex-1 text-sm"
              >
                {`${baseUrl}short/${url.shortCode}`}
              </a>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors duration-200 whitespace-nowrap"
              >
                Copy URL
              </button>
            </div>
          </div>
        </div>

        {/* Original URL Section */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">Original URL:</p>
          <p className="text-sm text-gray-600 break-all bg-gray-50 p-2 rounded-lg border">
            {url.originalUrl}
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 p-3 rounded-lg text-center border border-blue-100">
            <p className="text-xl font-bold text-blue-700">{url.totalVisits || 0}</p>
            <p className="text-xs text-blue-600 font-medium">Total Visits</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg text-center border border-blue-100">
            <p className="text-xl font-bold text-blue-700">{url.uniqueVisitors || 0}</p>
            <p className="text-xs text-blue-600 font-medium">Unique Visitors</p>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center py-1 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-700">Tags:</span>
            <span className="text-sm text-gray-600">
              {url.tags?.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {url.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-gray-400">No tags</span>
              )}
            </span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-sm font-medium text-gray-700">Expires:</span>
            <span className="text-sm text-gray-600">
              {url.expiresAt ? (
                <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full">
                  {new Date(url.expiresAt).toLocaleDateString()}
                </span>
              ) : (
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                  Never expires
                </span>
              )}
            </span>
          </div>
        </div>

        {/* QR Code Section */}
        {url.qrCode && (
          <div className="text-center">
            <div className="inline-block p-3 bg-white border-2 border-blue-100 rounded-lg shadow-sm">
              <img src={url.qrCode} alt="QR Code" className="w-28 h-28 mx-auto" />
              <p className="text-xs text-blue-600 mt-1 font-medium">Scan to visit</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Action */}
      <div className="pt-4 border-t border-gray-100 mt-4">
        <Link
          to={`/analytics/${url.shortCode}`}
          className="w-full inline-flex items-center justify-center px-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 text-sm"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          View Detailed Analytics
        </Link>
      </div>
    </div>
  );
};

export default URLCard;
