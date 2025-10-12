export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="w-full border-t border-gray-200 dark:border-gray-700 py-6 dark:bg-black "
    >
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {year}{" "}
          <span className="font-medium text-gray-900 dark:text-gray-200">
            Lance Kian Flores
          </span>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
