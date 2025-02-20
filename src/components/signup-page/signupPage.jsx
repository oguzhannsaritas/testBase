import { SignupPanel } from "./signupPanel.jsx";
import {HeroContentSignup} from "./contentSignup.jsx";
import {GradientBoxesSignup} from "./gardianBoxesSingup.jsx";
import {SupportPanel} from "../supportPanel.jsx";

export function SignupPage() {
    return (
        <div className="flex flex-col items-center justify-center ">
            <SignupPanel />
            <HeroContentSignup/>
            <GradientBoxesSignup/>
            <SupportPanel/>
        </div>
    );
}
