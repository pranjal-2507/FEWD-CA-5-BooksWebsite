import React, { useEffect, useState } from "react";
import "./Books.css";
import "../App.css";
import logo from "../Components/logo.webp";
import axios from "axios";
import { Link } from "react-router-dom";

function Books() {
  // State to store the fetched book data
  const [bookData, setBookData] = useState([]);

  // State to store the text input for book search
  const [searchText, setSearchText] = useState("");

  // State to store filtered books based on search text
  const [filteredBooks, setFilteredBooks] = useState([]);

  // State to control whether to show book suggestions
  const [showSuggestion, setShowSuggestions] = useState(true);

  // Function to handle changes in the search input
  function handleChange(event) {
    const inputText = event.target.value;
    setSearchText(inputText);
    setShowSuggestions(inputText !== ""); // Display suggestions only when the input is not empty

    // Filter books based on the input text
    const filtered = bookData.filter((item) =>
      item.title.toLowerCase().startsWith(inputText.toLowerCase())
    );
    setFilteredBooks(filtered);
  }

  // Fetch book data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://reactnd-books-api.udacity.com/books",
          {
            headers: { Authorization: "whatever-you-want" },
          }
        );
        setBookData(response.data.books);
        setFilteredBooks(response.data.books); // Initially display all books
        console.log(response.data.books);
      } catch (error) {
        console.log("Error fetching Data:", error);
      }
    };
    fetchData();
  }, []); // Empty dependency array ensures that this effect runs only once on component mount

  return (
    <>
      <div className="container">
        {/* Navbar */}
        <div className="navbar">
          <img className="logo" src={logo} alt="" />
          <h2 className="webName">Kalvium Books</h2>

          {/* Search input for book names with suggestions */}
          <input
            type="text"
            placeholder="Enter the Book name"
            list="suggestions"
            onChange={handleChange}
            className="BookInp"
          />

          {/* Link to the registration form */}
          <Link to={"./registrationform"}>
            <button className="doRegister">REGISTER</button>
          </Link>
        </div>

        {/* Title for the books section */}
        <h2 className="title">Explore Books!📚❤️</h2>

        {/* Container for displaying books */}
        <div className="contain">
          {filteredBooks.map((Books) => (
            <div key={Books.id}>
              <div className="page">
                <h2>
                  <br />
                  {Books.title}
                </h2>
                <img src={Books.imageLinks.smallThumbnail} alt="" />
                <p>Page Count: {Books.pageCount}</p>
                <p>Rating ⭐: {Books.averageRating}</p>
                <p>Free</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Books;
