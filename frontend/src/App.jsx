import { useState } from 'react'
import {Routes, Route,useNavigate} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Account from './pages/Account'
import Settings from './pages/Settings'
import Signup from './pages/Signup'
import { useAuth } from 'react-oidc-context'
import Landing from './pages/Landing'

function App() {
  const auth = useAuth()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
 
  if (!auth.isAuthenticated) {
    return (
      <Landing />
    )
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/account' element={<Account/>} />
        <Route path='/settings' element={<Settings/>} />
        <Route path='/signup' element={<Signup/>} />
      </Routes>
    </>
  )
}

export default App
