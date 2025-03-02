import { Banner } from "./banner.jsx";
import TestStepsButtons from "./testStepsButtons.jsx";
import { TestPanel } from "./testPanel.jsx";
import { useState } from "react";
import { TestSteps } from "./testSteps.jsx";
import { v4 as uuidv4 } from "uuid";
import { TestFailureWindow } from "./testFailureWindow.jsx";
import { LocationsButton } from "./locationsButton.jsx";
import { WebVersionsButton } from "./webVersionsButton.jsx";
import { TestTypesButton } from "./testTypesButton.jsx";
import { BlockButton } from "./blockButton.jsx";
import { ShareEmail } from "./shareEmail.jsx";
import { RecordWindows } from "./recordWindows.jsx";

export function DashboardPage() {
    const [selectedSteps, setSelectedSteps] = useState([]);
    const [modalContent, setModalContent] = useState(null);

    // handleAddStep artık 2 parametre alıyor: mainLabel ve subLabel
    const handleAddStep = (mainLabel, subLabel) => {
        const newStep = {
            id: uuidv4(),
            mainLabel,
            subLabel
        };
        setSelectedSteps((prev) => [...prev, newStep]);
    };

    const handleClearSteps = () => {
        setSelectedSteps([]);
    };

    const handleRemoveStep = (stepId) => {
        setSelectedSteps((prev) => prev.filter((step) => step.id !== stepId));
    };

    return (
        <div className="flex flex-col w-full relative">
            <Banner className=" flex relative z-[9999]"/>

            {/* TestStepsButtons'a onAddStep prop'unu veriyoruz */}
            <div className="flex relative -left-[236px] flex-col w-full">
                <TestStepsButtons onAddStep={handleAddStep} />
            </div>

            {/* Seçilen adımlar TestPanel'e gönderiliyor */}
            <TestPanel
                steps={selectedSteps}
                onClearSteps={handleClearSteps}
                onRemoveStep={handleRemoveStep}
            />

            {/* Alttaki 4 butona da aynı şekilde onAddStep veriyoruz */}
            <div className="fixed flex justify-between z-1">
                <LocationsButton onAddStep={(region, country) => handleAddStep("Locations", country ? country : region)} />
                <BlockButton onAddStep={handleAddStep} />
                <WebVersionsButton onAddStep={handleAddStep} />
                <TestTypesButton onAddStep={handleAddStep} />
            </div>

            <ShareEmail />
            <TestSteps />
            <TestFailureWindow />

            <div className="flex flex-col w-full justify-center">
                <RecordWindows setModalContent={setModalContent} />
            </div>

            {modalContent && (
                <div className="fixed inset-0 backdrop-blur-[3px] bg-white/50 border-[1px] border-solid border-black/30 bg-opacity-50 flex justify-center z-[9999] items-center">
                    {modalContent}
                </div>
            )}
        </div>
    );
}
