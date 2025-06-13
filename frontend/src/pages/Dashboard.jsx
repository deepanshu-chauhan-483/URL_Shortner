import { useEffect, useState } from "react";
import { getUserUrls, getUrlsByTag } from "../services/api";
import Navbar from "../components/Navbar";
import URLCard from "../components/URLCard";

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const { data } = await getUserUrls();
      setUrls(data);

      const allTags = new Set();
      data.forEach((url) => {
        url.tags?.forEach((tag) => allTags.add(tag));
      });
      setTags([...allTags]);
    } catch (error) {
      console.error("Failed to fetch URLs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTag) {
      setLoading(true);
      getUrlsByTag(selectedTag)
        .then((res) => {
          setUrls(res.data);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    } else {
      fetchUrls();
    }
  }, [selectedTag]);

  const filteredUrls = urls.filter(url => 
    url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.shortCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalVisits = urls.reduce((sum, url) => sum + (url.totalVisits || 0), 0);
  const totalUniqueVisitors = urls.reduce((sum, url) => sum + (url.uniqueVisitors || 0), 0);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-blue-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-blue-900 mb-2">
                URL Dashboard
              </h1>
              <p className="text-blue-600 text-lg">
                Manage and track your shortened URLs
              </p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
  <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
    <p className="text-2xl font-bold text-blue-800">{urls.length}</p>
    <p className="text-sm text-blue-600 font-medium">Total URLs</p>
  </div>
  <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
    <p className="text-2xl font-bold text-blue-800">{totalVisits}</p>
    <p className="text-sm text-blue-600 font-medium">Total Visits</p>
  </div>
  <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
    <p className="text-2xl font-bold text-blue-800">{totalUniqueVisitors}</p>
    <p className="text-sm text-blue-600 font-medium">Unique Visitors</p>
  </div>
</div>

          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-blue-100">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search URLs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[150px]"
                >
                  <option value="">All Tags</option>
                  {tags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>

              {selectedTag && (
                <button
                  onClick={() => setSelectedTag("")}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm font-medium"
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>

          {selectedTag && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-blue-600">Filtered by tag:</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {selectedTag}
              </span>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
              <p className="text-blue-700 font-semibold text-lg">Loading your URLs...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Results Info */}
            <div className="mb-6">
              <p className="text-blue-700 font-medium">
                Showing {filteredUrls.length} of {urls.length} URLs
                {searchTerm && (
                  <span className="text-blue-600"> matching "{searchTerm}"</span>
                )}
              </p>
            </div>

            {/* URLs Grid */}
            {filteredUrls.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-blue-100">
                <div className="max-w-md mx-auto">
                  <svg className="w-16 h-16 text-blue-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">
                    {searchTerm || selectedTag ? "No matching URLs found" : "No URLs yet"}
                  </h3>
                  <p className="text-blue-600 mb-6">
                    {searchTerm || selectedTag 
                      ? "Try adjusting your search or filter criteria" 
                      : "Start by creating your first shortened URL"
                    }
                  </p>
                  {(searchTerm || selectedTag) && (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedTag("");
                      }}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredUrls.map((url) => (
                  <URLCard key={url._id} url={url} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;