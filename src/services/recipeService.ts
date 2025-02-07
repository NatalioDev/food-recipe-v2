import axios from "axios";
import { Recipes } from "../types/Recipe";
import { translateToEnglish } from "./translateService";

const API_URL = "https://api.spoonacular.com";
const API_KEY = "084d6158d0de4d7fb300c45fcca326f3"

export const searchRecipesByIngredient = async (ingredients: string[]): Promise<Recipes[]> =>{
    try{
        // Traduce cada ingrediente si es necesario
        const translatedIngredients = await Promise.all(ingredients.map(translateToEnglish));

        // Une los ingredientes traducidos en una sola cadena separada por comas
        const query = translatedIngredients.join(",");

        // Llama a la API de Spoonacular
        const response = await axios.get<Recipes[]>(`${API_URL}/recipes/findByIngredients`,
            {
                params:{
                    ingredients: query,
                    apiKey: API_KEY,
                },
            });

            console.log(response.data);
            return response.data;
    }catch(e){
        console.error("Error fetching recipes", e);
        throw e;
    }
}

// export const getRecipeById = async (id:string) : Promise<RecipeDetailsResponse> => {
//     try{
//         const response = await axios.get<RecipeDetailsResponse>(`${API_URL}/recipes/${id}`)

//         console.log(response)

//         // Devolvemos directamente el objeto completo
//         return response.data
//     }catch(e){
//         console.error("Error fetching recipe deteails",e);
//         throw e;
//     };
// };
