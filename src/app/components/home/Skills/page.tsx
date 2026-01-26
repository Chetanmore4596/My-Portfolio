"use client";

import { motion } from "framer-motion";

export default function Skills() {
  return (
    <section className="w-full py-16 bg-gray-800 text-center">
      <motion.h2 
        className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        Skills & Technologies
      </motion.h2>

      <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-6">
        {[
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "JavaScript",
          "HTML",
          "CSS",
          "Git",
          "Firebase",
          "Node.js",
        ].map((skill, index) => (
          <motion.div
            key={index}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-medium 
                       hover:bg-purple-600 hover:shadow-purple-500/30 transition-all duration-200 transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 + index * 0.05 }}
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
