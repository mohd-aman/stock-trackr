import React, { useContext, useEffect, useState } from "react"
import {XIcon,SearchIcon} from "@heroicons/react/solid"
import SearchResults from "./SearchResults"
import ThemeContext from "../context/ThemeContext"
import { searchSymbols } from "../api/stock.api"

const Search = () =>{
    const [input,setInput] = useState("");
    const [bestMatches,setBestMatches] = useState([])
    const [isClicked,setIsClicked] = useState("false")
    const {darkMode,setDarkMode} = useContext(ThemeContext)
    const clear = () => {
        setInput("");
        setBestMatches([]);
    };

    useEffect(()=>{
        const timeOutId = setTimeout(updateBestMatches,1000);
        return ()=>{
            clearTimeout(timeOutId);
        }
    },[input])

    const updateBestMatches = async ()=>{
        try{
            if(input){
                const SearchResults = await searchSymbols(input);
                const result = SearchResults.result;
                const filteredResult = result.filter((item)=>{
                    const symbol = item.symbol+""
                    return !symbol.includes(".");
                })
                setBestMatches(filteredResult)
                setIsClicked("false");
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
             ${darkMode? "bg-gray-800 border-gray-800" : "bg-white border-neutral-200"}
             `}>
            <input
            type="text"
            value ={input}
            className={`w-full px-4 focus:outline-none rounded-md ${darkMode?"bg-gray-800":null}`}
            placeholder="Search Stocks..."
            onChange={(e)=>setInput(e.target.value)}

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

            {input && bestMatches.length>0 ? <SearchResults results={bestMatches} isClicked={isClicked} setIsClicked={setIsClicked}></SearchResults>:null}
        </div>
    )
}

export default Search