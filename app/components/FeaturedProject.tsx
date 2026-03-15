"use client";

import React from "react";

type Project = {
  title: string;
  description: string;
  image: string;
  code: string;
  demo: string;
};

const projects: Project[] = [
  {
    title: "Clarify",
    description:
      "AI Platform with 3 AI features – a project demonstrating advanced AI capabilities",
    image: "/images/Clarify.jpeg",
    code: "https://github.com/lancekian12/boomintern2025",
    demo: "https://internship.boomtech.co",
  },
  {
    title: "AppointCare",
    description:
      "Doctor–patient appointment system for web and mobile. Enables scheduling and record management with React, Node.js, and Kotlin.",
    image: "/images/AppointCare.jpeg",
    code: "https://github.com/lancekian12/AppointCare-Web",
    demo: "#",
  },
  {
    title: "Accessability",
    description:
      "AccessAbility is a GPS-based mobile application that empowers PWDs to navigate Dagupan with ease. By combining real-time GPS tracking with accessibility-focused features, the app enhances independence and mobility for users.",
    image: "/images/Accessability.png",
    code: "https://github.com/lancekian12/3Y2AAPWD",
    demo: "accessability-web.vercel.app",
  },
  {
    title: "Event Master Playground",
    description:
      "A fun and interactive React project built with Tailwind CSS to explore and experiment with different DOM events. Perfect for learning how to handle user interactions in a modern web app!",
    image: "/images/Event-Master.png",
    code: "https://github.com/lancekian12/Client-Event-Playground",
    demo: "https://eventmaster-playground.vercel.app/",
  },
];

const FeaturedProjects: React.FC = () => {
  return (
    <section className="space-y-12">
      <h2 className="text-center text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 font-bold">
        Selected Works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {projects.map((project) => (
          <div key={project.title} className="group">
            {/* Image */}
            <div className="aspect-video overflow-hidden mb-6 border border-slate-100 dark:border-slate-900 bg-slate-100 dark:bg-slate-900">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover grayscale opacity-60 
                group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105
                transition-all duration-500"
              />
            </div>

            <h3 className="text-lg font-bold tracking-tight mb-2">
              {project.title}
            </h3>

            <p className="text-sm font-light text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              {project.description}
            </p>

            <div className="flex gap-6">
              <a
                href={project.code}
                className="text-[10px] font-bold tracking-widest uppercase 
                border-b border-transparent hover:border-slate-900 dark:hover:border-white
                transition-all py-1"
              >
                View Code
              </a>

              <a
                href={project.demo}
                className="text-[10px] font-bold tracking-widest uppercase 
                border-b border-transparent hover:border-slate-900 dark:hover:border-white
                transition-all py-1"
              >
                Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
