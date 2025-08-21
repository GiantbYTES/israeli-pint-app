import { useState } from 'react'
import './App.css'
import Business from './Components/Business/Business'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Business />
    </>
  )
}

export default App
