import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


export default function EditBook({ apiBase }) {
  const { id } = useParams();
  const navigate = useNavigate();

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
  const [loadingData, setLoadingData] = useState(true);

  // Load book data
  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await axios.get(`${apiBase}/book/${id}`);
        const book = res.data.data || res.data;
        setForm({
          bookName: book.bookName || "",
          bookPrice: book.bookPrice || "",
          isbnNumber: book.isbnNumber || "",
          authorName: book.authorName || "",
          publishedAt: book.publishedAt ? book.publishedAt.split("T")[0] : "",
          publication: book.publication || "",
          image: null, // new image file if any
        });
      } catch (err) {
        alert("Failed to fetch book");
      } finally {
        setLoadingData(false);
      }
    }
    fetchBook();
  }, [apiBase, id]);

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
      await axios.patch(`${apiBase}/book/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Book updated!");
      navigate("/");
    } catch (err) {
      alert("Failed to update book");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) return <p>Loading book data...</p>;

  return (
    <>
    
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
  <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Edit Book</h2>

  {/* Book Name */}
  <div className="mb-4">
    <label htmlFor="bookName" className="block text-gray-700 font-medium mb-1">
      Book Name <span className="text-red-500">*</span>
    </label>
    <input
      id="bookName"
      name="bookName"
      placeholder="Book Name"
      value={form.bookName}
      onChange={handleChange}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Book Price */}
  <div className="mb-4">
    <label htmlFor="bookPrice" className="block text-gray-700 font-medium mb-1">
      Book Price <span className="text-red-500">*</span>
    </label>
    <input
      id="bookPrice"
      name="bookPrice"
      type="number"
      placeholder="Book Price"
      value={form.bookPrice}
      onChange={handleChange}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* ISBN Number */}
  <div className="mb-4">
    <label htmlFor="isbnNumber" className="block text-gray-700 font-medium mb-1">
      ISBN Number
    </label>
    <input
      id="isbnNumber"
      name="isbnNumber"
      placeholder="ISBN Number"
      value={form.isbnNumber}
      onChange={handleChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Author Name */}
  <div className="mb-4">
    <label htmlFor="authorName" className="block text-gray-700 font-medium mb-1">
      Author Name
    </label>
    <input
      id="authorName"
      name="authorName"
      placeholder="Author Name"
      value={form.authorName}
      onChange={handleChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Published At */}
  <div className="mb-4">
    <label htmlFor="publishedAt" className="block text-gray-700 font-medium mb-1">
      Published At
    </label>
    <input
      id="publishedAt"
      name="publishedAt"
      type="date"
      value={form.publishedAt}
      onChange={handleChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Publication */}
  <div className="mb-4">
    <label htmlFor="publication" className="block text-gray-700 font-medium mb-1">
      Publication
    </label>
    <input
      id="publication"
      name="publication"
      placeholder="Publication"
      value={form.publication}
      onChange={handleChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Image Upload */}
  <div className="mb-6">
    <label htmlFor="image" className="block text-gray-700 font-medium mb-1">
      Book Cover Image
    </label>
    <input
      id="image"
      name="image"
      type="file"
      accept="image/*"
      onChange={handleChange}
      className="w-full"
    />
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    disabled={loading}
    className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white py-3 rounded-md font-semibold disabled:opacity-50"
  >
    {loading ? "Updating..." : "Update Book"}
  </button>
</form>
</>

  );
}
