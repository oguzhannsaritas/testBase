import React, { useState } from "react";

export function TestPanel({ steps, onClearSteps }) {
    const [openIndices, setOpenIndices] = useState([]);
    const [locators, setLocators] = useState({});

    const handleToggle = (index) => {
        setOpenIndices((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    const handleSelect = (index, selectedType) => {
        setLocators((prev) => ({
            ...prev,
            [index]: {
                ...prev[index],
                type: selectedType,
            },
        }));
        // Dropdown kapansın ama SVG'ler etkilenmesin
        setOpenIndices((prev) => prev.filter((i) => i !== index));
    };

    const handleInputChange = (index, value) => {
        setLocators((prev) => ({
            ...prev,
            [index]: {
                ...prev[index],
                value,
            },
        }));
    };

    const getButtonLabel = (index) => {
        const type = locators[index]?.type;
        if (type === "id") return "ID";
        if (type === "xpath") return "XPath";
        return "Selector";
    };

    const getMenuItems = (currentType) => {
        if (currentType === undefined) {
            return ["selector", "id", "xpath"];
        } else if (currentType === "selector") {
            return ["id", "xpath"];
        } else if (currentType === "id") {
            return ["selector", "xpath"];
        } else if (currentType === "xpath") {
            return ["selector", "id"];
        }
        return ["selector", "id", "xpath"];
    };

    return (
        <div
            className="rounded-[12px] absolute right-auto -left-[235px] -translate-x-0
         top-[112px] w-full max-w-md h-[500px] md:max-w-max bg-white/50 p-6
         text-white flex flex-col"
            style={{maxHeight: "550px"}}
        >

            <input placeholder="Lütfen Test İsmini Giriniz"
                   className="flex-shrink-0 flex relative rounded-md h-6 px-3 w-60 -top-3 mx-auto text-black text-[13px] bg-white/50 hover:bg-white/65 active:bg-white/75 border border-white/65 shadow-md transition-colors text-center focus:outline-none"/>


            <div className="flex-1 overflow-y-scroll pr-6 space-y-[13px]">
                {steps.map((step, index) => {
                    const currentType = locators[index]?.type;
                    const label = getButtonLabel(index);
                    const isOpen = openIndices.includes(index);
                    const menuItems = getMenuItems(currentType);

                    return (
                        <div key={index} className="flex items-center space-x-2 relative">
                            {/* Adım ismi butonu */}
                            <button
                                className="w-32 min-w-32 rounded-md h-7 px-3
        shadow-md border border-white/65
        flex items-center justify-center text-black text-[13px]
        bg-white/50 transition-colors whitespace-nowrap"
                            >
                                {step}
                            </button>

                            {/* Sol ok ikonu */}
                            <div className="h-4 w-4 ">
                                <svg
                                    className="z-[9999]"
                                    width="17"
                                    height="16"
                                    viewBox="0 0 17 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5.83337 13.3333L11.1667 7.99996L5.83337 2.66663"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>


                            {/* Selector / ID / XPath butonu ve dropdown */}
                            <div className="relative inline-block">
                                <button
                                    onClick={() => handleToggle(index)}
                                    className="w-28 rounded-md px-2 py-1 bg-white/50 border border-white/50 text-black text-sm
                             hover:bg-white/65 transition-colors"
                                >
                                    {label}
                                </button>

                                {/* Açılır menü (dropdown) */}
                                <div
                                    className={`
                    absolute left-0 mt-1 w-24 z-40
                    bg-white/100 border border-white/65 rounded shadow-md text-black text-sm
                    transition-all duration-300 overflow-hidden
                    ${isOpen ? "max-h-40 py-1 opacity-100" : "max-h-0 py-0 opacity-0 pointer-events-none"}
                  `}
                                >
                                    {menuItems.map((item) => {
                                        const itemLabel =
                                            item === "id"
                                                ? "ID"
                                                : item === "xpath"
                                                    ? "XPath"
                                                    : "Selector";

                                        return (
                                            <div
                                                key={item}
                                                className="px-2 ml-[2px] mb-1 py-1 w-[90px] hover:bg-gray-200 border border-gray-100 rounded-md cursor-pointer"
                                                onClick={() => handleSelect(index, item)}
                                            >
                                                {itemLabel}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Sağ ok ikonu */}
                            <div className="h-4 w-4 ">
                                <svg
                                    className="z-[9999]"
                                    width="17"
                                    height="16"
                                    viewBox="0 0 17 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5.83337 13.3333L11.1667 7.99996L5.83337 2.66663"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>

                            {/* Input alanı her zaman görünsün */}
                            <input
                                className="text-black bg-white/50 border border-white/65
                           rounded px-2 py-1 text-sm w-24 focus:outline-none hover:bg-white/65"
                                placeholder="Değer"
                                value={locators[index]?.value || ""}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                            />

                            <div className="h-5 w-5 flex flex-col">
                                <svg
                                    className="z-[9999]"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="1.5" fill="none"/>
                                    <line x1="7" y1="12" x2="17" y2="12" stroke="black" strokeWidth="1.5"
                                          strokeLinecap="round"/>
                                </svg>

                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 flex-shrink-0 flex justify-between gap-2 ">
                <button onClick={onClearSteps}
                        className="w-28 bg-white/50 hover:bg-white/65 text-black border border-white/65 shadow-md px-3 py-1 rounded-md text-sm transition-colors ">
                    Clear Test
                </button>
                <button onClick={onClearSteps}
                        className="w-28 bg-white/50 hover:bg-white/65 text-black border border-white/65 shadow-md px-3 py-1 rounded-md text-sm transition-colors mx-auto">
                    Save Test
                </button>
                <button onClick={onClearSteps}
                        className="w-28 bg-white/50 hover:bg-white/65 text-black border border-white/65 shadow-md px-3 py-1 rounded-md text-sm transition-colors flex items-center gap-2 mr-auto">
                    Run Test
                    <svg className="z-[9999]" width="17" height="16" viewBox="0 0 17 16" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.83337 13.3333L11.1667 7.99996L5.83337 2.66663" stroke="black" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}
