import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Account from './pages/Account'
import Settings from './pages/Settings'
import Signup from './pages/Signup'
import { useAuth } from 'react-oidc-context'
import Landing from './pages/Landing'

function App() {
  const auth = useAuth()

  return (
    <>
      <Routes>
        <Route path='/' element={auth.isAuthenticated?<Home/>:<Landing/>} />
        <Route path='/account' element={<Account/>} />
        <Route path='/settings' element={<Settings/>} />
        <Route path='/signup' element={<Signup/>} />
      </Routes>
    </>
  )
}

export default App
