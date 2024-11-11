import React from 'react'
import Movies from './components/MoviesList'
import {
  
  Routes,
  Route,
  Link,
} from "react-router-dom";
import About from './page/About';
import ContactUs from './page/ContactUs';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      <Navbar />
     <Routes>
        <Route path="/" element={<Movies />} />
        <Route path='/contactus' element={<ContactUs/>} />
        <Route path="/about" element={<About />} />

      </Routes>
      
    </div>
  )
}

export default App
