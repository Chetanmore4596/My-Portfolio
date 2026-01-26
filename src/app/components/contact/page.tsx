"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await emailjs.send(
        "service_9bre9ef", // Replace with your Email.js Service ID
        "template_tgusu69", // Replace with your Email.js Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "EId66v26sFS97zySB" // Replace with your Email.js Public Key
      );
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      setSuccess(false);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="w-full py-16 bg-gradient-to-r from-blue-500 via-blue-400 to-gray-700 text-center z-10">
      <motion.h2
        className="text-4xl font-bold mb-6 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Contact Me
      </motion.h2>

      <div className="max-w-4xl mx-auto px-6 py-8 bg-gray-800 bg-opacity-80 border-2 border-gray-600 rounded-lg shadow-xl">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-white mb-2" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-white mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-white mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              className="w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your message"
              required
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <motion.button
            type="submit"
            className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-lg shadow-lg transition-all"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            disabled={isSending}
          >
            {isSending ? "Sending..." : "Send Message"}
          </motion.button>

          {success !== null && (
            <p className={`mt-4 text-sm ${success ? "text-green-400" : "text-red-400"}`}>
              {success ? "Message sent successfully!" : "Failed to send message. Try again."}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
