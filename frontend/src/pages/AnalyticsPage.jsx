import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAnalytics } from '../services/api';
import Navbar from '../components/Navbar';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const AnalyticsPage = () => {
  const { code } = useParams();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await getAnalytics(code);
        setAnalytics(res.data);
      } catch (err) {
        console.error("Error fetching analytics", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [code]);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
            <p className="text-blue-700 font-semibold text-lg">Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center bg-white p-8 rounded-xl shadow-lg">
            <p className="text-red-600 font-semibold text-lg">Failed to load analytics data</p>
          </div>
        </div>
      </div>
    );
  }

  const deviceData = {
    labels: Object.keys(analytics.devices || {}),
    datasets: [
      {
        label: 'Visits by Device',
        data: Object.values(analytics.devices || {}),
        backgroundColor: ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'],
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  };

  const referrers = analytics.referrers || {};
  const referrerLabels = Object.keys(referrers);
  const referrerValues = Object.values(referrers);

  const referrerData = {
    labels: referrerLabels,
    datasets: [
      {
        label: 'Referrers',
        data: referrerValues,
        backgroundColor: '#3b82f6',
        borderRadius: 6,
        borderSkipped: false
      }
    ]
  };

  const timeSeriesData = {
    labels: analytics.timeSeries?.map((d) => d.date) || [],
    datasets: [
      {
        label: 'Daily Traffic',
        data: analytics.timeSeries?.map((d) => d.count) || [],
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: '#3b82f6',
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true
        }
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-blue-100">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              Analytics Dashboard
            </h1>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm font-medium text-black mb-1">URL : <span className="text-blue-800 font-semibold break-all">{analytics.originalUrl}</span></p>
              
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 font-medium text-sm">Total Visits</p>
                <p className="text-3xl font-bold text-blue-900">{analytics.totalVisits}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 font-medium text-sm">Unique Visitors</p>
                <p className="text-3xl font-bold text-blue-900">{analytics.uniqueVisitors}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 font-medium text-sm">Tags</p>
                <div className="mt-2">
                  {analytics.tags?.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {analytics.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">No tags</span>
                  )}
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
            <h2 className="text-xl font-bold text-blue-800 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Visits by Device
            </h2>
            <div className="h-64">
              <Pie data={deviceData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
            <h2 className="text-xl font-bold text-blue-800 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Top Referrers
            </h2>
            {referrerLabels.length > 0 ? (
              <div>
                <div className="h-48 mb-4">
                  <Bar data={referrerData} options={chartOptions} />
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-blue-200">
                        <th className="py-2 text-left text-blue-700 font-semibold">Referrer</th>
                        <th className="py-2 text-right text-blue-700 font-semibold">Visits</th>
                      </tr>
                    </thead>
                    <tbody>
                      {referrerLabels.map((ref, idx) => (
                        <tr key={idx} className="border-b border-blue-100 last:border-b-0">
                          <td className="py-2 text-gray-700">{ref || 'Direct/Unknown'}</td>
                          <td className="py-2 text-right font-medium text-blue-700">{referrerValues[idx]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-blue-600">No referrer data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Traffic Timeline */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 mb-8">
          <h2 className="text-xl font-bold text-blue-800 mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Traffic Over Last 7 Days
          </h2>
          {timeSeriesData.labels.length > 0 ? (
            <div className="h-64">
              <Line data={timeSeriesData} options={chartOptions} />
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-blue-600">No traffic data to display</p>
            </div>
          )}
        </div>

        {/* QR Code Section */}
        {analytics.qrCode && (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-blue-100 text-center">
            <h2 className="text-xl font-bold text-blue-800 mb-6">QR Code</h2>
            <div className="inline-block p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
              <img
                src={analytics.qrCode || "/placeholder.svg"}
                alt="QR Code"
                className="w-32 h-32 mx-auto"
              />
              <p className="text-sm text-blue-600 mt-3 font-medium">Scan to visit this URL</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;