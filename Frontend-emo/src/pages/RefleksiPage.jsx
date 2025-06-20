import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getReflection } from "@/src/services/mood";

export default function RefleksiPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userID = "user-xyz"; // ganti sesuai mekanisme auth

  useEffect(() => {
    const fetchMood = async () => {
      try {
        const res = await getReflection(userID);
        const latest = res.data?.[0]; // ambil mood terbaru
        if (latest) setData(latest);
      } catch (error) {
        console.error("Gagal fetch refleksi:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMood();
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-purple-50 to-yellow-50 py-10 px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-lg rounded-xl shadow-md p-6 text-center">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : data ? (
          <>
            <motion.div
              className="text-5xl mb-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              {data.mood === "happy" && "😊"}
              {data.mood === "sad" && "😞"}
              {data.mood === "neutral" && "😐"}
              {data.mood === "frustrated" && "😡"}
            </motion.div>
            <motion.h2
              className="text-2xl font-semibold mb-2 text-gray-800 capitalize"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Mood kamu: {data.mood}
            </motion.h2>
            <motion.p
              className="text-md text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {data.message}
            </motion.p>
          </>
        ) : (
          <p className="text-gray-600">
            Belum ada data mood ditemukan. Silakan check-in dulu ya!
          </p>
        )}
      </div>
    </motion.div>
  );
}
