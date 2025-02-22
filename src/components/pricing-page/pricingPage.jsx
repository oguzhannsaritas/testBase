import {PricingCard} from "./pricingCard.jsx";
import {PricingCard2} from "./pricingCard2.jsx";
import {PricingCard3} from "./pricingCard3.jsx";
import {PricingCard4} from "./pricingCard4.jsx";

export function PricingPage(){
    return(
        <div className=" flex  gap-12 ">
            <PricingCard/>
            <PricingCard2/>
            <PricingCard3/>
            <PricingCard4/>

        </div>
    )
}
