import { useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom"
import { GlobalContext } from "../../utilites/ContextRecipe";
import { getRecipeById } from "../../services/recipeService";

const Details = () => {

  // Obtenemos el parámetro "id" desde la url
  const { id } = useParams<{id:string}>();
  const numericId = id ? parseInt(id, 10) : undefined;

  const { state } = useLocation();
  const { title, image } = state || {};


  const context = useContext(GlobalContext);

  // Validamos que el contexto esté disponible
  if(!context){
    throw new Error("Details must be used within a GlobalProvider");
  }

  const {
    recipeDetailsData,
    setRecipeDetailsData,
    handleAddToFavorite,
  } = context;


  useEffect(() => {
    const fetchRecipeDetails = async () =>{
      if(numericId === undefined) return;
      try{
        const data = await getRecipeById(numericId);

        // Guardamos los datos obtenidos en el estado global
        if(data){
          setRecipeDetailsData(data.ingredients)
        }
      } catch(e){
        console.error("Error fetching recipe details.", e);
      }
    };
    fetchRecipeDetails();
  },[numericId, setRecipeDetailsData])

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
      {/* Imagen de la receta */}
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover block group-hover:scale-105 duration-300" 
          />
        </div>
      </div>
      {/* Detalles de la receta */}
      <div className="flex flex-col gap-3">
        <h3 className="font-bold text-2xl truncate text-black">
          {title}
        </h3>
        <button 
          onClick={() => numericId !== undefined && handleAddToFavorite(numericId)}
          className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white"
          >Add to favorites
        </button>
        {/* Lista de ingredientes */}
        <div>
          <span className="text-2xl font-semibold text-black">
          Ingredients:
          </span>
          <ul className="flex flex-col gap-3">
            {recipeDetailsData?.map((ingredient, index) => (
              <li key={index}>
                <span className="text-lg font-medium text-black capitalize">
                  {ingredient.name}
                </span>
            </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Details
