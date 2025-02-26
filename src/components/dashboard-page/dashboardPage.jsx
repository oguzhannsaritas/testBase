import {Banner} from "./banner.jsx";
import TestSteps from "./testSteps.jsx";
import {TestPanel} from "./testPanel.jsx";
import {useState} from "react";

export function DashboardPage() {
    const [selectedSteps, setSelectedSteps] = useState([]);

    // TestSteps bileşeninden gelen step ekleme
    const handleAddStep = (stepLabel) => {
        setSelectedSteps((prev) => [...prev, stepLabel]);
    };

    // Clear butonuna basıldığında bütün adımları silme
    const handleClearSteps = () => {
        setSelectedSteps([]);
    };

    return (
        <div className="flex flex-col w-full ">
            <Banner />
            <div className="flex relative -left-[236px] flex-col w-full ">
                <TestSteps onAddStep={handleAddStep} />

            </div>
            <TestPanel steps={selectedSteps} onClearSteps={handleClearSteps} />




        </div>
    );
}
