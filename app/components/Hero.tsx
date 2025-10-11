// app/components/Hero.tsx
import Image from "next/image";
import { MapPin } from "lucide-react";

const Hero = () => {
  return (
    <section className="w-full pt-12">
      <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
        <div className="flex-shrink-0 w-40 h-40 md:w-52 md:h-52 overflow-hidden rounded-2xl shadow-lg">
          <Image
            src="/images/kian.jpg"
            alt="Lance Kian Flores"
            width={208}
            height={208}
            className="object-cover w-full h-full"
            priority
          />
        </div>

        <div className="flex-1">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900">
            Lance Kian Flores
          </h1>

          <div className="flex items-center gap-2 text-gray-700 mt-1 text-lg">
            <MapPin className="w-5 h-5 text-gray-700" />
            <span>San Fabian, Pangasinan, Philippines</span>
          </div>

          <p className="font-body text-lg mt-2 text-gray-700">
            Software Developer
          </p>

          <div className="flex flex-col md:flex-row gap-3 mt-5 md:justify-start justify-center">
            <a
              href="#contact"
              className="bg-gray-900 text-white px-6 py-2 rounded-2xl font-medium hover:bg-gray-800 transition"
            >
              Schedule a Call
            </a>
            <a
              href="mailto:yourname@email.com"
              className="border border-gray-900 text-gray-900 px-6 py-2 rounded-2xl font-medium hover:bg-gray-900 hover:text-white transition"
            >
              Send Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
