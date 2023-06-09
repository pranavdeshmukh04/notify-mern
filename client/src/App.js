import React, {useState, useEffect} from 'react';
// import axios from 'axios'
import Login from './components/Login'
import Notes from './components/Notes'
import API from './api/api'
import Loading from './components/Loading'

function App() {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() =>{
    const checkLogin = async () =>{
      const token = localStorage.getItem('tokenStore')
      if(token){
        const verified = await API.get('/users/verify',{
          headers:{ Authorization: token}
        })
        console.log(verified)
        setIsLogin(verified.data)
        if(verified.data === false) return localStorage.clear()
      }else{
        setIsLogin(false)
      }
    }
    checkLogin()
  }, [])

  return (
    <div className="App">
      {
        isLogin 
        ? <Notes setIsLogin={setIsLogin} /> 
        : <Login setIsLogin={setIsLogin} />
      }
      {/* <Loading /> */}
    </div>
  );
}

export default App;