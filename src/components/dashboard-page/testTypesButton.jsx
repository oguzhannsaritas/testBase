import { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testTypes = [
    {
        name: "Unit Tests",
        subTypes: ["Jest", "Mocha", "Jasmine"]
    },
    {
        name: "Integration Tests",
        subTypes: ["Selenium", "Cypress", "Puppeteer"]
    },
    {
        name: "Performance Tests",
        subTypes: ["JMeter", "Gatling", "k6"]
    }
];

export function TestTypesButton({ onAddStep }) {
    const [activeMenu, setActiveMenu] = useState(null);
    const [selectedType, setSelectedType] = useState("");
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveMenu(null);
                setSelectedType("");
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleBack = () => {
        setActiveMenu("main");
        setSelectedType("");
    };

    const handleSubTypeClick = (subType) => {
        onAddStep("Test Types", subType);
    };

    return (
        <div className="relative w-32 min-w-32 top-[112px] left-[256px]" ref={menuRef}>
            <button
                onClick={() => setActiveMenu(activeMenu ? null : "main")}
                className="w-full rounded-md h-7 px-3 flex items-center justify-center shadow-md border border-white/65 text-black text-[13px] bg-white/60 hover:bg-white/70 cursor-pointer transition-colors whitespace-nowrap"
            >
                Test Types
                <motion.svg
                    className="ml-2"
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    animate={{ rotate: activeMenu ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <path
                        d="M5.83337 13.3333L11.1667 7.99996L5.83337 2.66663"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </motion.svg>
            </button>

            <AnimatePresence>
                {activeMenu !== null && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute top-full -left-20 text-sm mt-2 w-72 bg-white/75 rounded-lg border border-black/30 shadow-[0px_5px_10px_0px_rgba(0,0,0,0.10)] p-2 z-[9999] overflow-hidden"
                    >
                        <div className="flex justify-between items-center p-2">
                            {activeMenu !== "main" && (
                                <button onClick={handleBack} className="p-1 cursor-pointer text-black">
                                    <ChevronLeft size={15} />
                                </button>
                            )}
                            <span className="font-sans text-sm text-black px-2 text-center w-full">
                {selectedType || "Test Types"}
              </span>
                            <button
                                onClick={() => setActiveMenu(null)}
                                className="flex justify-center items-center border-[1px] border-solid relative cursor-pointer -top-3 left-3 border-black/50 w-6 h-5 rounded-full"
                            >
                                <X size={14} />
                            </button>
                        </div>

                        <div className="-top-1 mb-[6px] flex relative w-[200px] h-[2px] flex-shrink-0 mx-auto rounded-[10px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,0,0,0.50)_0%,rgba(255,255,255,0.00)_100%)]" />

                        <div className="flex flex-col space-y-2 text-sm pr-[15px] pl-2 max-h-60 overflow-y-auto">
                            {activeMenu === "main"
                                ? testTypes.map((type, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setSelectedType(type.name);
                                            setActiveMenu(type.name);
                                        }}
                                        className="w-full flex shadow-md border border-black/10 justify-between items-center p-2 rounded-lg bg-gray-100 hover:bg-black/9 cursor-pointer transition"
                                    >
                                        {type.name} <ChevronRight size={16} />
                                    </button>
                                ))
                                : testTypes
                                    .find((t) => t.name === activeMenu)
                                    ?.subTypes.map((subType, subIndex) => (
                                        <button
                                            key={subIndex}
                                            className="w-full p-2 rounded-lg bg-gray-100 hover:bg-black/10 cursor-pointer transition shadow-md border border-black/10"
                                            onClick={() => handleSubTypeClick(subType)}
                                        >
                                            {subType}
                                        </button>
                                    ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
