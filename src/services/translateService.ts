import axios from "axios";

export const translateToEnglish = async ( ingredient: string ): Promise<string> =>{
        try{
            const response = await axios.post("https://libretranslate.com/translate", 
            {
                q: ingredient,
                source: "es",
                target: "en",
                format: "text",
            },{
                headers: { "Content-Type": "application/json"},
            });
            return response.data.translatedText;
        }catch(e){
            console.error("Error translating ingredient:", e);
            throw e;
        }
}