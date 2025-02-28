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
        <form 
            className="mr-2"
            onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="search" 
                value={searchParam}
                placeholder="Ej: apples"
                onChange={(e) => setSearchParam(e.target.value)}
                className="bg-slate-200 text-teal-950 font-bold uppercase p-3 px-4 lg:px-8 rounded-3xl outline-none shadow-md shadow-black focus:shadow-teal-500 w-[150px] text-sm
                sm:w-52
                lg:w-96
                "
            />
        </form>
    </>
)}

export default InputSearch
