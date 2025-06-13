import { Link } from "react-router-dom";

const baseUrl = "http://localhost:5000/";

const URLCard = ({ url }) => {
  const handleCopy = () => {
    const shortUrl = `${baseUrl}short/${url.shortCode}`;
    navigator.clipboard.writeText(shortUrl);
    alert("Short URL copied to clipboard!");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-blue-200">
      <div className="mb-2">
        <p className="text-blue-700 font-medium">Short URL:</p>
        <div className="flex items-center justify-between">
        <a
  href={`${baseUrl}short/${url.shortCode}`}
  target="_blank"
  rel="noreferrer"
  className="text-blue-500 hover:underline break-all"
>
  {`${baseUrl}short/${url.shortCode}`}
</a>

          <button
            onClick={handleCopy}
            className="ml-2 text-sm text-blue-600 hover:underline"
          >
            Copy
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600 break-all">
        <span className="font-semibold">Original:</span> {url.originalUrl}
      </p>

      <div className="mt-2 text-sm">
        <p>
          <span className="font-semibold text-blue-700">Visits:</span>{" "}
          {url.totalVisits || 0}
        </p>
        <p>
          <span className="font-semibold text-blue-700">Unique Visitors:</span>{" "}
          {url.uniqueVisitors || 0}
        </p>
        <p>
          <span className="font-semibold text-blue-700">Tags:</span>{" "}
          {url.tags?.join(", ") || "None"}
        </p>
        <p>
          <span className="font-semibold text-blue-700">Expiry:</span>{" "}
          {url.expiresAt
            ? new Date(url.expiresAt).toLocaleString()
            : "No Expiry"}
        </p>
      </div>

      {url.qrCode && (
        <div className="mt-3 text-center">
          <img src={url.qrCode} alt="QR Code" className="w-24 h-24 mx-auto" />
          <p className="text-xs text-gray-500 mt-1">Scan QR</p>
        </div>
      )}

      <Link
        to={`/analytics/${url.shortCode}`}
        className="inline-block mt-4 text-blue-600 text-sm hover:underline"
      >
        View Analytics →
      </Link>
    </div>
  );
};

export default URLCard;
