import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export function RecordWindows({ setModalContent }) {
    const images = [
        "/arkaplan.png", "/world.png", "/arkaplan.png", "/world.png", "/arkaplan.png",
        "/world.png", "/arkaplan.png", "/world.png", "/arkaplan.png", "/world.png"
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const scrollContainerRef = useRef(null);

    const openModal = (index) => {
        setModalContent(
            <ModalContent
                images={images}
                initialIndex={index}
                closeModal={() => setModalContent(null)}
            />
        );
    };

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const atStart = container.scrollLeft === 0;
        const atEnd = Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth;

        setIsAtStart(atStart);
        setIsAtEnd(atEnd);
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        handleScroll();
        container.addEventListener("scroll", handleScroll);

        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="relative flex top-[119px] flex-col items-center">
            <div className="w-[1540px] h-[238px] p-5 bg-gradient-to-b right-[162px] rounded-[10px] shadow-lg border border-white backdrop-blur-[20px] flex items-start gap-2.5 overflow-x-auto scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-100" ref={scrollContainerRef}>
                <div className="flex gap-2.5">
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className="w-96 h-48 bg-gradient-to-b border-solid to-white rounded-[10px] shadow-lg border-[1px] border-black/30 backdrop-blur-[20px] flex flex-col justify-start items-center gap-2.5 cursor-pointer p-1"
                            onClick={() => openModal(index)}
                        >
                            <img src={src} alt={`Item ${index + 1}`} className="w-full h-44 object-cover rounded-[10px]" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-2 flex items-center justify-center w-[220px] h-8 p-2 bg-white/50 rounded-full shadow-md border-[1px] border-black/30 border-solid">
                <button
                    onClick={() => scrollContainerRef.current.scrollBy({left: -300, behavior: "smooth"})}
                    disabled={isAtStart}
                    className={`w-7 h-7 flex items-center justify-center rounded-full border ${isAtStart ? "border-gray-200 bg-gray-100 cursor-not-allowed opacity-50" : "border-gray-300 bg-gray-100 hover:bg-gray-200 shadow-md"}`}
                >
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.66675 1.66671L1.33341 7.00004L6.66675 12.3334" stroke="black" stroke-width="1.5"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                </button>
                <span className="mx-6 text-lg font-medium text-gray-800">{currentIndex + 1} of {images.length}</span>
                <button
                    onClick={() => scrollContainerRef.current.scrollBy({left: 300, behavior: "smooth"})}
                    disabled={isAtEnd}
                    className={`w-7 h-7 flex items-center justify-center rounded-full border ${isAtEnd ? "border-gray-200 bg-gray-100 cursor-not-allowed opacity-50" : "border-gray-300 bg-gray-100 hover:bg-gray-200 shadow-md"}`}
                >
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.33325 12.3333L6.66659 6.99996L1.33325 1.66663" stroke="black" stroke-width="1.5"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                </button>
            </div>
        </div>
    );
}

function ModalContent({images, initialIndex, closeModal}) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    return (
        <div
            className="fixed inset-0 backdrop-blur-[10px] bg-black/30 border-[1px] border-solid border-black/30 bg-opacity-50 flex justify-center items-center z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative w-[90%] h-[90%] flex justify-center items-center"
            >
                <button
                    className="absolute -left-10 p-2 w-10 h-10 flex items-center justify-center cursor-pointer bg-white rounded-full shadow-md hover:bg-gray-200"
                    onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev))}
                >
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.66675 1.66671L1.33341 7.00004L6.66675 12.3334" stroke="black" stroke-width="1.5"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <img src={images[currentIndex]} alt="Selected"
                     className="max-w-full max-h-full object-contain rounded-lg"/>
                <button
                    className="absolute -right-10 p-2 w-10 h-10 flex items-center justify-center cursor-pointer bg-white rounded-full shadow-md hover:bg-gray-200"
                    onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : prev))}
                >
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.33325 12.3333L6.66659 6.99996L1.33325 1.66663" stroke="black" stroke-width="1.5"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button
                    className="absolute top-1 -right-8  w-10 h-10 flex items-center justify-center p-2 cursor-pointer bg-white rounded-full shadow-md hover:bg-gray-200"
                    onClick={closeModal}
                >
                    X
                </button>
            </motion.div>
        </div>
    );
}