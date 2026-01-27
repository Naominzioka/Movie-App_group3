import React from 'react';
import Header from './components/Header';
import TVShows from './components/TvShows';
import { useState } from 'react'
import './App.css'


function App() {
 const[page, setPage] = useState("home");

  return (
    <>
      <Header setPage ={setPage}/>
      {page === "shows" && <TVShows />}
    </>
  )
}

export default App
