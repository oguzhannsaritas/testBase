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
import {ShareEmail} from "./shareEmail.jsx";
import {RecordWindows} from "./recordWindows.jsx";

export function DashboardPage() {
    const [selectedSteps, setSelectedSteps] = useState([]);
    const [modalContent, setModalContent] = useState(null);


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
            <ShareEmail/>

            <TestSteps/>

                <TestFailureWindow/>
            <div className="flex flex-col w-full justify-center">
                 <RecordWindows setModalContent={setModalContent}/>

            </div>
            {modalContent && (
                <div className="  fixed inset-0  backdrop-blur-[3px]  bg-white/50 border-[1px]  border-solid border-black/30 bg-opacity-50 flex justify-center z-50 items-center">
                    {modalContent}
                </div>
            )}
        </div>
    );
}
