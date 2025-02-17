import { useState } from 'preact/hooks';
import './app.css';
import { GradientBoxes } from "./components/gardienBoxes.jsx";
import { NavBar } from "./components/navBar.jsx";
import {HeroContent} from "./components/heroContent.jsx";
import {LoginPanel} from "./components/loginPanel.jsx";
import {SupportPanel} from "./components/supportPanel.jsx";









export function App() {
    return (
        <div className="relative flex flex-col items-center justify-center   ">
            <NavBar/>
            <HeroContent/>
            <LoginPanel/>
            <GradientBoxes/>
            <div className=" max-w-6xl flex justify-end items-end ml-5">
                <SupportPanel/>
            </div>
        </div>
    );
}
