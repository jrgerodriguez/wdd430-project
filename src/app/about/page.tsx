"use client";
import React from "react";

const teamMembers = [
  { name: "Soraya", role: "Founder & CEO", bio: "Passionate about connecting buyers and sellers." },
  { name: "Jorge", role: "Engineer", bio: "Building a safe and scalable platform." },
  { name: "Gabriel ", role: "Community Manager", bio: "Ensuring everyone has a great marketplace experience." },
];

const About: React.FC = () => {
  return (
    <main className="flex flex-col gap-16 p-8 max-w-7xl mx-auto">
      <section className="text-center">
        <h1 className="text-5xl font-bold mb-4">About Our Marketplace</h1>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          We provide a safe, user-friendly platform for buying, selling, and reviewing sellers. 
          Our mission is to connect communities and make online trading simple and trustworthy.
        </p>
      </section>

      <section className=" p-8 rounded-lg text-center">
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-white/70">
          Our mission is to empower individuals to trade with confidence. We ensure transparency, 
          community support, and fair reviews to make every transaction smooth and reliable.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-8 text-center">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="p-6 border rounded-lg text-center hover:shadow-lg transition">
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-white/70">{member.role}</p>
              <p className="mt-2 text-white/70">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className=" p-8 rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 text-center">What Users Say</h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <blockquote className="border-l-4 border-blue-500 pl-4 italic">
            I love this marketplace! I can buy and sell safely with trusted reviews.
          </blockquote>
          <blockquote className="border-l-4 border-blue-500 pl-4 italic">
            The team is responsive and the platform is very user-friendly.
          </blockquote>
        </div>
      </section>
    </main>
  );
};

export default About;