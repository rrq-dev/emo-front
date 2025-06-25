import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getLatestReflection } from "@/src/services/mood";

export default function RefleksiPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [polling, setPolling] = useState(true);

  useEffect(() => {
    let interval;

    const fetchReflection = async () => {
      try {
        const res = await getLatestReflection();
        const latest = res?.[0];
        if (latest) {
          setData(latest);
          if (latest.ai_reply) {
            setPolling(false); // Stop polling when reply is ready
          }
        }
      } catch (error) {
        console.error("Gagal fetch refleksi:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReflection();

    // Auto polling tiap 3 detik kalau belum ada ai_reply
    interval = setInterval(() => {
      if (polling) {
        fetchReflection();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [polling]);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 py-10 px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-lg rounded-xl shadow-md p-6 text-center">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : data ? (
          <>
            <motion.h2
              className="text-xl font-semibold mb-2 text-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Terakhir kamu curhat:
            </motion.h2>
            <motion.p
              className="text-md text-gray-700 italic mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              "{data.message}"
            </motion.p>

            <motion.h3
              className="text-lg font-medium text-gray-900 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Respon Gemini:
            </motion.h3>

            {data.ai_reply ? (
              <motion.p
                className="text-md text-green-800 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                {data.ai_reply}
              </motion.p>
            ) : (
              <motion.p
                className="text-sm text-gray-500 mt-2 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                Sedang merespon curhatanmu... ✨
              </motion.p>
            )}
          </>
        ) : (
          <p className="text-gray-600">
            Belum ada curhatan ditemukan. Curhat dulu yuk!
          </p>
        )}
      </div>
    </motion.div>
  );
}
