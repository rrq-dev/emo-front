import { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { submitMood } from "@/src/services/mood";
import { useAuth } from "@/src/context/authContext";

const moods = [
  {
    emoji: "😊",
    label: "Happy",
    value: "happy",
    color: "bg-green-100 hover:bg-green-200 border-green-300",
  },
  {
    emoji: "😐",
    label: "Neutral",
    value: "neutral",
    color: "bg-gray-100 hover:bg-gray-200 border-gray-300",
  },
  {
    emoji: "😞",
    label: "Sad",
    value: "sad",
    color: "bg-blue-100 hover:bg-blue-200 border-blue-300",
  },
  {
    emoji: "😡",
    label: "Frustrated",
    value: "frustrated",
    color: "bg-red-100 hover:bg-red-200 border-red-300",
  },
];

export default function CheckinPage() {
  const { user } = useAuth();
  const [selectedMood, setSelectedMood] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const isAnonymous = !user || !user.id;

  const handleSubmit = async () => {
    if (!selectedMood) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Pilih mood dulu dong 😅",
      });
      return;
    }

    try {
      setLoading(true);

      const payload = {
        mood: selectedMood,
        message: message.trim(),
        is_anonymous: isAnonymous,
      };

      await submitMood(payload);

      Swal.fire({
        icon: "success",
        title: "Mood berhasil dicatat!",
        text: isAnonymous
          ? "Terima kasih sudah check-in, pengguna anonim! 👻"
          : `Mood kamu tercatat, ${user.name}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      setSelectedMood("");
      setMessage("");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal mencatat mood 😢",
        text: err.message || err.error || "Coba lagi nanti ya!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-purple-50 to-yellow-50 py-8 px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-md rounded-xl shadow-md p-6 border">
        <motion.h2
          className="text-2xl font-bold text-center text-gray-800 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Check-In Emosi
        </motion.h2>

        <motion.div
          className="text-center text-sm text-gray-600 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {isAnonymous ? (
            "Kamu sedang check-in sebagai pengguna anonim 👻"
          ) : (
            <>
              Halo, <span className="font-semibold">{user.name}</span>! Mood
              kamu penting 😊
            </>
          )}
        </motion.div>

        <motion.p
          className="text-center text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Bagaimana perasaan kamu hari ini? Pilih emoji yang paling sesuai.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {moods.map((mood, i) => (
            <motion.button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 text-xl ${
                mood.color
              } ${
                selectedMood === mood.value
                  ? "ring-4 ring-primary/40 scale-105"
                  : ""
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <span className="text-4xl">{mood.emoji}</span>
              <span className="text-sm mt-2 text-gray-700">{mood.label}</span>
            </motion.button>
          ))}
        </div>

        {selectedMood && (
          <>
            <motion.div
              className="text-center p-4 mb-4 bg-primary/10 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Mood dipilih:{" "}
              <span className="font-semibold capitalize">{selectedMood}</span>
            </motion.div>

            <motion.textarea
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
              rows={4}
              placeholder="Ceritain kenapa kamu merasa seperti ini... (opsional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            />
          </>
        )}

        <motion.button
          onClick={handleSubmit}
          className="w-full bg-primary text-white py-3 rounded-md text-lg hover:bg-primary/90 transition"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
        >
          {loading ? "Mengirim..." : "Submit Mood"}
        </motion.button>
      </div>
    </motion.div>
  );
}
