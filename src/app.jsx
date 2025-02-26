import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { NavBar } from "./components/navBar.jsx";
import { HeroContent } from "./components/heroContent.jsx";
import { LoginPanel } from "./components/loginPanel.jsx";
import { SupportPanel } from "./components/supportPanel.jsx";
import { GradientBoxes } from "./components/gardienBoxes.jsx";
import { SignupPage } from "./components/signup-page/signupPage.jsx";
import { PricingPage } from "./components/pricing-page/pricingPage.jsx";
import { BuyNow } from "./components/buy-now-page/buyNow.jsx";
// Dashboard sayfasını import ediyoruz
import { DashboardPage } from "./components/dashboard-page/dashboardPage.jsx";

import './app.css';

function Layout() {
    const location = useLocation(); // Şu anki URL'yi almak için

    return (
        <div className="relative flex flex-col items-center justify-center ">
            {location.pathname !== "/dashboard" && <NavBar />}
            <Routes>
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPanel />} />
                <Route path="/buyNow" element={<BuyNow />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />

            </Routes>

            {/* Bu rotalardaysak ana sayfa bileşenlerini (hero, gradientBoxes vs.) göstermemek için bir kontrol */}
            {location.pathname !== "/signup" &&
                location.pathname !== "/buyNow" &&
                location.pathname !== "/pricing" &&
                location.pathname !== "/dashboard" && (
                    <>
                        <HeroContent />
                        <GradientBoxes />
                        {/* /login sayfasında zaten LoginPanel var, tekrar göstermiyoruz */}
                        {location.pathname !== "/login" && <LoginPanel />}
                        <div className="flex justify-end items-end ml-5">
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
