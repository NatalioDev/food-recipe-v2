import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { GlobalContext } from "../../utilites/ContextRecipe";
import { getRecipeById } from "../../services/recipeService";
import { RecipeDetailsResponse } from "../../types/Recipe";
import { FaStar } from "react-icons/fa";



const Details = () => {

  // Obtenemos el parámetro "id" desde la url
  const { id } = useParams<{id:string}>();

  const [recipeDetails, setRecipeDetails] = useState<RecipeDetailsResponse | null>(null);


  const context = useContext(GlobalContext);

  // Validamos que el contexto esté disponible
  if(!context){
    throw new Error("Details must be used within a GlobalProvider");
  }
  const {
    handleAddToFavorite,
    isFavorite,
  } = context;


  useEffect(() => {
    const fetchRecipeDetails = async () =>{
      if(!id) return;
      try{
        const data = await getRecipeById(id);

        setRecipeDetails(data)
      } catch(e){
        console.error("Error fetching recipe details.", e);
      }
    };
    fetchRecipeDetails();
  },[id]);

  // Extraer los ingredientes y medidas de recipeDetails
  const getIngredients = () =>{
    if(!recipeDetails) return [];
    const ingredients = [];
    for (let i=1; i <=20; i++){
      const ingredient = recipeDetails[`strIngredient${i}` as keyof RecipeDetailsResponse];
      const measure = recipeDetails[`strMeasure${i}` as keyof RecipeDetailsResponse];

      if(ingredient && ingredient.trim() !== ""){
        ingredients.push(`${measure || ""} ${ingredient}`.trim())
      }
    }
    return ingredients;
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-10 lg:px-64 py-10 grid grid-cols-1 gap-10">
      {/* Imagen de la receta */}
      <div className="lg:row-start-auto">
        <div className="h-auto max-h-full overflow-hidden rounded-xl group shadow-lg shadow-black/50">
          <img 
            src={recipeDetails?.strMealThumb || "https://via.placeholder.com/300"} 
            alt={recipeDetails?.strMeal || "Recipe Image"} 
            className="w-full h-full object-cover block group-hover:scale-105 duration-300" 
          />
        </div>
      </div>

      {/* Detalles de la receta */}
      <div className="bg-black/20 px-4 py-4 rounded-lg shadow-sm shadow-white sm:px-6">
      {/* Título y botón de favoritos */}
      <div className="flex flex-col items-center">
        <div className=" flex items-center gap-3">
          <h3 className="font-bold text-xl capitalize text-white drop-shadow-[3px_2px_2px_rgba(0,0,0,0.7)] sm:text-2xl md:text-3xl">
            {recipeDetails?.strMeal || "Recipe Title"}
          </h3>
          <button 
          onClick={() => {
            if(recipeDetails){
            const recipe = {
              id: recipeDetails.idMeal,
              title: recipeDetails.strMeal,
              image: recipeDetails.strMealThumb,
            };
            handleAddToFavorite(recipe);
          }
          }}
          className={`text-2xl ml-2 mb-1 transition duration-150 
            ${isFavorite(recipeDetails?.idMeal || '') ? "text-yellow-500" : "text-white"}
            hover:text-yellow-500 hover:text-3xl`}
          >
            <FaStar/>
        </button>
        </div>

        {/* Description */}
        <div className="px-2 sm:px-4 py-2">
          <h4 className="text-lg font-semibold text-white drop-shadow-[3px_2px_2px_rgba(0,0,0,0.7)] sm:text-xl md:text-2xl">Instructions:</h4>
          <p className="text-base text-white mt-2 whitespace-pre-line leading-relaxed sm:text-lg">
            {recipeDetails?.strInstructions || "No instructions available."}
          </p>
        </div>

        
      </div>
      {/* Lista de ingredientes */}
      <div className="py-4 ml-2 sm:ml-3">
          <h4 className="text-lg mb-2 font-semibold text-white drop-shadow-[3px_2px_2px_rgba(0,0,0,0.7)] text-center sm:text-xl sm:text-left md:text-2xl">Ingredients:</h4>
          <ul className="flex flex-col gap-1 ml-2 sm:gap-2 text-center sm:text-left">
            {getIngredients().map((ingredient, index) => (
              <li key={index}>
                <span className="text-base mt-0 text-gray-300 font-bold capitalize sm:text-lg">
                  {ingredient}
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
