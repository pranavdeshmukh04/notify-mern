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
        <li><Link to="/"><b>HOME</b></Link></li>
        <li><Link to="/create"><b>CREATE NOTE</b></Link></li>
        <li onClick={logoutSubmit}><Link to="/"><b>LOGOUT</b></Link></li>
      </ul>
    </header>
  )
}
