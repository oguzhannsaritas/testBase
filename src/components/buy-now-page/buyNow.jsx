import { BuyNowContent } from "./buyNowContent.jsx";
import {BuyNowGradientBoxes,} from "./buyNowGardienBoxes.jsx";

export function BuyNow() {
    return (
        <div class="flex flex-col w-full ">

            <div className="flex flex-col absolute right-36 items-start w-full">
                <BuyNowContent/>
            </div>
            <div className="flex flex-col absolute left-30 items-end w-full">
                <BuyNowGradientBoxes/>
            </div>

        </div>
    );

}
