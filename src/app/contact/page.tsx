"use client";

// ADD IMPORT USEEFFECT
import React, { useState, useEffect } from "react";
// ADD IMPORT FOR LEAFLET MAP
import "leaflet/dist/leaflet.css";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  // STATE TO TRACK IF MAP IS READY
  const [mapReady, setMapReady] = useState(false);

  // INITIALIZE MAP IN USEEFFECT
  useEffect(() => {
    if (typeof window === "undefined") return;

    import("leaflet").then((L) => {
      const map = L.map("map").setView([21.306944, -157.858333], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      L.marker([21.306944, -157.858333])
        .addTo(map)
        .bindPopup("Honolulu, HI")
        .openPopup();

      setMapReady(true);

      return () => {
        map.remove();
      };
    });
  }, []);

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
          <p className="text-lg text-gray-300">Email: <span className="text-green-400">support@byumarketplace.com</span></p>
          <p className="text-lg text-gray-300">Phone: <span className="text-green-400">+1 (808) 123-4567</span></p>
          <p className="text-lg text-gray-300">Address: <span className="text-green-400">123 Marketplace St, Honolulu, HI</span></p>
        </section>


        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
          

          <div className="bg-gray-900/70 p-8 rounded-2xl shadow-lg border border-gray-400 flex flex-col justify-between">
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
                className="p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:border-green-500"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:border-green-500"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="p-3 rounded-lg bg-gray-800 border border-gray-600 h-32 focus:outline-none focus:border-green-500"
                required
              />
              <button
                type="submit"
                className="bg-green-800 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* REPLACE GOOGLE MAPS BY LEAFLET MAP */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-gray-600 shadow-lg w-full aspect-[2/2] min-h-[300px] bg-gray-800">
            {!mapReady && (
              <img
                src="https://staticmap.openstreetmap.de/staticmap.php?center=21.306944,-157.858333&zoom=13&size=600x400&maptype=mapnik"
                alt="Map showing location in Honolulu Hawaii"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div 
              id="map" 
              className="absolute inset-0 w-full h-full"
              style={{ backgroundColor: 'transparent' }}
              role="region"
              aria-label="Interactive map of Honolulu location"
            />
            {/*
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0043578019647!2d-157.858333!3d21.306944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c006e5a6e68eaa1%3A0x1f10ebc1e9156f1f!2sHonolulu%2C%20HI!5e0!3m2!1sen!2sus!4v1695600000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            */}
          </div>
        </section>

      </main>
    </>
  );
};

export default ContactPage;
