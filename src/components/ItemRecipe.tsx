import { Link } from "react-router-dom";
import { useState } from "react";

const ItemRecipe = ({ title, image, id }: { title: string; image: string; id: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = (hovering: boolean) => setIsHovered(hovering);

  return (
    <div
      className="relative flex flex-col w-80 h-80 overflow-hidden bg-black/50 shadow-xl border-2 rounded-2xl border-teal-900"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      onClick={() => handleHover(!isHovered)} // Para dispositivos móviles
    >
      {/* Imagen siempre visible */}
      <div className="h-full w-full">
        <img src={image} alt="recipe" className="block w-full h-full object-cover" />
      </div>

      {/* Contenido que aparece con el reveal */}
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 flex flex-col justify-center items-center gap-5 p-5 ${
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <h3 className="font-bold text-2xl capitalize text-teal-400 text-center line-clamp-2 overflow-hidden">
          {title}
        </h3>
        <Link
          to={`/recipe-details/${id}`}
          className="text-sm p-3 px-4 rounded-lg uppercase tracking-wider inline-block shadow-md bg-teal-700 text-white font-semibold"
        >
          Recipe Details
        </Link>
      </div>
    </div>
  );
};

export default ItemRecipe;
