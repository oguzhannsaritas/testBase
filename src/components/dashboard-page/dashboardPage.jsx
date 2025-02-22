import {PricingCard} from "../pricing-page/pricingCard.jsx";
import {PricingCard2} from "../pricing-page/pricingCard2.jsx";
import {PricingCard3} from "../pricing-page/pricingCard3.jsx";
import {PricingCard4} from "../pricing-page/pricingCard4.jsx";


export function DashboardPage(){
    return(
        <div className=" flex  gap-12 ">
            <PricingCard/>
            <PricingCard2/>
            <PricingCard3/>
            <PricingCard4/>

        </div>
    )
}
