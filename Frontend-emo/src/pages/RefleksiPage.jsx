import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getLatestReflection } from "@/src/services/mood";

const bubbleVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 },
  }),
};

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

          // Stop polling kalau AI sudah bales
          if (latest.ai_reply) {
            setPolling(false);
          }
        }
      } catch (error) {
        console.error("Gagal fetch refleksi:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReflection();

    // Polling setiap 3 detik sampai AI bales
    interval = setInterval(() => {
      if (polling) fetchReflection();
    }, 3000);

    return () => clearInterval(interval);
  }, [polling]);

  const renderChat = () => {
    const message = data?.message || "";
    const aiReply = data?.ai_reply;

    return (
      <div className="flex flex-col gap-4 mt-6">
        {/* User Chat */}
        <motion.div
          className="self-end bg-blue-100 text-gray-800 px-4 py-3 rounded-2xl max-w-[80%] shadow"
          variants={bubbleVariants}
          custom={0}
          initial="hidden"
          animate="visible"
        >
          <p className="text-sm italic">"{message}"</p>
        </motion.div>

        {/* Gemini Response */}
        {aiReply ? (
          <motion.div
            className="self-start bg-green-100 text-gray-800 px-4 py-3 rounded-2xl max-w-[80%] shadow"
            variants={bubbleVariants}
            custom={1}
            initial="hidden"
            animate="visible"
          >
            <p className="text-sm">{aiReply}</p>
          </motion.div>
        ) : (
          <motion.div
            className="self-start bg-gray-100 text-gray-600 px-4 py-2 rounded-2xl max-w-[80%] italic shadow"
            variants={bubbleVariants}
            custom={1}
            initial="hidden"
            animate="visible"
          >
            <p>Sedang memikirkan respon terbaik buat kamu... 🧠✨</p>
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 py-10 px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-lg rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Refleksi Emosi 💬
        </h2>

        {loading ? (
          <div className="text-center mt-6 text-gray-500">Loading...</div>
        ) : data ? (
          renderChat()
        ) : (
          <div className="text-center mt-6 text-gray-600">
            Belum ada curhatan ditemukan. Curhat dulu yuk!
          </div>
        )}
      </div>
    </motion.div>
  );
}
