export type Recipe = {
    id:                    number;
    title:                 string;
    image:                 string;
    imageType:             ImageType;
    usedIngredientCount:   number;
    missedIngredientCount: number;
    missedIngredients:     SedIngredient[];
    usedIngredients:       SedIngredient[];
    unusedIngredients:     any[];
    likes:                 number;
  }

  export interface RecipeResponse{
    data: {
      recipes: Recipe[];
    }
  }
  
  export enum ImageType {
    Jpg = "jpg",
  }
  
  export type SedIngredient = {
    id:            number;
    amount:        number;
    unit:          string;
    unitLong:      string;
    unitShort:     string;
    aisle:         string;
    name:          string;
    original:      string;
    originalName:  string;
    meta:          string[];
    extendedName?: string;
    image:         string;
  }

  export type RecipeDetailsResponse ={
    ingredients: Ingredient[];
  }

  export type Ingredient = {
    amount: Amount;
    image:  string;
    name:   string;
}

export type Amount = {
    metric: Metric;
    us:     Metric;
}

export type Metric = {
    unit:  string;
    value: number;
}