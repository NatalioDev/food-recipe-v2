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

  // Mensaje de cargando
  if(loading) return <div>Loading... Please wait!</div>

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {recipeList && recipeList.length > 0 ? (
        recipeList.map((i) => 
        <ItemRecipe
          key={i.id}
          title={i.title}
          image={i.image}
          id={i.id}
        />)
      ):(
        <div className="text-xl text-center text-black font-extrabold lg:text-4xl">
          Nothing to show. Please search something.
        </div>
      )}
    </div>
  )
}

export default Home
