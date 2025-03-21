import { useState } from 'react'
import UploadImage from './components/uploadImage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UploadImage/>
    </>
  )
}

export default App
