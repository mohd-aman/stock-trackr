import React, { useContext, useEffect, useState } from "react";
import { fetchQuote, fetchStocksDetails } from "../api/stock.api";
import StockContext from "../context/StockContext";
import ThemeContext from "../context/ThemeContext";
import Chart from "./Chart";
import Details from "./Details";
import Header from "./Header";
import Overview from "./Overview";

const Dashboard = () =>{
    const {darkMode,setDarkMode} = useContext(ThemeContext)
    const {stockSymbol} = useContext(StockContext);
    const [stockDetails,setStockDetails] = useState({});
    const [quote,setQuote] = useState({});

    useEffect(()=>{
        const updateStockDetails = async () => {
            try{
                const result = await fetchStocksDetails(stockSymbol);
                setStockDetails(result);
            }catch(error){
                setStockDetails({});
                console.log(error);
            }
        }

        const updateStockOverview = async () => {
            try{
                const result = await fetchQuote(stockSymbol);
                setQuote(result);
            }catch(error){
                setQuote({});
                console.log(error);
            }
        }
        updateStockDetails();
        updateStockOverview();
    },[stockSymbol])

    return(
        <div className={`h-screen grid grid-cols-1
         md:grid-cols-2 xl:grid-cols-3 grid-rows-8 
         md:grid-rows-7 xl:grid-rows-5 auto-rows-fr 
         gap-6 p-10 font-quicksand bg-neutral-100
         ${darkMode?"bg-gray-800 text-gray-300":"bg-neutral-100"}
         `} >
            <div className="col-span-1 md:col-span-2
             xl:col-span-3 row-span-1">
                <Header name={stockDetails.name}/>
            </div>
            <div className="md:col-span-2 row-span-4">
                 <Chart></Chart>
            </div>
            <div>
                 <Overview symbol={stockDetails.ticker}
                            price={quote.pc}
                            change= {quote.d}
                            changePercent={quote.dp}
                            currency={stockDetails.currency}
                 ></Overview>
            </div>
            <div className="row-span-2 xl:row-span-3">
                 <Details details={stockDetails}></Details>
            </div>
        </div>
    )
}

export default Dashboard