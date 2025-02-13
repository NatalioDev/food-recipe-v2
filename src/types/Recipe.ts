export interface Recipe {
  id: string;
  title: string;
  image: string;
}

export interface RecipeDetailsResponse {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strTags: string | null;
  strYoutube: string | null;
  [key: string]: string | null;
}
