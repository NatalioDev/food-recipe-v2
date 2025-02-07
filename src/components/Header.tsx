import { NavLink } from "react-router-dom"
import InputSearch from "./InputSearch"

const Header = () => {

  return (
    <header>
        {/* Title app */}
        <div className="">
            <h2 className="text-2xl font-semibold">
                <NavLink to={"/"}>Food Recipe</NavLink>
            </h2>
        </div>
        
        {/* Form search */}
        <InputSearch/>
    </header>
  )
}

export default Header
