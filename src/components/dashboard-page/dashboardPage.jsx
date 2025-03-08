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

    // === [EK] test bittikten sonra gelen video, thumbnail gibi bilgileri tutacağız
    const [videoInfo, setVideoInfo] = useState(null);

    // 2 param: mainLabel ve testButton
    const handleAddStep = (mainLabel, testButton) => {
        const newStep = {
            id: uuidv4(),
            mainLabel,
            testButton
        };
        setSelectedSteps((prev) => [...prev, newStep]);
    };

    const handleClearSteps = () => {
        setSelectedSteps([]);
    };

    const handleRemoveStep = (stepId) => {
        setSelectedSteps((prev) => prev.filter((step) => step.id !== stepId));
    };

    // === [EK] Bu fonksiyon, testPanel’den sunucudan gelen video/thumbnail bilgisini alır
    const handleVideoInfo = (info) => {
        // info örnek: { testName: 'MyTest', video: 'MyTest.mp4', thumbnail: 'MyTest.png' }
        setVideoInfo(info);
    };

    return (
        <div className="flex flex-col w-full relative">
            <Banner className=" flex relative z-[9999]"/>

            {/* TestStepsButtons: Kullanıcı tıkladığında step ekliyor */}
            <div className="flex relative -left-[236px] flex-col w-full">
                <TestStepsButtons onAddStep={handleAddStep} />
            </div>

            {/* Seçilen adımları TestPanel'e gönderiyoruz */}
            <TestPanel
                steps={selectedSteps}
                onClearSteps={handleClearSteps}
                onRemoveStep={handleRemoveStep}
                // === [EK] testPanel “Run Test” sonrası videoInfo’yu buraya döndürecek
                onVideoInfo={handleVideoInfo}
            />

            {/* Alttaki butonlar da step ekliyor */}
            <div className="fixed flex justify-between z-1">
                <LocationsButton onAddStep={(region, country) => handleAddStep("Locations", country ? country : region)} />
                <BlockButton onAddStep={handleAddStep} />
                <WebVersionsButton onAddStep={handleAddStep} />
                <TestTypesButton onAddStep={handleAddStep} />
            </div>

            <ShareEmail />
            <TestSteps />

            {/* TestFailureWindow'a videoInfo prop olarak yolluyoruz */}
            <TestFailureWindow videoInfo={videoInfo} />

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
