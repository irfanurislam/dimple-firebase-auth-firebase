import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase/firebase.init';



function App() {
  const [user,setUser] = useState(true)
  const auth = getAuth(app)
const provider = new GoogleAuthProvider()


const handlegoogleLogin = () =>{
  signInWithPopup(auth,provider)
  .then(result => {
    const logingoogle = result.user
    console.log(logingoogle);
    setUser(logingoogle)
  })
  .catch(error =>{
    console.log(error)
  })
}


const signoutgoogle =() =>{
  signOut(auth,provider)
  .then(result =>{
    console.log(result)
    setUser(null)
  }).catch(error => {
    console.log(error)
  })
}


  return (
    <div className="App">
      <h1>Firebase + React</h1>
      {
        user ?
       
        <button onClick={signoutgoogle}>google logout</button>
        :
         <button onClick={handlegoogleLogin}>google login</button>

      }
      {
        user && 
        <div className="card">
          <p>{user.displayName}</p>
          <p>{user.email ? user.email : 'no have'}</p>
          <p>{user.reloadListener ? user.reloadListener : 'no have'}</p>
          <p>variefied:{user.emailVerified && 'its variedfied'}</p>
          <p>isAnonymous:{user.isAnonymous || 'false'}</p>
        </div>
      }
      
    </div>
  )
}

export default App
