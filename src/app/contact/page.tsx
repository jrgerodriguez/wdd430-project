"use client";

import React, { useState } from "react";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-16 text-gray-100">
        
        <section className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
          <p className="text-lg text-gray-300">Email: <span className="text-blue-400">support@byumarketplace.com</span></p>
          <p className="text-lg text-gray-300">Phone: <span className="text-blue-400">+1 (808) 123-4567</span></p>
          <p className="text-lg text-gray-300">Address: <span className="text-blue-400">123 Marketplace St, Honolulu, HI</span></p>
        </section>


        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
          

          <div className="bg-gray-900/70 p-8 rounded-2xl shadow-lg border border-gray-700 flex flex-col justify-between">
            <h2 className="text-2xl font-semibold mb-6 text-center">Send Us a Message</h2>
            
            {submitted && (
              <p className="text-green-400 mb-4 text-center">
                ✅ Thank you! Your message has been sent.
              </p>
            )}

            <form className="flex flex-col gap-5 flex-1" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-500"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="p-3 rounded-lg bg-gray-800 border border-gray-600 h-32 focus:outline-none focus:border-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
              >
                Send Message
              </button>
            </form>
          </div>


          <div className="rounded-2xl overflow-hidden border border-gray-700 shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0043578019647!2d-157.858333!3d21.306944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c006e5a6e68eaa1%3A0x1f10ebc1e9156f1f!2sHonolulu%2C%20HI!5e0!3m2!1sen!2sus!4v1695600000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>

      </main>
    </>
  );
};

export default ContactPage;
