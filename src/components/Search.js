import React, { useState } from "react"
import {mockSearchResults} from "../constants/mock"
import {XIcon,SearchIcon} from "@heroicons/react/solid"
import SearchResults from "./SearchResults"

const Search = () =>{
    const [input,setInput] = useState("");
    const [bestMatches,setBestMatches] = useState(mockSearchResults.result)
    
    const clear = () => {
        setInput("");
        setBestMatches([]);
    };

    const updateBestMatches = ()=>{
        setBestMatches(mockSearchResults.result);
    }

    return(
        <div className="flex items-center my-4 border-2
            rounded-md relative z-50 w-96 bg-white
             border-neutral-200">
            <input
            type="text"
            value ={input}
            className="w-full px-4 focus:outline-none rounded-md"
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
              justify-center items-center m-1 p-2 rounded-md">
                  <SearchIcon className="h-6 w-6 fill-gray-100 "></SearchIcon>
            </button>

            {input && bestMatches.length>0 ? <SearchResults results={bestMatches}></SearchResults>:null}
        </div>
    )
}

export default Search