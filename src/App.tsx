import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home/Home"
import Details from "./pages/Details/Details"
import Favorites from "./pages/Favorites/Favorites"

function App() {

  return (
    <>
      <div className="min-h-screen p-6 bg-cyan-950 text-yellow-100 text-lg">
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/recipe-details/:id" element={<Details/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
