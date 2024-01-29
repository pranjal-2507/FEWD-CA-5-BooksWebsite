import React, { useEffect, useState } from 'react';
import './Books.css';
import logo from '../Components/logo.webp';
import axios from 'axios';


function Books() {
  const [bookData, setBookData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showSuggestion, setShowSuggestions] = useState(true);

  function handleChange(event) {
    const inputText = event.target.value;
    setSearchText(inputText);
    setShowSuggestions(inputText !== ''); // display suggestions only when the input is not empty

    const filtered = bookData.filter(
      item => item.title.toLowerCase().startsWith(inputText.toLowerCase())
    );
    setFilteredBooks(filtered);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://reactnd-books-api.udacity.com/books',
          {
            headers: { Authorization: 'whatever-you-want' },
          }
        );
        setBookData(response.data.books);
        setFilteredBooks(response.data.books); // Initially display all books
        console.log(response.data.books);
      } catch (error) {
        console.log('Error fetching Data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <div className="navbar">
          <img className="logo" src={logo} alt="" />
          <h2 className="webName">Kalvium Books</h2>

          <input
            type="text"
            placeholder="Enter the Book name"
            list="suggestions"
            onChange={handleChange}
            className="BookInp"
          />

          <button className="doRegister">REGISTER</button>
        </div>

        <h2 className="title">Explore Books!📚❤️</h2>
        <div className="contain">
          {filteredBooks.map(Books => (
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
