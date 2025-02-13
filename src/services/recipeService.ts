import axios from "axios";
import { Recipe, RecipeDetailsResponse } from "../types/Recipe";
// import { translateToEnglish } from "./translateService";

const API_URL = "https://www.themealdb.com/api/json/v1/1";

export const searchRecipesByIngredient = async (searchParam: string): Promise<Recipe[]> =>{
    try{

        // Llama a la API
        const response = await axios.get(`${API_URL}/filter.php`,
            {
                params:{
                    i: searchParam,
                },
            });

            console.log(response);

            if(response.data.meals){
                // Mapear los datos para ajustarse a tu estructura de Recipe
                return response.data.meals.map((meal: any) => ({
                    id: meal.idMeal,
                    title: meal.strMeal,
                    image: meal.strMealThumb,
                }));
            }else{
                return [];
            }
    }catch(e){
        console.error("Error fetching recipes", e);
        throw e;
    }
}

export const getRecipeById = async (id:string) : Promise<RecipeDetailsResponse> => {
    try{
        const response = await axios.get(`${API_URL}/lookup.php`,
            {
                params:{
                    i:id,
                },
            });
        console.log(response)
        
        if(response.data.meals && response.data.meals.length > 0){
            // Devolver directamente el primer resultado, ya que la busqueda por ID solo devuelve una receta
            return response.data.meals[0];
        }else{
            throw new Error("Recipe not found");
        }
    }catch(e){
        console.error("Error fetching recipe deteails",e);
        throw e;
    };
};
