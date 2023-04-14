import React, { useContext, useState } from "react"
import {XIcon,SearchIcon} from "@heroicons/react/solid"
import SearchResults from "./SearchResults"
import ThemeContext from "../context/ThemeContext"
import { searchSymbols } from "../api/stock.api"

const Search = () =>{
    const [input,setInput] = useState("");
    const [bestMatches,setBestMatches] = useState([])
    const {darkMode,setDarkMode} = useContext(ThemeContext)
    const clear = () => {
        setInput("");
        setBestMatches([]);
    };

    const updateBestMatches = async ()=>{
        try{
            if(input){
                const SearchResults = await searchSymbols(input);
                const result = SearchResults.result;
                setBestMatches(result)
            }
        }catch(error){
            setBestMatches([]);
            console.log(error);
        }
    }

    return(
        <div className={`flex items-center my-4 border-2
            rounded-md relative z-50 w-96 bg-white
             border-neutral-200
             ${darkMode? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"}
             `}>
            <input
            type="text"
            value ={input}
            className={`w-full px-4 focus:outline-none rounded-md ${darkMode?"bg-gray-900":null}`}
            placeholder="Search Stocks..."
            onChange={(e)=>setInput(e.target.value)}
            onKeyPress={(e)=>{
                if(e.key === "Enter"){
                    updateBestMatches()
                }
            }}
            />
            {input && (
            <button onClick={clear} className="m-1"> 
                <XIcon className="h-6 w-6 p-1 fill-gray-500"/>
            </button>
            )}

            <button onClick={updateBestMatches}
             className="h-8 w-8 bg-indigo-600 flex
              justify-center items-center m-1 p-2 rounded-md transition duration-300 hover:ring-2 ring-indigo-400">
                  <SearchIcon className="h-6 w-6 fill-gray-100 "></SearchIcon>
            </button>

            {input && bestMatches.length>0 ? <SearchResults results={bestMatches}></SearchResults>:null}
        </div>
    )
}

export default Search