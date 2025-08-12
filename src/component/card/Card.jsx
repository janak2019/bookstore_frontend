import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Card = ({ book, apiBase, fetchBooks }) => {
    
    const handleDelete = async (id) => {
  if (!window.confirm("Delete this book?")) return;

  try {
    console.log("Deleting book with ID:", id);
    const response = await axios.delete(`${apiBase}/book/${id}`);
    console.log("Delete response:", response.data);
    fetchBooks(); // refresh book list
  } catch (err) {
    console.error("Delete error:", err);
    alert("Failed to delete book: " + (err?.response?.data?.message || err.message));
  }
};

  
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg my-5 hover:shadow-xl transition-shadow duration-300">
  <Link to={`/books/${book._id}`}>
    <img
      className="w-full h-64 object-cover"
      src={book.bookImagePath}
      alt={book.bookName}
    />
  </Link>
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{book.bookName}</div>
    <div className="text-xl mb-2">Author:{book.authorName}</div>
    <p className="text-gray-700 text-base">Publication: {book.publication}</p>
    <p className="text-sm text-gray-500">
                  Published Date:{" "}
                  {book.publishedAt
                    ? new Date(book.publishedAt).toLocaleDateString()
                    : "N/A"}
                </p>
    <div className="flex items-center justify-between">
      <span className="font-bold text-lg">Price: ${book.bookPrice}</span>
      <div className="flex justify-evenly mt-4">
        <Link
          to={`/edit-book/${book._id}`}
          className="bg-blue-600 px-2 py-1 m-2 rounded-md text-sm font-medium hover:underline text-white"
        >
          Edit
        </Link>
        <button
          onClick={() => handleDelete(book._id)}
          className="bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</div>
  )
}

export default Card