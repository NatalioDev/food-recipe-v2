import { NavLink } from "react-router-dom"
import InputSearch from "./InputSearch"

const Header = () => {

  return (
    <header>
        {/* Title app */}
        <div className=" flex justify-between items-center py-8 container mx-auto flex-col gap-5 lg:flex-row lg:gap-0">
            <h2 className="text-2xl font-semibold">
                <NavLink to={"/"}>Food Recipe</NavLink>
            </h2>
        
        {/* Form search */}
        <InputSearch/>

        <ul className="flex gap-5">
          <li>
            <NavLink
              to="/"
              className={({isActive})=> isActive ? "text-cyan-500" : "text-white hover:text-cyan-300 duration-300" }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favorites"
              className={({isActive})=> isActive ? "text-cyan-500" : "text-white hover:text-cyan-300 duration-300" }
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
