import React,{useContext} from "react"
import ThemeContext from "../context/ThemeContext"

const Card = ({children}) =>{
    const {darkMode,setDarkMode} = useContext(ThemeContext)
    return(
        <div className={`w-full h-full rounded-md 
                        relative p-8 border-2
                         bg-white 
                         border-neutral-200
                         ${darkMode?"bg-gray-800 border-gray-500":"bg-white border-neutral-200"}
                         `}>
            {children}
        </div>
    )
}

export default Card