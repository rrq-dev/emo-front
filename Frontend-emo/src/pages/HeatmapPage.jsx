import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { getUserMoods } from "@/src/services/mood";

const moodConfig = {
  happy: {
    emoji: "😊",
    label: "Happy",
    color: "#22c55e",
  },
  neutral: {
    emoji: "😐",
    label: "Neutral",
    color: "#6b7280",
  },
  sad: {
    emoji: "😞",
    label: "Sad",
    color: "#3b82f6",
  },
  frustrated: {
    emoji: "😡",
    label: "Frustrated",
    color: "#ef4444",
  },
};

export default function HeatmapPage() {
  const [allMoods, setAllMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMoods = async () => {
    try {
      setError(null);
      const response = await getUserMoods();

      // Handle different response structures
      let data;
      if (response && response.data) {
        data = response.data;
      } else if (Array.isArray(response)) {
        data = response;
      } else {
        data = [];
      }

      console.log("Raw API Response:", response);
      console.log("Processed data:", data);

      const formatted = Array.isArray(data)
        ? data.map((entry, index) => {
            // Handle different possible field names from database
            const userId = entry.user_id || entry.userId || `user${index + 1}`;
            const userName = entry.user_name || entry.userName || null;
            const isAnonymous =
              entry.is_anonymous || entry.isAnonymous || false;
            const mood = entry.mood || "neutral";
            const reflection = entry.reflection || "";
            const timestamp =
              entry.timestamp ||
              entry.created_at ||
              entry.createdAt ||
              new Date().toISOString();

            return {
              id: entry.id || index,
              name: isAnonymous ? "Anonymous" : userName || userId,
              mood: mood.toLowerCase(),
              reflection,
              timestamp,
              userId,
              isAnonymous,
            };
          })
        : [];

      console.log("Formatted data:", formatted);
      setAllMoods(formatted);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching moods:", err);
      setError(err.message || "Failed to fetch moods");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoods();
    const interval = setInterval(fetchMoods, 10000); // Reduced frequency to 10 seconds
    return () => clearInterval(interval);
  }, []);

  const moodStats = allMoods.reduce((acc, item) => {
    const moodKey = item.mood || "neutral";
    acc[moodKey] = (acc[moodKey] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(moodConfig).map(([mood, config]) => ({
    mood: config.label,
    count: moodStats[mood] || 0,
    color: config.color,
  }));

  const formatTimestamp = (timestamp) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid date";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading mood data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center bg-white p-6 rounded-xl shadow">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchMoods}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-purple-50 to-yellow-50 py-8 px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            Heatmap Mood Analytics
          </h1>
          <p className="text-gray-600">
            Visualisasi mood keseluruhan User secara real-time
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Total entries: {allMoods.length} | Last updated:{" "}
            {new Date().toLocaleTimeString("id-ID")}
          </p>
        </div>

        <motion.div
          className="bg-white/80 backdrop-blur p-6 rounded-xl shadow space-y-4"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Grafik Mood Pengguna
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mood" />
              <YAxis allowDecimals={false} />
              <Tooltip
                formatter={(value) => [`${value} users`, "Count"]}
                labelFormatter={(label) => `Mood: ${label}`}
              />
              <Bar dataKey="count" fill="#8884d8">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="bg-white/80 backdrop-blur p-6 rounded-xl shadow"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            User Mood Details
          </h2>

          {allMoods.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-4">📭</div>
              <p>No mood data available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {allMoods.map((entry, i) => {
                const config = moodConfig[entry.mood] || moodConfig.neutral;
                return (
                  <motion.div
                    key={entry.id || i}
                    className={`p-4 rounded-xl bg-white border-l-4 shadow-sm hover:shadow-md transition-shadow`}
                    style={{ borderColor: config.color }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-2xl">{config.emoji}</span>
                      <div className="text-xs text-gray-400">
                        #{entry.id || i + 1}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="font-semibold text-sm text-gray-800">
                        {entry.name}
                        {entry.isAnonymous && (
                          <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            Anonymous
                          </span>
                        )}
                      </div>

                      <div
                        className="text-xs font-medium"
                        style={{ color: config.color }}
                      >
                        {config.label}
                      </div>

                      {entry.reflection && (
                        <div className="text-xs italic text-gray-500 line-clamp-2">
                          "{entry.reflection}"
                        </div>
                      )}

                      <div className="text-xs text-gray-400 mt-2">
                        {formatTimestamp(entry.timestamp)}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
