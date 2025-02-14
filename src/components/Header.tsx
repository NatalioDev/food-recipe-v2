import { NavLink } from "react-router-dom"
import InputSearch from "./InputSearch"

const Header = () => {

  return (
    <header>
        {/* Title app */}
        <div className=" flex justify-between items-center py-8 container mx-auto flex-col gap-5 lg:flex-row lg:gap-0">
            <h2 className="text-2xl font-bold uppercase text-white drop-shadow-[3px_2px_2px_rgba(0,0,0,0.7)]">
                <NavLink to={"/"}>Food Recipe</NavLink>
            </h2>
        
        {/* Form search */}
        <InputSearch/>

        <ul className="flex gap-5">
          <li>
            <NavLink
              to="/"
              className={({isActive})=> isActive ? "text-teal-900 font-bold uppercase [-webkit-text-stroke:0.5px_white] tracking-widest" : "font-bold uppercase text-white drop-shadow-[3px_2px_2px_rgba(0,0,0,0.7)] hover:text-[#2ecc71] duration-300 tracking-widest" }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favorites"
              className={({isActive})=> isActive ? "text-teal-900 font-bold uppercase [-webkit-text-stroke:0.5px_white] tracking-widest" : "font-bold uppercase text-white drop-shadow-[3px_2px_2px_rgba(0,0,0,0.7)] hover:text-[#2ecc71] duration-300 tracking-widest" }
            >
              Favorites
            </NavLink>
          </li>
        </ul>
        </div>
    </header>
  )
}

export default Header
