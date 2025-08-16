import React, { useEffect, useState } from 'react'
import Card from '../component/card/Card'
import axios from 'axios'

const BookList = ({ apiBase }) => {

  const [books, setBooks] = useState([]);
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [authorFilter, setAuthorFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [sortOrder, setSortOrder] = useState("none");


  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiBase}/book`);
      const data = res.data?.data || res.data;
      const allBooks = Array.isArray(data) ? data : [];
      setBooks(allBooks);
      setDisplayedBooks(allBooks);
    } catch (err) {
      alert("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };


  // 🔍 Filtering and sorting
  useEffect(() => {
    let filtered = [...books];

    // Filter by author
    if (authorFilter) {
      filtered = filtered.filter((book) =>
        book.authorName?.toLowerCase().includes(authorFilter.toLowerCase())
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.bookName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.isbnNumber?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by published year
    if (publishedYear) {
      filtered = filtered.filter((book) => {
        if (!book.publishedAt) return false;
        const year = new Date(book.publishedAt).getFullYear().toString();
        return year === publishedYear;
      });
    }

    // Sort by price
    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.bookPrice - b.bookPrice);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.bookPrice - a.bookPrice);
    }

    setDisplayedBooks(filtered);
  }, [authorFilter, searchTerm, publishedYear, sortOrder, books]);

  const handleResetFilters = () => {
    setAuthorFilter("");
    setSearchTerm("");
    setPublishedYear("");
    setSortOrder("none");
  };
  useEffect(() => {
    fetchBooks()

  }, [])

  return (
    <>

      {/* Filter UI */}
      <div className="max-w-5xl mx-auto mt-20 mb-5 p-4 bg-white rounded shadow">
        {/* ... Filter UI from above goes here ... */}

        <h2 className="text-xl font-semibold mb-4 text-gray-800">फिल्टर/सर्च</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

          {/* Search by name or ISBN */}
          <input
            type="text"
            placeholder="Search by book name or ISBN"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />

          {/* Filter by author */}
          <input
            type="text"
            placeholder="Filter by author"
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />

          {/* Filter by published year */}
          <input
            type="number"
            placeholder="Published year (e.g. 2022)"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />

          {/* Sort by price */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="none">Sort by price</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>

        <div className="text-right mt-4">
          <button
            onClick={handleResetFilters}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Reset Filters
          </button>
        </div>


      </div>

      {/* Book Cards */}
      <div className='flex flex-wrap justify-evenly mt-10'>
        {
          displayedBooks.length > 0 ? (
            displayedBooks.map((book) => (
              <Card
                key={book._id}
                book={book}
                apiBase={apiBase}
                fetchBooks={fetchBooks}
              />
            ))
          ) : (
            <p className="text-center text-gray-600">No books found.</p>
          )
        }
      </div>
    </>
  )
}

export default BookList