import React, {useEffect, useRef, useState} from "react";
import {toast} from "sonner";

export function TestPanel({ steps, onClearSteps, onRemoveStep, onVideoInfo }) {
    const [openIds, setOpenIds] = useState([]);
    const [locators, setLocators] = useState({});
    const dropdownRefs = useRef({});

    // Test adı
    const [testName, setTestName] = useState("");

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (Object.values(dropdownRefs.current).some(ref => ref?.contains(event.target))) {
                return;
            }
            setOpenIds([]);
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // Dropdown aç-kapa
    const handleToggle = (stepId) => {
        setOpenIds((prev) => {
            if (prev.includes(stepId)) {
                return prev.filter((id) => id !== stepId);
            } else {
                return [...prev, stepId];
            }
        });
    };

    // Dropdown seçim
    const handleSelect = (stepId, selectedType) => {
        setLocators((prev) => ({
            ...prev,
            [stepId]: {
                ...prev[stepId],
                type: selectedType,
            },
        }));
        setOpenIds((prev) => prev.filter((id) => id !== stepId));
    };

    // Input değişikliği
    const handleInputChange = (stepId, field, val) => {
        // field: 'selectedStep' veya 'value'
        setLocators((prev) => ({
            ...prev,
            [stepId]: {
                ...prev[stepId],
                [field]: val,
            },
        }));
    };

    // Label
    const getButtonLabel = (stepId) => {
        const type = locators[stepId]?.type;
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

    // Step sil
    const handleRemoveStepClick = (stepId) => {
        onRemoveStep(stepId);
        setLocators((prev) => {
            const newLocators = { ...prev };
            delete newLocators[stepId];
            return newLocators;
        });
        setOpenIds((prev) => prev.filter((id) => id !== stepId));
    };

    // Run Test
    const handleRunTest = async () => {
        if (!testName.trim()) {
            toast.error("Lütfen test ismi giriniz!");
            return;
        }

        const toastId = toast.loading("Test başlatıldı, lütfen bekleyin...");

        // Backend'in anlayacağı formatta test adımlarını hazırla
        const mergedSteps = steps.map((step) => {
            const { type = "", selectedStep = "", value = "" } = locators[step.id] || {};
            return {
                ...step,
                type,
                selectedStep,
                value,
            };
        });

        try {
            const response = await fetch("http://localhost:5003/run-test", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    testName,
                    steps: mergedSteps,
                }),
            });

            const data = await response.json();

            if (response.status === 200) {
                setTimeout(() => {
                    console.log(response.status, "=== Gelen response değeri ");
                    toast.success(`Test başarıyla tamamlandı! 🎉`, { id: toastId });
                }, 1000);
            } else {
                console.error("Test hata:", data.error);
                toast.dismiss(toastId);
                toast.error("Test çalıştırılırken hata oluştu!");
                return;
            }

            if (onVideoInfo) {
                onVideoInfo({
                    testName: testName,
                    video: data.video,
                    thumbnail: data.thumbnail,
                });
            }
        } catch (err) {
            console.error("Fetch error:", err);
            toast.dismiss(toastId);
            toast.error("Sunucuya bağlanırken hata oluştu!");
        }
    };


    return (
        <div
            className="rounded-[12px] absolute right-auto -left-[235px] -translate-x-0
            top-[112px] w-full max-w-md h-[500px] md:max-w-max bg-white/70 border border-black/15 p-6
            text-white flex flex-col z-1"
            style={{ maxHeight: "550px" }}
        >
            <input
                placeholder="Lütfen Test İsmini Giriniz"
                className="flex-shrink-0 flex relative rounded-md h-6 px-3 w-60 -top-3 mx-auto
                text-black placeholder-black text-[13px] bg-white/50 hover:bg-white/65 active:bg-white/75
                border border-black/10 shadow-md transition-colors text-center focus:outline-none"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
            />

            <div className=" -top-1 mb-[6px] flex relative w-[290px] h-[2px] flex-shrink-0 mx-auto rounded-[10px]
                bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,0,0,0.50)_0%,rgba(255,255,255,0.00)_100%)]"
            />

            <div className="custom-scrollbar flex-1 pr-6 space-y-[13px]">
                {steps.map((step) => {
                    const stepId = step.id;
                    const { mainLabel, testButton } = step;
                    const locData = locators[stepId] || {};
                    const { type, selectedStep, value } = locData;
                    const label = getButtonLabel(stepId);
                    const isOpen = openIds.includes(stepId);

                    // (Aşağıdaki step render'ları senin orijinal kodun, değiştirmedim)
                    // 1) Goto URL
                    if (mainLabel === "Test Steps" && testButton === "Goto URL") {
                        return (
                            <div key={stepId} className="flex items-center space-x-2 relative">
                                <button
                                    className="w-32 min-w-32 rounded-md h-7 px-3
                                    shadow-md border border-black/10
                                    flex items-center justify-center text-black text-[13px]
                                    bg-white/50 transition-colors whitespace-nowrap"
                                    disabled
                                >
                                    URL
                                </button>
                                <div className="h-4 w-4">
                                    <svg
                                        className="z-[5px]"
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
                                {/* Tek input => selectedStep (URL) */}
                                <input
                                    className="text-black bg-white/50 border border-opacity-5 border-black/10
                                        rounded px-2 py-1 text-sm w-full focus:outline-none hover:bg-white/65"
                                    placeholder="http://site.com"
                                    value={selectedStep || ""}
                                    onChange={(e) => handleInputChange(stepId, "selectedStep", e.target.value)}
                                />
                                <div className="h-5 w-5 flex flex-col">
                                    <svg
                                        className="z-[9999] cursor-pointer"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        onClick={() => handleRemoveStepClick(stepId)}
                                    >
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="black"
                                            strokeWidth="1.5"
                                            fill="none"
                                        />
                                        <line
                                            x1="7"
                                            y1="12"
                                            x2="17"
                                            y2="12"
                                            stroke="black"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                        );
                    }

                    // 2) Test Steps (Click Button / Fill Button / Wait For Timeout / Wait For Load State ...)
                    if (mainLabel === "Test Steps") {
                        // CLICK BUTTON
                        if (testButton === "Click Button") {
                            return (
                                <div key={stepId} className="flex items-center space-x-2 relative">
                                    <button
                                        className="w-32 min-w-32 rounded-md h-7 px-3
                                        shadow-md border border-black/10
                                        flex items-center justify-center text-black text-[13px]
                                        bg-white/50 transition-colors whitespace-nowrap"
                                    >
                                        {testButton}
                                    </button>
                                    <div className="h-4 w-4">
                                        <svg
                                            className="z-[5px]"
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

                                    {/* Dropdown => selector / id / xpath */}
                                    <div
                                        ref={(el) => (dropdownRefs.current[stepId] = el)}
                                        className="relative inline-block"
                                    >
                                        <button
                                            onClick={() => handleToggle(stepId)}
                                            className="w-28 rounded-md px-2 py-1 bg-white/50 border border-black/10 text-black text-sm
                                                hover:bg-white/65 transition-colors"
                                        >
                                            {label}
                                        </button>
                                        <div
                                            className={`
                                                absolute left-0 mt-1 w-24 z-1
                                                bg-white/100 border border-black/10 rounded shadow-md text-black text-sm
                                                transition-all duration-300 overflow-hidden
                                                ${
                                                isOpen
                                                    ? "max-h-40 py-1 opacity-100"
                                                    : "max-h-0 py-0 opacity-0 pointer-events-none"
                                            }
                                            `}
                                        >
                                            {getMenuItems(type).map((item) => {
                                                const itemLabel =
                                                    item === "id"
                                                        ? "ID"
                                                        : item === "xpath"
                                                            ? "XPath"
                                                            : "Selector";
                                                return (
                                                    <div
                                                        key={item}
                                                        className="px-2 ml-[2px] mb-1 py-1 w-[90px] hover:bg-gray-200 border border-black/20 rounded-md cursor-pointer"
                                                        onClick={() => handleSelect(stepId, item)}
                                                    >
                                                        {itemLabel}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="h-4 w-4">
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

                                    {/* Tek input => selectedStep */}
                                    <input
                                        className="text-black bg-white/50 border border-opacity-5 border-black/10
                                        rounded px-2 py-1 text-sm w-24 focus:outline-none hover:bg-white/65"
                                        placeholder="Locator"
                                        value={selectedStep || ""}
                                        onChange={(e) =>
                                            handleInputChange(stepId, "selectedStep", e.target.value)
                                        }
                                    />

                                    <div className="h-5 w-5 flex flex-col">
                                        <svg
                                            className="z-[9999] cursor-pointer"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            onClick={() => handleRemoveStepClick(stepId)}
                                        >
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="black"
                                                strokeWidth="1.5"
                                                fill="none"
                                            />
                                            <line
                                                x1="7"
                                                y1="12"
                                                x2="17"
                                                y2="12"
                                                stroke="black"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            );
                        }

                        // FILL BUTTON
                        if (testButton === "Fill Button") {
                            return (
                                <div key={stepId} className="flex items-center space-x-2 relative">
                                    <button
                                        className="w-32 min-w-32 rounded-md h-7 px-3
                                        shadow-md border border-black/10
                                        flex items-center justify-center text-black text-[13px]
                                        bg-white/50 transition-colors whitespace-nowrap"
                                    >
                                        {testButton}
                                    </button>
                                    <div className="h-4 w-4">
                                        <svg
                                            className="z-[5px]"
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

                                    {/* Dropdown => selector / id / xpath */}
                                    <div
                                        ref={(el) => (dropdownRefs.current[stepId] = el)}
                                        className="relative inline-block"
                                    >
                                        <button
                                            onClick={() => handleToggle(stepId)}
                                            className="w-28 rounded-md px-2 py-1 bg-white/50 border border-black/10 text-black text-sm
                                                hover:bg-white/65 transition-colors"
                                        >
                                            {label}
                                        </button>
                                        <div
                                            className={`
                                                absolute left-0 mt-1 w-24 z-1
                                                bg-white/100 border border-black/10 rounded shadow-md text-black text-sm
                                                transition-all duration-300 overflow-hidden
                                                ${
                                                isOpen
                                                    ? "max-h-40 py-1 opacity-100"
                                                    : "max-h-0 py-0 opacity-0 pointer-events-none"
                                            }
                                            `}
                                        >
                                            {getMenuItems(type).map((item) => {
                                                const itemLabel =
                                                    item === "id"
                                                        ? "ID"
                                                        : item === "xpath"
                                                            ? "XPath"
                                                            : "Selector";
                                                return (
                                                    <div
                                                        key={item}
                                                        className="px-2 ml-[2px] mb-1 py-1 w-[90px] hover:bg-gray-200 border border-black/20 rounded-md cursor-pointer"
                                                        onClick={() => handleSelect(stepId, item)}
                                                    >
                                                        {itemLabel}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="h-4 w-4">
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

                                    {/* İki input => Locator + Value */}
                                    <div className="flex flex-col">
                                        {/* locator (selectedStep) */}
                                        <input
                                            className="text-black bg-white/50 border border-opacity-5 border-black/10
                                                rounded px-2 py-1 text-sm w-24 focus:outline-none hover:bg-white/65"
                                            placeholder="Locator"
                                            value={selectedStep || ""}
                                            onChange={(e) =>
                                                handleInputChange(stepId, "selectedStep", e.target.value)
                                            }
                                        />
                                        {/* value (Fill text) */}
                                        <input
                                            className="text-black bg-white/50 border border-opacity-5 border-black/10
                                                rounded px-2 py-1 text-sm w-24 focus:outline-none hover:bg-white/65 mt-2"
                                            placeholder="Değer"
                                            value={value || ""}
                                            onChange={(e) =>
                                                handleInputChange(stepId, "value", e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="h-5 w-5 flex flex-col">
                                        <svg
                                            className="z-[9999] cursor-pointer"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            onClick={() => handleRemoveStepClick(stepId)}
                                        >
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="black"
                                                strokeWidth="1.5"
                                                fill="none"
                                            />
                                            <line
                                                x1="7"
                                                y1="12"
                                                x2="17"
                                                y2="12"
                                                stroke="black"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            );
                        }

                        // WAIT FOR TIMEOUT
                        if (testButton === "Wait For Timeout") {
                            return (
                                <div key={stepId} className="flex items-center space-x-2 relative">
                                    <button
                                        className="w-32 min-w-32 rounded-md h-7 px-3
                                        shadow-md border border-black/10
                                        flex items-center justify-center text-black text-[13px]
                                        bg-white/50 transition-colors whitespace-nowrap"
                                    >
                                        {testButton}
                                    </button>
                                    <div className="h-4 w-4">
                                        <svg
                                            className="z-[5px]"
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
                                    {/* Tek input => bekleme süresi */}
                                    <input
                                        className="text-black bg-white/50 border border-opacity-5 border-black/10
                                            rounded px-2 py-1 text-sm w-full items-center justify-center justify-items-center  focus:outline-none hover:bg-white/65"
                                        placeholder="Süre (ms)"
                                        value={value || ""}
                                        onChange={(e) =>
                                            handleInputChange(stepId, "value", e.target.value)
                                        }
                                    />
                                    <div className="h-5 w-5 flex flex-col">
                                        <svg
                                            className="z-[9999] cursor-pointer"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            onClick={() => handleRemoveStepClick(stepId)}
                                        >
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="black"
                                                strokeWidth="1.5"
                                                fill="none"
                                            />
                                            <line
                                                x1="7"
                                                y1="12"
                                                x2="17"
                                                y2="12"
                                                stroke="black"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            );
                        }

                        // WAIT FOR LOAD STATE
                        if (testButton === "Wait For Load State") {
                            return (
                                <div key={stepId} className="flex items-center space-x-2 relative">
                                    <button
                                        className="w-32 min-w-32 rounded-md h-7 px-3
                                        shadow-md border border-black/10
                                        flex items-center justify-center text-black text-[13px]
                                        bg-white/50 transition-colors whitespace-nowrap"
                                    >
                                        {testButton}
                                    </button>
                                    <div className="h-4 w-4">
                                        <svg
                                            className="z-[5px]"
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
                                    {/* Tek input => load state */}
                                    <input
                                        className="text-black bg-white/50 border border-opacity-5 border-black/10
                                            rounded px-2 py-1 text-sm w-full items-center  justify-items-center focus:outline-none hover:bg-white/65"
                                        placeholder="load / networkidle / domcontentloaded"
                                        value={value || ""}
                                        onChange={(e) =>
                                            handleInputChange(stepId, "value", e.target.value)
                                        }
                                    />
                                    <div className="h-5 w-5 flex flex-col">
                                        <svg
                                            className="z-[9999] cursor-pointer"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            onClick={() => handleRemoveStepClick(stepId)}
                                        >
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="black"
                                                strokeWidth="1.5"
                                                fill="none"
                                            />
                                            <line
                                                x1="7"
                                                y1="12"
                                                x2="17"
                                                y2="12"
                                                stroke="black"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            );
                        }
                        if (testButton === "PlaceHolder Click Button") {
                            return (
                                <div key={stepId} className="flex items-center space-x-2 relative">
                                    <button
                                        className="w-32 min-w-32 rounded-md h-7 px-3
                                        shadow-md border border-black/10
                                        flex items-center justify-center text-black text-[13px]
                                        bg-white/50 transition-colors whitespace-nowrap"
                                    >
                                        {testButton}
                                    </button>
                                    <div className="h-4 w-4">
                                        <svg
                                            className="z-[5px]"
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
                                    {/* Tek input => bekleme süresi */}
                                    <input
                                        className="text-black bg-white/50 border border-opacity-5 border-black/10
                                            rounded px-2 py-1 text-sm w-24 focus:outline-none hover:bg-white/65"
                                        placeholder="PlaceHolder Value"
                                        value={value || ""}
                                        onChange={(e) =>
                                            handleInputChange(stepId, "value", e.target.value)
                                        }
                                    />
                                    <div className="h-5 w-5 flex flex-col">
                                        <svg
                                            className="z-[9999] cursor-pointer"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            onClick={() => handleRemoveStepClick(stepId)}
                                        >
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="black"
                                                strokeWidth="1.5"
                                                fill="none"
                                            />
                                            <line
                                                x1="7"
                                                y1="12"
                                                x2="17"
                                                y2="12"
                                                stroke="black"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            );
                        }
                        if (testButton === "PlaceHolder Fill Button") {
                            return (
                                <div key={stepId} className="flex items-center space-x-2 relative">
                                    <button
                                        className="w-32 min-w-32 rounded-md h-7 px-3
                                        shadow-md border border-black/10
                                        flex items-center justify-center text-black text-[13px]
                                        bg-white/50 transition-colors whitespace-nowrap"
                                    >
                                        {testButton}
                                    </button>



                                    <div className="h-4 w-4">
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

                                    {/* İki input => Locator + Value */}
                                    <div className="flex flex-col">
                                        {/* locator (selectedStep) */}
                                        <input
                                            className="text-black bg-white/50 border border-opacity-5 border-black/10
                                                rounded px-2 py-1 text-sm w-24 focus:outline-none hover:bg-white/65"
                                            placeholder="PlaceHolder"
                                            value={selectedStep || ""}
                                            onChange={(e) =>
                                                handleInputChange(stepId, "selectedStep", e.target.value)
                                            }
                                        />
                                        {/* value (Fill text) */}
                                        <input
                                            className="text-black bg-white/50 border border-opacity-5 border-black/10
                                                rounded px-2 py-1 text-sm w-24 focus:outline-none hover:bg-white/65 mt-2"
                                            placeholder="Değer"
                                            value={value || ""}
                                            onChange={(e) =>
                                                handleInputChange(stepId, "value", e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="h-5 w-5 flex flex-col">
                                        <svg
                                            className="z-[9999] cursor-pointer"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            onClick={() => handleRemoveStepClick(stepId)}
                                        >
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="black"
                                                strokeWidth="1.5"
                                                fill="none"
                                            />
                                            <line
                                                x1="7"
                                                y1="12"
                                                x2="17"
                                                y2="12"
                                                stroke="black"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            );
                        }

                        // Henüz tanımlamadığınız diğer testButton durumları
                        return (
                            <div key={stepId} className="flex items-center space-x-2 relative">
                                <button
                                    className="w-32 min-w-32 rounded-md h-7 px-3
                                        shadow-md border border-black/10
                                        flex items-center justify-center text-black text-[13px]
                                        bg-white/50 transition-colors whitespace-nowrap"
                                >
                                    {testButton}
                                </button>
                                <div className="h-4 w-4">
                                    <svg
                                        className="z-[5px]"
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
                                <span className="text-black text-sm">
                                    (Henüz özel işlem tanımlanmadı)
                                </span>
                                <div className="h-5 w-5 flex flex-col">
                                    <svg
                                        className="z-[9999] cursor-pointer"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        onClick={() => handleRemoveStepClick(stepId)}
                                    >
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="black"
                                            strokeWidth="1.5"
                                            fill="none"
                                        />
                                        <line
                                            x1="7"
                                            y1="12"
                                            x2="17"
                                            y2="12"
                                            stroke="black"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                        );
                    }

                    // 3) Diğer adımlar (Locations, Block, vs.)
                    return (
                        <div key={stepId} className="flex items-center space-x-2 relative">
                            <button
                                className="w-32 min-w-32 rounded-md h-7 px-3
                                    shadow-md border border-black/10
                                    flex items-center justify-center text-black text-[13px]
                                    bg-white/50 transition-colors whitespace-nowrap"
                            >
                                {mainLabel}
                            </button>
                            <div className="h-4 w-4">
                                <svg
                                    className="z-[5px]"
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
                            <button
                                className="w-28 rounded-md px-2 py-1 bg-white/50 border border-black/10 text-black text-[12px]
                                    flex items-center justify-center whitespace-nowrap"
                            >
                                {testButton}
                            </button>
                            <div className="h-4 w-4">
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
                            <input
                                className="text-black bg-white/50 border border-opacity-5 border-black/10
                                    rounded px-2 py-1 text-sm w-24 focus:outline-none hover:bg-white/65"
                                placeholder="Değer"
                                value={value || ""}
                                onChange={(e) =>
                                    handleInputChange(stepId, "value", e.target.value)
                                }
                            />
                            <div className="h-5 w-5 flex flex-col">
                                <svg
                                    className="z-[9999] cursor-pointer"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => handleRemoveStepClick(stepId)}
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        fill="none"
                                    />
                                    <line
                                        x1="7"
                                        y1="12"
                                        x2="17"
                                        y2="12"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 flex-shrink-0 flex justify-between gap-2 ">
                <button
                    onClick={onClearSteps}
                    className="w-28 bg-white/50 hover:bg-white/65 text-black border border-black/10
                    shadow-md px-3 py-1 rounded-md text-sm transition-colors"
                >
                    Clear Test
                </button>
                <button
                    onClick={onClearSteps}
                    className="w-28 bg-white/50 hover:bg-white/65 text-black border border-black/10
                    shadow-md px-3 py-1 rounded-md text-sm transition-colors mx-auto"
                >
                    Save Test
                </button>
                <button
                    onClick={handleRunTest}
                    className="w-28 bg-white/50 hover:bg-white/65 text-black border border-black/10
                    shadow-md px-3 py-1 rounded-md text-sm transition-colors flex items-center gap-2 mr-auto"
                >
                    Run Test
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
                </button>
            </div>
        </div>
    );
}
