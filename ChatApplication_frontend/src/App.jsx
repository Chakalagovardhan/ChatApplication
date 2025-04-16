import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ToastContainer,toast,Zoom } from 'react-toastify'
import JoinChat from './components/JoinChat'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <JoinChat />
     
    </>
  )
}

export default App
