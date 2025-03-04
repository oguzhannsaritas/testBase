import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { NavBar } from "./components/navBar.jsx";
import { HeroContent } from "./components/heroContent.jsx";
import { LoginPanel } from "./components/loginPanel.jsx";
import { SupportPanel } from "./components/supportPanel.jsx";
import { GradientBoxes } from "./components/gardienBoxes.jsx";
import { SignupPage } from "./components/signup-page/signupPage.jsx";
import { PricingPage } from "./components/pricing-page/pricingPage.jsx";
import { BuyNow } from "./components/buy-now-page/buyNow.jsx";
import { DashboardPage } from "./components/dashboard-page/dashboardPage.jsx";
import FloatingPaths from "./components/floatingPaths"; // FloatingPaths bileşeni eklendi

import './app.css';
import { useEffect } from "react";
import { createRoot } from "react-dom/client";

function Layout() {
    const location = useLocation();
    const isDashboard = location.pathname === "/dashboard";

    useEffect(() => {
        if (isDashboard) {
            document.body.classList.add("dashboard-bg");

            // Eğer daha önce eklenmemişse, FloatingPaths bileşeni için container oluştur
            if (!document.getElementById("floatingPathsContainer")) {
                const floatingPathsContainer = document.createElement("div");
                floatingPathsContainer.className = "floating-paths-container";
                floatingPathsContainer.id = "floatingPathsContainer";
                document.body.appendChild(floatingPathsContainer);

                // React bileşenini içine ekle
                const root = createRoot(floatingPathsContainer);
                root.render(<FloatingPaths position={1} />);
            }
        } else {
            document.body.classList.remove("dashboard-bg");

            // Eğer dashboard'dan çıkıldıysa FloatingPaths'i kaldır
            const existingContainer = document.getElementById("floatingPathsContainer");
            if (existingContainer) existingContainer.remove();
        }
    }, [isDashboard]);

    return (
        <div className="relative flex flex-col items-center justify-center w-full">
            {!isDashboard && (
                <video autoPlay loop muted className="video-background">
                    <source src="/06.mp4" type="video/mp4" />
                    Tarayıcınız video etiketini desteklemiyor.
                </video>
            )}

            {location.pathname !== "/dashboard" && <NavBar />}
            <Routes>
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPanel />} />
                <Route path="/buyNow" element={<BuyNow />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>

            {location.pathname !== "/signup" &&
                location.pathname !== "/buyNow" &&
                location.pathname !== "/pricing" &&
                location.pathname !== "/dashboard" && (
                    <>
                        <HeroContent />
                        <GradientBoxes />
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
