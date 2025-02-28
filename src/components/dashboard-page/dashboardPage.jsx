import { Banner } from "./banner.jsx";
import TestStepsButtons from "./testStepsButtons.jsx";
import { TestPanel } from "./testPanel.jsx";
import { useState } from "react";
import { TestSteps } from "./testSteps.jsx";
// UUID veya benzeri bir kütüphane kullanabilirsiniz:
import { v4 as uuidv4 } from "uuid";
import {TestFailureWindow} from "./testFailureWindow.jsx";
import {LocationsButton} from "./locationsButton.jsx";
import {WebVersionsButton} from "./webVersionsButton.jsx";
import {TestTypesButton} from "./testTypesButton.jsx";
import {BlockButton} from "./blockButton.jsx";

export function DashboardPage() {
    const [selectedSteps, setSelectedSteps] = useState([]);

    const handleAddStep = (stepLabel) => {
        // Eklenirken her step'e bir id atayalım
        const newStep = {
            id: uuidv4(),   // benzersiz id
            label: stepLabel
        };
        setSelectedSteps((prev) => [...prev, newStep]);
    };

    const handleClearSteps = () => {
        setSelectedSteps([]);
    };

    const handleRemoveStep = (stepId) => {
        // stepId'ye göre filtreleyerek siliyoruz
        setSelectedSteps((prev) => prev.filter((step) => step.id !== stepId));
    };

    return (
        <div className="flex flex-col w-full relative">
            <Banner/>
            <div className="flex relative  -left-[236px] flex-col w-full">
                <TestStepsButtons onAddStep={handleAddStep}/>
            </div>
            <TestPanel
                steps={selectedSteps}
                onClearSteps={handleClearSteps}
                onRemoveStep={handleRemoveStep}

            />
            <div className="fixed  flex   justify-between  ">
                <LocationsButton/>
                <BlockButton/>

                <WebVersionsButton/>


                <TestTypesButton/>
            </div>
            <TestSteps/>

                <TestFailureWindow/>
        </div>
    );
}
