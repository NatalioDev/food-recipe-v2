import { useContext } from "react";
import { GlobalContext } from "../utilites/ContextRecipe";


const InputSearch = () => {

    const context = useContext(GlobalContext);

    if(!context){
        console.log("Header must be used within a GlobalProvider");
        return null;
    }

    const { searchParam, setSearchParam, handleSubmit} = context;
  return (
    <>
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="search" 
                value={searchParam}
                placeholder="Ej: apples,flour,sugar"
                onChange={(e) => setSearchParam(e.target.value)}
                className="bg-white/75 p-3 px-8 rounded-full outline-none shadow-lg shadow-red-100 focus:shadow-red-200
                lg:w-96
                "
            />
        </form>
    </>
)}

export default InputSearch
