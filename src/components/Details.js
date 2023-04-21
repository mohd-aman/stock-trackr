import { useContext } from "react"
import StockContext from "../context/StockContext"
import ThemeContext from "../context/ThemeContext"
import Card from "./Card"


const Details = ({details}) => {
    const {darkMode,setDarkMode} = useContext(ThemeContext)
    const {stockSymbol} = useContext(StockContext)
    const detailsList = {
        name:"Name",
        country:"India",
        currency:"Currency",
        exchange:"Exchange",
        ipo:"IPO Date",
        marketCapitalization:"Market Capitalization",
        finnhubIndustry:"Industry",
    }
    
    const convertMillionToBillion = (number)=>{
        return (number/1000).toFixed(2);
    }

    return (
        <Card>
            <ul className={`w-full h-full flex flex-col justify-between divide-y-1
                             ${darkMode ? "divide-gray-800":null}
                            `}>
                {Object.keys(detailsList).map((item)=>{
                    return(
                        <li key={item} className="flex-1 flex justify-between items-center">
                            <span>{item}</span>
                            <span>
                                {item == "marketCapitalization"? 
                                `${convertMillionToBillion(details[item])}B`
                                :details[item]}
                            </span>
                        </li>
                    )
                })}
            </ul>
        </Card>
    )
}

export default Details