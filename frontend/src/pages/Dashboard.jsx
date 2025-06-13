import { useEffect, useState } from "react";
import { getUserUrls, getUrlsByTag } from "../services/api";
import Navbar from "../components/Navbar";
import URLCard from "../components/URLCard";

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

  const fetchUrls = async () => {
    try {
      const { data } = await getUserUrls();
      setUrls(data); // Since backend returns plain array

      const allTags = new Set();
      data.forEach((url) => {
        url.tags?.forEach((tag) => allTags.add(tag));
      });
      setTags([...allTags]);
    } catch (error) {
      console.error("Failed to fetch URLs", error);
    }
  };

 useEffect(() => {
  if (selectedTag) {
    getUrlsByTag(selectedTag)
      .then((res) => {
        setUrls(res.data);  // ← directly use the array
      })
      .catch((err) => console.error(err));
  } else {
    fetchUrls();
  }
}, [selectedTag]);


  return (
    <div className="bg-blue-50 min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h2 className="text-3xl font-bold text-blue-800">Your Shortened URLs</h2>

          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Tags</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {urls.length === 0 ? (
          <p className="text-gray-600 text-lg">No URLs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {urls.map((url) => (
              <URLCard key={url._id} url={url} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
