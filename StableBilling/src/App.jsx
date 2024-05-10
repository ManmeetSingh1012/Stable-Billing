import { useState } from 'react'
import './App.css'

import Register from './Pages/Register'
import SignIn from './Pages/SigIn'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='w-screen'>

        <Outlet/>
        
      </div>
    </>
  )
}

export default App
