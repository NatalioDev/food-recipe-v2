import { NavLink } from "react-router-dom";
import InputSearch from "./InputSearch";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() =>{
    const handleResize = () =>{
      if(window.innerWidth >= 1024){
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize",handleResize);
  },[]); 

  return (
    <header className="bg-black/15 rounded-b-xl shadow-lg border-b-2 shadow-black/70 px-2">
      {/* Title app */}
      <div className="flex justify-between items-center py-8 mx-2 sm:ml-4 container lg:mx-auto flex-row gap-5">
        <h2 className="text-[16px] lg:text-2xl font-bold uppercase text-white drop-shadow-[3px_2px_2px_rgba(0,0,0,0.7)]">
          <NavLink to={"/"}>
            <span className="block sm:inline">Food</span> <span className="block sm:inline">Recipe</span>
          </NavLink>
        </h2>

        {/* Form search */}
        <InputSearch />

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-white mr-4 lg:ml-2 sm:-mr-10" onClick={() => setIsOpen(!isOpen)}>
          <Menu size={28} />
        </button>

        {/* Navigation */}
        <div
          className={`lg:flex lg:items-center lg:static lg:bg-transparent lg:p-0 lg:translate-x-0 lg:visible 
          ${isOpen ? "absolute top-0 right-0 bg-teal-950 p-2 w-48 h-28 rounded-b-xl flex flex-col items-center transition-transform duration-300 shadow-sm shadow-teal-950" : "hidden"}`}
        >
          <button className="absolute top-4 right-4 text-white lg:hidden" onClick={() => setIsOpen(false)}>
            <X size={26} />
          </button>
          <ul className="lg:flex lg:gap-4 pt-4 lg:pt-0">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-teal-400 font-bold uppercase [-webkit-text-stroke:0.5px_black] tracking-widest"
                    : "font-bold uppercase text-white drop-shadow-[3px_2px_2px_rgba(0,0,0,0.7)] hover:text-teal-500 duration-300 tracking-widest"
                }
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive
                    ? "text-teal-400 font-bold uppercase [-webkit-text-stroke:0.5px_black] tracking-widest"
                    : "font-bold uppercase text-white drop-shadow-[3px_2px_2px_rgba(0,0,0,0.7)] hover:text-teal-500 duration-300 tracking-widest"
                }
                onClick={() => setIsOpen(false)}
              >
                Favorites
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
