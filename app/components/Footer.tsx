// app/components/Footer.tsx
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="w-full border-t border-gray-200 bg-white py-6"
    >
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-gray-600">
          © {year} Lance Kian Flores. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
