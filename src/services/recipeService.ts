import axios from "axios";
import { Recipe, RecipeDetailsResponse } from "../types/Recipe";
// import { translateToEnglish } from "./translateService";

const API_URL = "https://api.spoonacular.com";
const API_KEY = "084d6158d0de4d7fb300c45fcca326f3"

export const searchRecipesByIngredient = async (searchParam: string): Promise<Recipe[]> =>{
    try{
        // // Traduce cada ingrediente si es necesario
        // const translatedIngredients = await Promise.all(searchParam(translateToEnglish));

        // // Une los ingredientes traducidos en una sola cadena separada por comas
        // const query = translatedIngredients.join(",");

        // Llama a la API de Spoonacular
        const response = await axios.get<Recipe[]>(`${API_URL}/recipes/findByIngredients`,
            {
                params:{
                    ingredients: searchParam,
                    apiKey: API_KEY,
                },
            });

            console.log(response);
            return response.data;
    }catch(e){
        console.error("Error fetching recipes", e);
        throw e;
    }
}

export const getRecipeById = async (id:number) : Promise<RecipeDetailsResponse> => {
    try{
        const response = await axios.get<RecipeDetailsResponse>(`${API_URL}/recipes/${id}/ingredientWidget.json`,
            {
                params:{
                    id:id,
                    apiKey: API_KEY,
                },
            }
        )
        console.log(response)
        // Devolvemos directamente el objeto completo
        return response.data
    }catch(e){
        console.error("Error fetching recipe deteails",e);
        throw e;
    };
};
