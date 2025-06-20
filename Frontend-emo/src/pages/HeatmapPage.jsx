import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getUserMoods } from "@/src/services/mood"; // pastikan path-nya sesuai

const moodConfig = {
  happy: {
    emoji: "😊",
    label: "Happy",
    color: "bg-green-500",
    bgColor: "bg-green-100",
  },
  neutral: {
    emoji: "😐",
    label: "Neutral",
    color: "bg-gray-500",
    bgColor: "bg-gray-100",
  },
  sad: {
    emoji: "😞",
    label: "Sad",
    color: "bg-blue-500",
    bgColor: "bg-blue-100",
  },
  frustrated: {
    emoji: "😡",
    label: "Frustrated",
    color: "bg-red-500",
    bgColor: "bg-red-100",
  },
};

export default function HeatmapPage() {
  const [allMoods, setAllMoods] = useState([]);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const res = await getUserMoods();
        const data = res.data;

        const formatted = Array.isArray(data)
          ? data.map((entry) => ({
              name: entry.is_anonymous
                ? "Anonymous"
                : entry.user_name || `User ${entry.user_id}`,
              mood: entry.mood,
              reflection: entry.reflection,
              timestamp: entry.timestamp || entry.created_at,
            }))
          : [];

        setAllMoods(formatted);
      } catch (err) {
        console.error("Error fetching moods:", err.message);
      }
    };

    fetchMoods();
  }, []);

  const moodStats = allMoods.reduce((acc, item) => {
    acc[item.mood] = (acc[item.mood] || 0) + 1;
    return acc;
  }, {});

  const totalMoods = allMoods.length;
  const moodPercentages = Object.entries(moodStats).map(([mood, count]) => ({
    mood,
    count,
    percentage: Math.round((count / totalMoods) * 100),
  }));

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-purple-50 to-yellow-50 py-8 px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            Heatmap Mood Analytics
          </h1>
          <p className="text-gray-600">
            Visualisasi mood keseluruhan User secara real-time
          </p>
        </div>

        <motion.div
          className="bg-white/80 backdrop-blur p-6 rounded-xl shadow space-y-4"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Statistik Mood Pengguna EmoBuddy
          </h2>
          {moodPercentages.map(({ mood, count, percentage }) => {
            const config = moodConfig[mood];
            return (
              <div key={mood} className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{config.emoji}</span>
                    <span className="font-medium">{config.label}</span>
                  </div>
                  <span className="text-sm text-gray-700">
                    {count} orang ({percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-full">
                  <div
                    className={`${config.color} h-3 rounded-full`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          className="bg-white/80 backdrop-blur p-6 rounded-xl shadow"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            User Mood
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {allMoods.map((entry, i) => {
              const config = moodConfig[entry.mood];
              return (
                <motion.div
                  key={i}
                  className={`p-4 rounded-xl ${config.bgColor} flex items-center space-x-3`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className="text-2xl">{config.emoji}</span>
                  <div>
                    <div className="font-semibold text-sm">
                      User {entry.name}
                    </div>
                    <div className="text-xs text-gray-600">{config.label}</div>
                    {entry.reflection && (
                      <div className="text-xs italic text-gray-500">
                        “{entry.reflection}”
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <div className="bg-white/80 backdrop-blur p-4 rounded-xl shadow mt-4">
          <h2 className="text-md font-medium text-gray-800 mb-2">Legend:</h2>
          <div className="flex flex-wrap gap-4">
            {Object.entries(moodConfig).map(([mood, config]) => (
              <div key={mood} className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded ${config.color}`} />
                <span className="text-xl">{config.emoji}</span>
                <span className="text-sm font-medium">{config.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
