import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  const features = [
    {
      title: "Check-in Mood",
      description: "Catat dan ekspresikan perasaanmu hari ini",
      link: "/check-in",
      emoji: "📝",
      color: "from-pink-100 to-pink-200",
    },
    {
      title: "Heatmap Emosi",
      description: "Analisa mood harian pengguna dalam tampilan grafik visual",
      link: "/heatmap",
      emoji: "📊",
      color: "from-yellow-100 to-yellow-200",
    },
    {
      title: "Curhatan dan Saran",
      description: "Curhatan dan saran terkait emosimu",
      link: "/refleksi",
      emoji: "💡",
      color: "from-green-100 to-green-200",
    },
  ];

  const quotes = [
    "“Perjalanan mengenal emosi bukan tentang menghindari yang buruk, tetapi merayakan pemahaman tentang diri sendiri.”",
    "“Tidak apa-apa tidak baik-baik saja. Yang penting, jangan berhenti mencoba.”",
    "“Setiap emosi adalah pesan. Dengarkan, bukan lawan.”",
    "“Bahagia bukan tujuan akhir, tapi teman di sepanjang perjalanan.”",
    "“Merasakan artinya hidup. Jadi, izinkan dirimu merasakan.”",
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <motion.div
      className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-yellow-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-grow">
        {/* Hero Section */}
        <motion.section
          className="text-center py-16 px-4 max-w-4xl mx-auto"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80, damping: 12 }}
        >
          <motion.h1
            className="text-5xl font-bold text-gray-800 mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            👋 Selamat Datang di <span className="text-primary">EmoBuddy</span>
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Kenali, catat, dan refleksikan emosimu bersama platform kolaboratif
            ini.
          </motion.p>
        </motion.section>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 pb-12 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className={`rounded-xl p-6 shadow-md hover:shadow-xl bg-gradient-to-br ${feature.color} transition-all`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="text-4xl mb-2">{feature.emoji}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                {feature.description}
              </p>
              <Link
                to={feature.link}
                className="inline-block text-sm font-semibold text-primary hover:underline"
              >
                Mulai →
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Daily Quote Section */}
        <motion.section
          className="bg-white/70 backdrop-blur-lg mx-6 md:mx-auto md:max-w-3xl text-center rounded-lg p-6 mt-4 shadow relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            🌟 Motivasi Hari Ini
          </h2>
          <div className="h-20 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentQuoteIndex}
                className="italic text-gray-600"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                {quotes[currentQuoteIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <motion.footer
        className="bg-white/60 backdrop-blur text-center py-6 text-sm text-gray-600 border-t mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <p>
          © {new Date().getFullYear()} EmoBuddy. Dibuat dengan 💜 oleh Adit
          Gantenk.
        </p>
        <p className="text-xs mt-1">
          Versi Beta – Curhatkan emosi kamu disini.
        </p>
      </motion.footer>
    </motion.div>
  );
}
