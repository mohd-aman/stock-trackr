import React from "react";
import { mockCompanyDetails } from "../constants/mock";
import Chart from "./Chart";
import Details from "./Details";
import Header from "./Header";
import Overview from "./Overview";

const Dashboard = () =>{
    return(
        <div className="h-screen grid grid-cols-1
         md:grid-cols-2 xl:grid-cols-3 grid-rows-8 
         md:grid-rows-7 xl:grid-rows-5 auto-rows-fr 
         gap-6 p-10 font-quicksand bg-neutral-100" >
            <div className="col-span-1 md:col-span-2
             xl:col-span-3 row-span-1">
                <Header name={mockCompanyDetails.name}/>
            </div>
            <div className="md:col-span-2 row-span-4">
                 <Chart></Chart>
            </div>
            <div>
                 <Overview symbol={mockCompanyDetails.ticker}
                            price={100}
                            change= {10.0}
                            changePercent={10.0}
                            currency="USD"
                 ></Overview>
            </div>
            <div className="row-span-2 xl:row-span-3">
                 <Details details={mockCompanyDetails}></Details>
            </div>
        </div>
    )
}

export default Dashboard