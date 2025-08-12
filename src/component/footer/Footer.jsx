import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 mt-20">
      <div className="max-w-screen-xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo/Info */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">📚 डिजिटल पुस्तकालय</h2>
          <p className="text-sm">
            आफ्नो मनपर्ने पुस्तकहरू खोज्ने, पढ्ने, र व्यवस्थापन गर्ने लागि तपाईंको डिजिटल पुस्तकालय।
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-4"> लिंकहरु</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-blue-500">गृहपृष्ठ</a></li>
            <li><a href="/book-list" className="hover:text-blue-500">किताबहरु</a></li>
            <li><a href="#" className="hover:text-blue-500">सम्पर्क</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-4">हामिलाई पछ्याउनुहोस</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#"><FaFacebookF className="hover:text-blue-600" /></a>
            <a href="#"><FaTwitter className="hover:text-blue-400" /></a>
            <a href="#"><FaInstagram className="hover:text-pink-500" /></a>
            <a href="#"><FaLinkedinIn className="hover:text-blue-700" /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center py-4 border-t border-gray-200 dark:border-gray-700 text-sm">
        &copy; {new Date().getFullYear()} BookStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
