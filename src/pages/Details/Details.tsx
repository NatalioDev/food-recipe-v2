import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { GlobalContext } from "../../utilites/ContextRecipe";
import { getRecipeById } from "../../services/recipeService";
import { RecipeDetailsResponse } from "../../types/Recipe";

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
    <div className="container mx-auto py-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
      {/* Imagen de la receta */}
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img 
            src={recipeDetails?.strMealThumb || "https://via.placeholder.com/300"} 
            alt={recipeDetails?.strMeal || "Recipe Image"} 
            className="w-full h-full object-cover block group-hover:scale-105 duration-300" 
          />
        </div>
      </div>
      {/* Detalles de la receta */}
      <div className="flex flex-col gap-3">
        <h3 className="font-bold text-2xl truncate text-black">
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
          className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white"
          >Add to favorites
        </button>

        {/* Description */}
        <div>
          <h4 className="text-2xl font-semibold text-black">Instructions:</h4>
          <p className="text-lg text-gray-200 mt-2 whitespace-pre-line">
            {recipeDetails?.strInstructions || "No instructions available."}
          </p>
        </div>
        
        {/* Lista de ingredientes */}
        <div>
          <h4 className="text-2xl font-semibold text-gray-300">Ingredients:</h4>
          <ul className="flex flex-col gap-2 mt-2">
            {getIngredients().map((ingredient, index) => (
              <li key={index}>
                <span className="text-lg font-medium text-gray-500 capitalize">
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
