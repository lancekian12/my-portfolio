import clarifyImage1 from "public/images/clarifyImage1.png";
import accesabilityImage1 from "public/images/accessabilityImage1.jpg";
import accesabilityImage2 from "public/images/accessabilityImage2.jpg";
import accesabilityImage3 from "public/images/accessabilityImage3.jpg";
import cryptotelImage1 from "public/images/cryptotelImage.jpg";
import cryptotelImage2 from "public/images/cryptotelImage2.jpg";
import cryptotelImage3 from "public/images/cryptotelImage3.jpg";
import studyWithMeImage1 from "public/images/studywithmeImage1.jpg";
import studyWithMeImage2 from "public/images/studywithmeImage2.jpg";
import studyWithMeImage3 from "public/images/studywithmeImage3.jpg";
import eventmasterImage1 from "public/images/eventmasterImage1.png";
import insurechainImage2 from "public/images/insurechainImage2.png";
import appointCareImage2 from "public/images/appointcareImage2.png";
import { Project } from "app/types/data.types";

export const projects: Project[] = [
  {
    title: "Clarify",
    description:
      "AI Platform with 3 AI features – a project demonstrating advanced AI capabilities",
    tech: [
      "ReactJs",
      "Tailwind",
      "Redux",
      "Python",
      "FastAPI",
      "PostgresSQL",
      "OpenAI",
    ],
    platform: "Website",
    image: [clarifyImage1],
    repo: "https://github.com/lancekian12/boomintern2025",
    demo: "https://internship.boomtech.co",
  },
  {
    title: "AccessAbility",
    description:
      "A GPS-based mobile navigation app built to assist persons with disabilities. Offers accessible routes, real-time tracking, and voice-guided navigation using Dart, Flutter, and Google Maps API with Firebase authentication.",
    tech: ["Dart", "Flutter", "Bloc", "Firebase", "Google Maps API", "AI Assistant"],
    platform: "Mobile",
    image: [accesabilityImage1, accesabilityImage2, accesabilityImage3],
    repo: "https://github.com/lancekian12/3Y2AAPWD",
    demo: "https://accessability-web.vercel.app/",
  },
  {
    title: "AppointCare",
    description:
      "Doctor–patient appointment system for web and mobile. Enables scheduling and record management with React, Node.js, and Kotlin.",
    tech: ["React.js", "Node.js", "Express", "MongoDB", "Kotlin"],
    platform: "Website & Mobile",
    image: [appointCareImage2],
    repo: "https://github.com/lancekian12/AppointCare-Web",
    demo: "#",
  },
  {
    title: "CryptoHotel",
    description:
      "A hotel booking platform with secure crypto payments. Uses Flutter, Node.js, and MongoDB to enable fast and private global transactions with MetaMask integration.",
    tech: ["Flutter", "Node.js", "Bloc", "Leaflet", "Express", "MongoDB", "MetaMask"],
    platform: "Mobile",
    image: [cryptotelImage3, cryptotelImage1, cryptotelImage2],
    repo: "https://github.com/lancekian12/3Y1Cryptotel",
    demo: "#",
  },
  {
    title: "InsureChain",
    description:
      "Decentralized platform enhancing insurance accessibility through gamified challenges. Built with React, TypeScript, and Axle.",
    tech: ["React.js", "TypeScript", "Axle", "Tailwind"],
    platform: "Website",
    image: [insurechainImage2],
    repo: "https://github.com/lancekian12/InsureChain",
    demo: "https://vq3r3-bqaaa-aaaak-qignq-cai.icp0.io/",
  },
  {
    title: "Study With Me",
    description:
      "A quiz and learning app built with Kotlin. Lets users watch lessons, take notes, and manage to-do lists across five subjects with SQLite storage.",
    tech: ["Kotlin", "SQLite"],
    platform: "Mobile",
    image: [studyWithMeImage1, studyWithMeImage2, studyWithMeImage3],
    repo: "https://github.com/lancekian12/StudyWithMe",
    demo: "#",
  },
  {
    title: "Event Master Playground",
    description:
      "A fun and interactive React project built with Tailwind CSS to explore and experiment with different DOM events. Perfect for learning how to handle user interactions in a modern web app!",
    tech: ["ReactJS", "Tailwind", "Javascript"],
    platform: "Website",
    image: [eventmasterImage1],
    repo: "https://github.com/lancekian12/Client-Event-Playground",
    demo: "https://eventmaster-playground.vercel.app/",
  },

  // {
  //   title: "BeatSearching",
  //   description:
  //     "A music website using HTML, CSS, and JavaScript for browsing and purchasing instruments and courses online.",
  //   tech: ["HTML", "CSS", "JavaScript"],
  //   platform: "Website",
  //   image: ["/images/beatsearching_picture.jpeg"],
  //   repo: "https://github.com/lancekian12/MusicStoreWebsite",
  //   demo: "#",
  // },
  // {
  //   title: "Accessability",
  //   description:
  //     "AccessAbility is a GPS-based mobile application that empowers PWDs to navigate Dagupan with ease. By combining real-time GPS tracking with accessibility-focused features, the app enhances independence and mobility for users.",
  //   image: ["/images/Accessability.png"],
  //   tech: ["Dart", "Flutter", "Firebase", "Google Maps API", "AI Assistant"],
  //   platform: "Website",
  //   repo: "https://github.com/lancekian12/3Y2AAPWD",
  //   demo: "https://accessability-web.vercel.app/",
  // },
  // {
];
