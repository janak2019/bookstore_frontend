import React from "react";
import { Link } from "react-router-dom";

const Home = ({apibase}) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white pt-20">
      {/* Hero Section */}
      <section className="text-center px-6 py-20 md:py-28 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to BookStore 📚</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Discover, explore, and manage your favorite books all in one place.
        </p>
        <Link
          to="/book-list"
          className="bg-white text-blue-700 hover:bg-gray-200 font-semibold py-3 px-6 rounded-md transition duration-300"
        >
          Browse Books
        </Link>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6">About Our Bookstore</h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
          BookStore is a digital library for every kind of reader — from casual
          learners to passionate book collectors. Whether you're adding to your
          shelf or just browsing through our collection, we’re here to make your
          experience smooth, modern, and joyful.
        </p>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-100 dark:bg-blue-900 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold mb-4 text-blue-900 dark:text-white">
            Got a book to share?
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Add new books to your collection easily with our intuitive upload form.
          </p>
          <Link
            to="/add-book"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium"
          >
            Add a Book
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
