import React, { useState, useRef, useEffect } from "react";

export default function TestStepsButtons({ onAddStep }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [buttonWidths, setButtonWidths] = useState([]);
    const buttonRefs = useRef([]);
    const containerRef = useRef(null);

    const CLOSED_WIDTH = 150;
    const OPEN_WIDTH = 600;

    useEffect(() => {
        if (buttonRefs.current.length > 0) {
            const widths = buttonRefs.current.map((btn) => btn?.offsetWidth || 0);
            setButtonWidths(widths);
        }
    }, [isOpen]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
                setShowControls(false);
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const maxIndex = buttonWidths.length - 1;
    const translateX = buttonWidths.slice(0, currentIndex).reduce((sum, w) => sum + w, 0);

    const handleNext = () => {
        setCurrentIndex((prev) => {
            if (prev < maxIndex) {
                return prev + 1;
            }
            return prev;
        });
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleTransitionEnd = (e) => {
        if (e.propertyName === "width" && isOpen) {
            setShowControls(true);
        }
    };

    const toggleOpen = () => {
        setIsOpen((prev) => {
            if (prev) setShowControls(false);
            return !prev;
        });
    };

    // Adım ekleme
    const handleAddClick = (testButton) => {
        let stepData = {
            mainLabel: "Test Steps",
            testButton: testButton,
            type: "",  // Varsayılan olarak boş
            selectedStep: "",
            value: "",
        };

        if (testButton === "Goto URL") {
            stepData.selectedStep = "https://example.com";  // Varsayılan URL
        } else if (testButton === "Click Button") {
            stepData.type = "selector";  // Varsayılan locator tipi
            stepData.selectedStep = "#button-id";  // Varsayılan selector
        } else if (testButton === "Fill Button") {
            stepData.type = "selector";
            stepData.selectedStep = "#input-id";  // Varsayılan input alanı
            stepData.value = "Test Value";  // Varsayılan doldurulacak değer
        } else if (testButton === "Wait For Timeout") {
            stepData.value = "3000";  // Varsayılan bekleme süresi (ms)
        }else if (testButton === "PlaceHolder Fill Button") {
            stepData.type = "selector";
            stepData.selectedStep = "placeholder fill element";  // Varsayılan element
        }

        // Test adımını backend için uygun formatta test paneline ekle
        onAddStep("Test Steps", testButton, stepData);
    };


    return (
        <div className="relative flex w-full top-4 justify-start" ref={containerRef}>
            <div className="flex flex-row space-x-2 relative">
                <div
                    onTransitionEnd={handleTransitionEnd}
                    className="flex items-center h-[32px] border border-white/70 bg-white/70
                     rounded-lg shadow-md backdrop-blur-md overflow-visible
                     transition-all duration-300 ease-in-out relative"
                    style={{ width: isOpen ? OPEN_WIDTH : CLOSED_WIDTH }}
                >
                    {showControls && (
                        <div className="absolute -top-9 -right-2 flex space-x-2 p-1 z-50 rounded-full">
                            <button
                                onClick={handlePrev}
                                className="h-[28px] px-3 flex items-center justify-center text-black bg-white/70
                                    rounded-full border border-white/80 hover:bg-black/10 cursor-pointer
                                    shadow-md transition-colors text-sm"
                            >
                                <span className="mr-1">{"<"}</span> Preview
                            </button>
                            <button
                                onClick={handleNext}
                                className="h-[28px] px-3 flex items-center justify-center text-black bg-white/70
                                    rounded-full border border-white/80 cursor-pointer hover:bg-black/10
                                    shadow-md transition-colors text-sm"
                            >
                                Next <span className="ml-1">{">"}</span>
                            </button>
                        </div>
                    )}
                    <button
                        onClick={toggleOpen}
                        className="flex items-center justify-between h-full min-w-[150px] px-3 cursor-pointer"
                    >
                        <span className="text-black text-[13px] font-medium">Test Steps</span>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            className={`transition-transform duration-300 ${
                                isOpen ? "rotate-90" : ""
                            }`}
                        >
                            <path
                                d="M5 13L10 8L5 3"
                                stroke="black"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    <div
                        className={`flex items-center h-full transition-all duration-300 ${
                            isOpen ? "flex-1" : "w-0 flex-0 overflow-hidden"
                        }`}
                    >
                        <div className="relative h-full overflow-hidden flex-1 mx-2">
                            <div
                                className="absolute left-0 top-[2px] h-full flex transition-transform duration-300"
                                style={{transform: `translateX(-${translateX}px)`}}
                            >
                                {/* Goto URL */}
                                <button
                                    className="flex-shrink-0 rounded-full h-6 px-3 hover:shadow-md
                                        relative hover:border hover:border-white/65
                                        flex items-center justify-center text-black text-[13px]
                                        hover:bg-black/10 transition-colors cursor-pointer whitespace-nowrap"
                                    ref={(el) => (buttonRefs.current[0] = el)}
                                    onClick={() => handleAddClick("Goto URL")}
                                >
                                    Goto URL
                                </button>

                                {/* Click Button */}
                                <button
                                    className="flex-shrink-0 rounded-full h-6 px-3 hover:shadow-md
                                        relative hover:border hover:border-white/65
                                        flex items-center justify-center text-black text-[13px]
                                        hover:bg-black/10 transition-colors cursor-pointer whitespace-nowrap"
                                    ref={(el) => (buttonRefs.current[1] = el)}
                                    onClick={() => handleAddClick("Click Button")}
                                >
                                    Click Button
                                </button>

                                {/* PlaceHolder Click Button */}
                                <button
                                    className="flex-shrink-0 rounded-full h-6 px-3 hover:shadow-md
                                        relative hover:border hover:border-white/65
                                        flex items-center justify-center text-black text-[13px]
                                        hover:bg-black/10 transition-colors cursor-pointer whitespace-nowrap"
                                    ref={(el) => (buttonRefs.current[2] = el)}
                                    onClick={() => handleAddClick("PlaceHolder Click Button")}
                                >
                                    PlaceHolder Click Button
                                </button>

                                <button
                                    className="flex-shrink-0 rounded-full h-6 px-3 hover:shadow-md
                                        relative hover:border hover:border-white/65
                                        flex items-center justify-center text-black text-[13px]
                                        hover:bg-black/10 transition-colors cursor-pointer whitespace-nowrap"
                                    ref={(el) => (buttonRefs.current[3] = el)}
                                    onClick={() => handleAddClick("PlaceHolder Fill Button")}
                                >
                                    PlaceHolder Fill Button
                                </button>

                                {/* Fill Button */}
                                <button
                                    className="flex-shrink-0 rounded-full h-6 px-3 hover:shadow-md
                                        relative hover:border hover:border-white/65
                                        flex items-center justify-center text-black text-[13px]
                                        hover:bg-black/10 transition-colors cursor-pointer whitespace-nowrap"
                                    ref={(el) => (buttonRefs.current[4] = el)}
                                    onClick={() => handleAddClick("Fill Button")}
                                >
                                    Fill Button
                                </button>

                                {/* Diğer butonlar... */}
                                <button
                                    className="flex-shrink-0 rounded-full h-6 px-3 hover:shadow-md
                                        relative hover:border hover:border-white/65
                                        flex items-center justify-center text-black text-[13px]
                                        hover:bg-black/10 transition-colors cursor-pointer whitespace-nowrap"
                                    ref={(el) => (buttonRefs.current[5] = el)}
                                    onClick={() => handleAddClick("Api Kontrol")}
                                >
                                    Api Kontrol
                                </button>
                                <button
                                    className="flex-shrink-0 rounded-full h-6 px-3 hover:shadow-md
                                        relative hover:border hover:border-white/65
                                        flex items-center justify-center text-black text-[13px]
                                        hover:bg-black/10 transition-colors cursor-pointer whitespace-nowrap"
                                    ref={(el) => (buttonRefs.current[6] = el)}
                                    onClick={() => handleAddClick("Api Payload")}
                                >
                                    Api Payload
                                </button>
                                <button
                                    className="flex-shrink-0 rounded-full h-6 px-3 hover:shadow-md
                                        relative hover:border hover:border-white/65
                                        flex items-center justify-center text-black text-[13px]
                                        hover:bg-black/10 transition-colors cursor-pointer whitespace-nowrap"
                                    ref={(el) => (buttonRefs.current[7] = el)}
                                    onClick={() => handleAddClick("Response Kontrol")}
                                >
                                    Response Kontrol
                                </button>

                                {/* Wait For Timeout */}
                                <button
                                    className="flex-shrink-0 rounded-full h-6 px-3 hover:shadow-md
      relative hover:border hover:border-white/65
      flex items-center justify-center text-black text-[13px]
      hover:bg-black/10 transition-colors cursor-pointer whitespace-nowrap"
                                    ref={(el) => (buttonRefs.current[8] = el)} // index uygun şekilde ayarlayabilirsiniz
                                    onClick={() => handleAddClick("Wait For Timeout")}
                                >
                                    Wait For Timeout
                                </button>

                                {/* Wait For Load State */}
                                <button
                                    className="flex-shrink-0 rounded-full h-6 px-3 hover:shadow-md
      relative hover:border hover:border-white/65
      flex items-center justify-center text-black text-[13px]
      hover:bg-black/10 transition-colors cursor-pointer whitespace-nowrap"
                                    ref={(el) => (buttonRefs.current[9] = el)} // index uygun şekilde ayarlayabilirsiniz
                                    onClick={() => handleAddClick("Wait For Load State")}
                                >
                                    Wait For Load State
                                </button>

                                {/* ... Eklemeler */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
