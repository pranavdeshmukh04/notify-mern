import React from 'react'
import {Link} from 'react-router-dom'
import logo from './notify-logo-rmbg.png';

export default function Nav({setIsLogin}) {

  const logoutSubmit = () =>{
    localStorage.clear()
    setIsLogin(false)
  }
  
  return (
    <header className='nav'>
      <div className='logo'>
        <h1><Link to="/"><img src={logo} alt="logo" height="100px"/></Link></h1>
      </div>
      <ul>
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/create">CREATE NOTE</Link></li>
        <li><Link to="/bookmarks">BOOKMARKS</Link></li>
        <li onClick={logoutSubmit}><Link to="/">LOGOUT</Link></li>
      </ul>
    </header>
  )
}
