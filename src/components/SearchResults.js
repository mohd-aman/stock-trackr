import React,{ useContext, useState } from "react"
import StockContext from "../context/StockContext";
import ThemeContext from "../context/ThemeContext"


const SearchResults = ({results,isClicked,setIsClicked})=>{
    const {darkMode,setDarkMode} = useContext(ThemeContext);
    const {setStockSymbol} = useContext(StockContext)
    
    if(isClicked == "true"){
      return null
    }

    return (<ul className={`absolute top-12 border-2
                        w-full roudner-md h-64
                        overflow-y-scroll bg-white
                      border-neutral-200 custom-scrollbar
                        ${darkMode?"bg-gray-800 border-gray-800 custom-scrollbar custom-scrollbar-dark":
                        "bg-white border-neutral-200 custom-scrollbar"
                    }
                      `}>
            {results.map((item)=>{
               return <li key={item.symbol} 
                        className={`cursor-pointer 
                         p-4 m-2 flex items-center
                        justify-between rounded-md
                        ${darkMode?"hover:bg-indigo-600":"hover:bg-indigo-200"}
                        transitino duration-300`}
                        onClick={()=>{
                            
                            setStockSymbol(item.symbol);
                            setIsClicked("true");
                        }}
                        >
                        <span>{item.symbol}</span>
                        <span>{item.description}</span>
                </li>
            })}
    </ul>
)}

export default SearchResults