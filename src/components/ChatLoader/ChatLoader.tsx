import { motion } from "framer-motion";

export default function ChatLoader() {
  return (
    <div className="flex gap-2">
      <motion.div
        animate={{
          y: ["-25%", "0", "25%", "0", "-25%"],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
        className="bg-white opacity-80 h-3 aspect-square rounded-full"
      ></motion.div>
      <motion.div
        animate={{
          y: ["-50%", "0", "50%", "0", "-50%"],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
        className="bg-white opacity-80 h-3 aspect-square rounded-full"
      ></motion.div>
      <motion.div
        animate={{
          y: ["-25%", "0", "25%", "0", "-25%"],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
        className="bg-white opacity-80 h-3 aspect-square rounded-full"
      ></motion.div>
    </div>
  );
}
