import React from 'react'
import Header from './notes/Nav'
import Home from './notes/Home'
import CreateNote from './notes/CreateNote'
import EditNote from './notes/EditNote'
import Bookmarks from './notes/Bookmarks'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

export default function Notes({setIsLogin}) {
  return (
    <Router>
      <div className="notes-page">
        <Header setIsLogin={setIsLogin}/>
        <section>
          <Routes>
            <Route path="/" element={<Home/>} exact/>
            <Route path="/create" element={<CreateNote/>} exact/>
            <Route path="/bookmarks" element={<Bookmarks/>} exact/>
            <Route path="/edit/:id" element={<EditNote/>} exact/>
          </Routes>
        </section>
      </div>
    </Router>
  )
}


