import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-orange-500/5"></div>
      </div>

      {/* Reduced padding from py-16 → py-8 */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Reduced gap from gap-12 → gap-8 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* ORION (Brand Section) */}
          <div className="space-y-4 relative flex flex-col justify-between">
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              ORION
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Tutoring for students, from students. Personalized learning at
              your fingertips.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 mt-2">
              <Link
                href="/social/facebook"
                className="text-gray-400 hover:text-blue-500 transition-all duration-300 hover:scale-110"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
              <Link
                href="/social/twitter"
                className="text-gray-400 hover:text-sky-400 transition-all duration-300 hover:scale-110"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </Link>
              <Link
                href="/social/linkedin"
                className="text-gray-400 hover:text-blue-500 transition-all duration-300 hover:scale-110"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Student */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-base font-semibold text-white tracking-wide">
                Student
              </h4>
              <div className="w-6 h-0.5 bg-orange-500 rounded-full"></div>
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/home/sessions?page=1"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  All Subjects
                </Link>
              </li>
              <li>
                <Link
                  href="/(protected)/(student)/(footer)/my-sessions/upcoming-sessions"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  My Sessions
                </Link>
              </li>
              <li>
                <Link
                  href="/tutor-dashboard/sessions/upcoming-sessions"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Go to Tutor Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Essentials */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-base font-semibold text-white tracking-wide">
                Essentials
              </h4>
              <div className="w-6 h-0.5 bg-orange-500 rounded-full"></div>
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/notification"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Notifications
                </Link>
              </li>
              <li>
                <Link
                  href="/chat"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Chat
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-base font-semibold text-white tracking-wide">
                Contact Us
              </h4>
              <div className="w-6 h-0.5 bg-orange-500 rounded-full"></div>
            </div>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <a
                  href="mailto:support@orion.com"
                  className="hover:text-white flex items-center space-x-2"
                >
                  <span>📧</span>
                  <span>support@orion.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="hover:text-white flex items-center space-x-2"
                >
                  <span>📞</span>
                  <span>+1 (234) 567-890</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        {/* Reduced margin-top from mt-16 → mt-8 */}
        <div className="mt-8 pt-4 border-t border-gray-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <p className="text-gray-400 text-xs font-medium">
                © 2025 ORION. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white text-xs font-medium"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white text-xs font-medium"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-1 rounded-full">
              <span className="text-gray-400 text-xs">Made with</span>
              <span className="text-orange-500 animate-pulse">❤️</span>
              <span className="text-gray-400 text-xs">
                for students and tutoring students
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
