import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { NavBar } from "./components/navBar.jsx";
import { HeroContent } from "./components/heroContent.jsx";
import { LoginPanel } from "./components/loginPanel.jsx";
import { SupportPanel } from "./components/supportPanel.jsx";
import { GradientBoxes } from "./components/gardienBoxes.jsx";
import { SignupPage } from "./components/signup-page/signupPage.jsx";

import './app.css';
import {BuyNow} from "./components/buy-now-page/buyNow.jsx";

function Layout() {
    const location = useLocation(); // Şu anki URL'yi al

    return (
        <div className="relative flex flex-col items-center justify-center">
            <NavBar />
            <Routes>
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPanel />} />
                <Route path="/buyNow" element={<BuyNow/>}/>
            </Routes>

            {/* Eğer "/signup" sayfasında değilsek bu bileşenleri göster */}
            {location.pathname !== "/signup" && location.pathname !== "/buyNow"  &&(
                <>
                    <HeroContent />
                    <GradientBoxes />
                    {/* Eğer "/login" sayfasında değilsek LoginPanel'i tekrar göster */}
                    {location.pathname !== "/login" && <LoginPanel />}
                    <div className="max-w-6xl flex justify-end items-end ml-5">
                        <SupportPanel />
                    </div>
                </>
            )}
        </div>
    );
}

export function App() {
    return (
        <Router>
            <Layout />
        </Router>
    );
}
