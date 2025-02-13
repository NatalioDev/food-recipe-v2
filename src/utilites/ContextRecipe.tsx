import { createContext, FormEvent, ReactNode, useEffect, useState } from "react";
import { RecipeDetailsResponse, Recipe } from "../types/Recipe";
import { useNavigate } from "react-router-dom";
import { searchRecipesByIngredient } from "../services/recipeService";


interface GlobalContextProps {
    searchParam: string;
    setSearchParam: (param: string) => void;
    loading: boolean;
    recipeList: Recipe[];
    recipeDetailsData: RecipeDetailsResponse[] | null;
    setRecipeDetailsData: (data: RecipeDetailsResponse[] | null) => void;
    favoritesList: Recipe[];
    error: string | null;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
    handleAddToFavorite: (recipe: Recipe) => void;
}

export const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalStateProps{
    children: ReactNode;
}

export const GlobalState = ({ children } : GlobalStateProps) => {

    const [searchParam, setSearchParam] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [recipeList, setRecipeList] = useState<Recipe[]>([]);
    const [recipeDetailsData, setRecipeDetailsData] = useState<RecipeDetailsResponse[] | null>(null);
    const [favoritesList, setfavoritesList] = useState<Recipe[]>([]);
    const [error, setError] = useState<string | null>(null)

    const navigate = useNavigate();

    // Cargar favoritos de localStorage el iniciar
    useEffect(() =>{
        const storedFavorites = localStorage.getItem("favoritesList");
        if(storedFavorites){
            setfavoritesList(JSON.parse(storedFavorites));
        }
    },[]);

    // Guarda favoritos en localStorage cada vez que cambien
    useEffect(() =>{
        localStorage.setItem("favoritesList", JSON.stringify(favoritesList));
    },[favoritesList]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Asegurar que tenga al menos un ingrediente
        if(searchParam.length === 0) return;
        
        setLoading(true);
        
        // Reiniciar errores
        setError(null);
        
        try {
            const recipes = await searchRecipesByIngredient(searchParam);
            console.log(recipes)
            setRecipeList(recipes);
            navigate("/");
        } catch (error) {
            console.error("Error fetching context: ",error);
            setError("No se pudieron cargar las recetas. Inténtalo de nuevo.");
        } finally{
            setLoading(false);
        }
    }

    const handleAddToFavorite = (recipe : Recipe) => {
        
        if (favoritesList.some((item) => item.id === recipe.id)){
            setfavoritesList(favoritesList.filter((item) => item.id !== recipe.id));
        }else{
            setfavoritesList([...favoritesList,recipe]);
        }
    };

    return(
        <GlobalContext.Provider
            value={{
                searchParam,
                setSearchParam,
                loading,
                recipeList,
                recipeDetailsData,
                favoritesList,
                error,
                handleSubmit,
                setRecipeDetailsData,
                handleAddToFavorite,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}