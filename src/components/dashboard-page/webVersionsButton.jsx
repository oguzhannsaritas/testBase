import { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const webVersions = [
    {
        name: "Version 1.x",
        subVersions: [
            "1.0", "1.1", "1.2", "1.0", "1.1", "1.2",
            "1.0", "1.1", "1.2", "1.0", "1.1", "1.2"
        ]
    },
    {
        name: "Version 2.x",
        subVersions: ["2.0", "2.1", "2.2"]
    },
    {
        name: "Version 3.x",
        subVersions: ["3.0", "3.1", "3.2"]
    },
    // ...
];

export function WebVersionsButton({ onAddStep }) {
    const [activeMenu, setActiveMenu] = useState(null);
    const [selectedVersion, setSelectedVersion] = useState("");
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveMenu(null);
                setSelectedVersion("");
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleBack = () => {
        setActiveMenu("main");
        setSelectedVersion("");
    };

    // Alt sürüme tıklayınca TestPanel'e ekleme
    const handleSubVersionClick = (subVersion) => {
        onAddStep("Web Versions", subVersion);
    };

    return (
        <div className="relative w-32 min-w-32 top-[112px] left-[41%]" ref={menuRef}>
            <button
                onClick={() => setActiveMenu(activeMenu ? null : "main")}
                className="w-full rounded-md h-7 px-3 flex items-center justify-center shadow-md border border-white/65 text-black text-[13px] bg-white/60 hover:bg-white/70 cursor-pointer transition-colors whitespace-nowrap"
            >
                Web Versions
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
                {selectedVersion || "Web Versions"}
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
                                ? webVersions.map((version, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setSelectedVersion(version.name);
                                            setActiveMenu(version.name);
                                        }}
                                        className="w-full flex shadow-md border border-black/10 justify-between items-center p-2 rounded-lg bg-gray-100 hover:bg-black/9 cursor-pointer transition"
                                    >
                                        {version.name} <ChevronRight size={16} />
                                    </button>
                                ))
                                : webVersions
                                    .find((ver) => ver.name === activeMenu)
                                    ?.subVersions.map((subVersion, subIndex) => (
                                        <button
                                            key={subIndex}
                                            className="w-full p-2 rounded-lg bg-gray-100 hover:bg-black/10 cursor-pointer transition shadow-md border border-black/10"
                                            onClick={() => handleSubVersionClick(subVersion)}
                                        >
                                            {subVersion}
                                        </button>
                                    ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
