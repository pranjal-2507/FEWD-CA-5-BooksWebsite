import React, { useEffect, useState } from 'react'
import './Books.css'
import logo from '../Components/logo.webp'
// import axios from 'axios'


function Books() {
   const [bookData,setBookData] = useState([])

   useEffect(()=>{
    const fetchData = async()=>{
        try{
            const response = await axios.get("https://reactnd-books-api.udacity.com/books", {
                headers: {'Authorization' : 'whatever-you-want'}
            })
            setBookData(response.data.books)
        }
        catch(error){
            console.log("Error fatching Data:", error)
        }
    }
    fetchData()
   },[])

  return (
    <>
    <div className="container">
        <div className="navbar">
        <img className='logo' src={logo} alt="" />
            <h2 className='webName'> Kalvium Books</h2>
            
                <input type="text" placeholder='Enter the Book name' className='BookInp' />
            
            <button className='doRegister'>
                REGISTER
            </button>
        </div>
    </div>
    
    </>
  )
}

export default Books