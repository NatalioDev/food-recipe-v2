import { useContext } from "react"
import { GlobalContext } from "../../utilites/ContextRecipe"
import ItemRecipe from "../../components/ItemRecipe";

const Home = () => {

  // Obtenemos el contexto global
  const context = useContext(GlobalContext);

  // Verifica que el contexto esté disponible
  if(!context){
    throw new Error("Home must be used within a GlobalProvider");
  }

  // Destructuramos las propiedades del contexto
  const { recipeList, loading } = context;


  return (
    <div className="py-8 container mx-auto">
      {loading ? (
        <div className="text-center text-xl font-semibold text-gray-200">
          Loading... Please wait!
        </div>
      ): recipeList && recipeList.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-10">
          {recipeList.map((recipe) => (
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

export default Home
