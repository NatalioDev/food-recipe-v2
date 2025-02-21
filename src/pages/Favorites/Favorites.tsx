import { useContext } from "react"
import { GlobalContext } from "../../utilites/ContextRecipe"
import ItemRecipe from "../../components/ItemRecipe";

const Favorites = () => {

  // Obtenemos el contexto global
  const context = useContext(GlobalContext);

  // Verifica que el contexto esté disponible
  if(!context){
    throw new Error("Home must be used within a GlobalProvider");
  }

  // Destructuramos las propiedades del contexto
  const { favoritesList, loading } = context;


  return (
    <div className="py-8 container mx-auto">
      {loading ? (
        <div className="text-center text-xl font-semibold text-gray-200">
          Loading... Please wait!
        </div>
      ): favoritesList && favoritesList.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-10">
          {favoritesList.map((recipe) => (
            <ItemRecipe
              key={recipe.id}
              title={recipe.title}
              image={recipe.image}
              id={recipe.id}
            />
          ))}
        </div>
      ):(
        <div className="text-center text-2xl font-bold text-white mt-10">
          No recipes found. Please try another search.
        </div>
      )}
    </div>
  )
}

export default Favorites
