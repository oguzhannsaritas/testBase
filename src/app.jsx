import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { NavBar } from "./components/navBar.jsx";
import { HeroContent } from "./components/heroContent.jsx";
import { LoginPanel } from "./components/loginPanel.jsx";
import { SupportPanel } from "./components/supportPanel.jsx";
import { GradientBoxes } from "./components/gardienBoxes.jsx";
import { SignupPage } from "./components/signup-page/signupPage.jsx";
import './app.css';

function Layout() {
    const location = useLocation(); // Şu anki URL'yi al

    return (
        <div className="relative flex flex-col items-center justify-center">
            <NavBar />
            <Routes>
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPanel />} />
            </Routes>

            {/* Eğer şu anki sayfa "/signup" veya "/login" ise, diğer componentleri gösterme */}
            {location.pathname !== "/signup"  && (
                <>
                    <HeroContent />
                    <LoginPanel />
                    <GradientBoxes />
                    <div className="max-w-6xl flex justify-end items-end ml-5">
                        <SupportPanel />
                    </div>
                </>
            )}
            { location.pathname !== "/login" && (
                <>

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
