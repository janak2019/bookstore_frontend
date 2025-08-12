import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const SingleBookPage = ({ apiBase }) => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${apiBase}/book/${id}`);
        setBook(res.data.data);
      } catch (err) {
        console.error("Failed to fetch book", err);
      }
    };

    fetchBook();
  }, [id, apiBase]);

  if (!book) return <div className="text-center mt-10">Loading...</div>;

  return (
    <>
    
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <img
        className="w-full h-96 object-cover mb-6"
        src={book.bookImagePath}
        alt={book.bookName}
      />
      <h1 className="text-3xl font-bold mb-2">{book.bookName}</h1>
      <p className="text-gray-700 mb-2">Publication: {book.publication}</p>
      <p className="text-sm text-gray-500">
                  Published Date:{" "}
                  {book.publishedAt
                    ? new Date(book.publishedAt).toLocaleDateString()
                    : "N/A"}
                </p>
      <p className="text-gray-700 mb-4">Price: ${book.bookPrice}</p>
      <p className="text-gray-600">{book.description || "No description provided."}</p>

    </div>
    </>
  );
};

export default SingleBookPage;
