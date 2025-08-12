import React, { useState } from "react";
import axios from "axios";


export default function BookForm({ onSuccess, apiBase }) {
  const [form, setForm] = useState({
    bookName: "",
    bookPrice: "",
    isbnNumber: "",
    authorName: "",
    publishedAt: "",
    publication: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((f) => ({ ...f, image: files[0] }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!form.bookName || !form.bookPrice) {
    alert("Book name and price are required");
    return;
  }

  const formData = new FormData();
  formData.append("bookName", form.bookName);
  formData.append("bookPrice", form.bookPrice);
  formData.append("isbnNumber", form.isbnNumber);
  formData.append("authorName", form.authorName);
  formData.append("publishedAt", form.publishedAt);
  formData.append("publication", form.publication);
  if (form.image) formData.append("image", form.image);

  setLoading(true);
  try {
    const response = await axios.post(`${apiBase}/book`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const bookId = response.data.bookId;

    if (bookId) {
      navigate(`/book/${bookId}`);
    } else {
      alert("Book added, but ID not returned.");
    }

  } catch (err) {
    alert("Failed to add book");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
  

  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        📚 Add New Book
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Book Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Book Name *
          </label>
          <input
            name="bookName"
            value={form.bookName}
            onChange={handleChange}
            placeholder="Enter book name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Book Price */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Book Price *
          </label>
          <input
            name="bookPrice"
            type="number"
            value={form.bookPrice}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* ISBN Number */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            ISBN Number
          </label>
          <input
            name="isbnNumber"
            value={form.isbnNumber}
            onChange={handleChange}
            placeholder="ISBN Number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Author Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Author Name
          </label>
          <input
            name="authorName"
            value={form.authorName}
            onChange={handleChange}
            placeholder="Author's full name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Published At */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Published At
          </label>
          <input
            name="publishedAt"
            type="date"
            value={form.publishedAt}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Publication */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Publication
          </label>
          <input
            name="publication"
            value={form.publication}
            onChange={handleChange}
            placeholder="Publisher name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Book Cover Image
          </label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Add Book"}
          </button>
        </div>
      </form>
    </div>
  </div>
</>

  );
}
