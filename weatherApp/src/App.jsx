import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./assets/Home/Home"
import Weather from "./assets/Weather/Weather"
function App() {

  return (
    <>
   <BrowserRouter>
    <Routes>
      <Route path="/Home" element={<Home />}/>
      <Route path="/" element={<Weather />} />
    </Routes>
   </BrowserRouter>

        </>
  )
}

export default App
