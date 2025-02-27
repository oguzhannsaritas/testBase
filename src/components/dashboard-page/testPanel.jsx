import React, { useState } from "react";

export function TestPanel({ steps, onClearSteps }) {
    // Açık drop-down menüye sahip adımların indekslerini tutar
    const [openIndices, setOpenIndices] = useState([]);

    // Hangi step’te hangi type seçildi ve input değeri nedir?
    // Ör: { 0: { type: "id", value: "myInput" }, 1: { type: "xpath", value: "..." } }
    const [locators, setLocators] = useState({});

    // Butona tıklanınca menüyü aç/kapa
    const handleToggle = (index) => {
        setOpenIndices((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    // Menüden bir seçeneğe tıklandığında (selector/id/xpath)
    const handleSelect = (index, selectedType) => {
        setLocators((prev) => ({
            ...prev,
            [index]: {
                ...prev[index],
                type: selectedType, // "selector" | "id" | "xpath"
            },
        }));
        // Seçim yapınca menüyü kapatıyoruz
        setOpenIndices((prev) => prev.filter((i) => i !== index));
    };

    // Input alanına yazıldıkça kaydediyoruz
    const handleInputChange = (index, value) => {
        setLocators((prev) => ({
            ...prev,
            [index]: {
                ...prev[index],
                value,
            },
        }));
    };

    // Butonun üzerinde yazacak metin:
    // - undefined => "Selector" (ilk hâl, input göstermez)
    // - "selector" => "Selector" (ancak input gösterir)
    // - "id" => "ID"
    // - "xpath" => "XPath"
    const getButtonLabel = (index) => {
        const type = locators[index]?.type;
        if (type === "id") return "ID";
        if (type === "xpath") return "XPath";
        // Hem undefined hem "selector" aynı yazıyı döndürür
        return "Selector";
    };

    // Mevcut type’a göre menüde neler görünecek?
    // - İlk defa (undefined) ise hepsi: ["selector", "id", "xpath"]
    // - "selector" seçiliyse => menüde "id", "xpath"
    // - "id" seçiliyse => menüde "selector", "xpath"
    // - "xpath" seçiliyse => menüde "selector", "id"
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

    // Hangi durumlarda input görünecek?
    // - Eğer type "id", "xpath" veya "selector" ise input görünür
    // - Yalnızca undefined ise input saklanır
    const shouldShowInput = (type) =>
        type === "id" || type === "xpath" || type === "selector";

    return (
        <div
            className="rounded-[12px] absolute right-auto -left-11 -translate-x-1/2
                 top-[112px] w-full max-w-xs md:max-w-sm bg-white/50 p-6
                 text-white flex flex-col"
            style={{maxHeight: "550px"}} // Yüksekliği 550px'e sabitle
        >
            <input
                placeholder="Lütfen Test İsmini Giriniz"
                className="flex-shrink-0 rounded-md h-6 px-3 bottom-4 w-60
             shadow-md relative border border-white/50
             flex items-center justify-center text-black text-[13px]
             bg-white/50 transition-colors whitespace-nowrap
             text-center focus:outline-none"
            />


            {/* İçerik alanı: scrollbar her zaman görünür */}
            <div className="flex-1 overflow-y-scroll pr-2 space-y-3">
                {steps.map((step, index) => {
                    const currentType = locators[index]?.type;
                    const label = getButtonLabel(index);
                    const isOpen = openIndices.includes(index);

                    // Menünün itemları
                    const menuItems = getMenuItems(currentType);

                    return (
                        <div key={index} className="flex items-center space-x-2">
                            {/* Step adı (ör. "Fill Button") */}
                            <button
                                className="flex-shrink-0 rounded-md h-7 px-3
                           shadow-md relative border border-white/65
                           flex items-center justify-center text-black text-[13px]
                           bg-white/50 transition-colors whitespace-nowrap"
                            >
                                {step}
                            </button>

                            {/* Ok ikonu (sabit) */}
                            <svg
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

                            {/* Tek buton (Selector / ID / XPath) */}
                            <div className="relative inline-block">
                                <button
                                    onClick={() => handleToggle(index)}
                                    className="rounded-md px-2 py-1 bg-white/50 border border-white/50 text-black text-sm
                             hover:bg-white/65 transition-colors"
                                >
                                    {label}
                                </button>


                                {/* Aşağı doğru açılan menü (animasyon) */}
                                <div
                                    className={`
                    absolute left-0 mt-1 w-24 z-50
                    bg-white/100 border border-white/65 rounded shadow-md text-black text-sm
                    transition-all duration-300 overflow-hidden
                    ${
                                        isOpen
                                            ? "max-h-40 py-1 opacity-100"
                                            : "max-h-0 py-0 opacity-0 pointer-events-none"
                                    }
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
                            <svg
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

                            {/* "Selector", "ID" veya "XPath" seçildiğinde input gözüksün */}
                            {shouldShowInput(currentType) && (
                                <input
                                    className="text-black bg-white/50 border border-white/65
                             rounded px-2 py-1 text-sm w-24 focus:outline-none hover:bg-white/65"
                                    placeholder="Değer"
                                    value={locators[index]?.value || ""}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Clear All butonu */}
            <div className="mt-4 flex-shrink-0">
                <button
                    onClick={onClearSteps}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1
                     rounded-md text-sm transition-colors"
                >
                    Clear All
                </button>
            </div>
        </div>
    );
}
