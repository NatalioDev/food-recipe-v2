export type Recipes = {
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