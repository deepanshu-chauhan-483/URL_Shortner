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

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await getAnalytics(code);
        setAnalytics(res.data);
      } catch (err) {
        console.error("Error fetching analytics", err);
      }
    };
    fetchAnalytics();
  }, [code]);

  if (!analytics) {
    return (
      <div className="text-center mt-20 text-blue-700 font-semibold text-lg">
        Loading analytics...
      </div>
    );
  }

  const deviceData = {
    labels: Object.keys(analytics.devices || {}),
    datasets: [
      {
        label: 'Visits by Device',
        data: Object.values(analytics.devices || {}),
        backgroundColor: ['#3b82f6', '#60a5fa', '#93c5fd']
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
        backgroundColor: ['#2563eb', '#38bdf8', '#06b6d4']
      }
    ]
  };

  const timeSeriesData = {
    labels: analytics.timeSeries?.map((d) => d.date) || [],
    datasets: [
      {
        label: 'Daily Traffic',
        data: analytics.timeSeries?.map((d) => d.count) || [],
        fill: false,
        borderColor: '#3b82f6',
        tension: 0.3
      }
    ]
  };

  return (
    <div className="bg-blue-50 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          Analytics for: <span className="underline break-all">{analytics.originalUrl}</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-5 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-blue-700 mb-3">Visits by Device</h2>
            <Pie data={deviceData} />
          </div>

          <div className="bg-white p-5 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-blue-700 mb-3">Top Referrers</h2>
            {referrerLabels.length > 0 ? (
              <div>
                <Bar data={referrerData} />
                <table className="mt-4 w-full text-sm border-t">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="py-2 text-blue-600">Referrer</th>
                      <th className="py-2 text-blue-600">Visits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrerLabels.map((ref, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="py-1">{ref || 'Direct/Unknown'}</td>
                        <td className="py-1">{referrerValues[idx]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No referrer data available.</p>
            )}
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow mb-8">
          <h2 className="text-lg font-semibold text-blue-700 mb-3">Traffic Over Last 7 Days</h2>
          {timeSeriesData.labels.length > 0 ? (
            <Line data={timeSeriesData} />
          ) : (
            <p className="text-gray-500">No traffic data to display.</p>
          )}
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-blue-700 mb-3">Summary</h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>Total Visits:</strong> {analytics.totalVisits}</p>
            <p><strong>Unique Visitors:</strong> {analytics.uniqueVisitors}</p>
            <p><strong>Tags:</strong> {analytics.tags?.join(', ') || 'None'}</p>
          </div>

          {analytics.qrCode && (
            <div className="mt-6 text-center">
              <img
                src={analytics.qrCode}
                alt="QR Code"
                className="w-28 h-28 mx-auto"
              />
              <p className="text-xs text-gray-500 mt-1">QR Code for this short URL</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
