import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export function RecordWindows({ setModalContent }) {
    const images = [
        "/arkaplan.png", "/arkaplan.png", "/arkaplan.png", "/arkaplan.png", "/arkaplan.png",
        "/arkaplan.png", "/arkaplan.png", "/arkaplan.png", "/arkaplan.png", "/arkaplan.png"
    ]; // Farklı resimler kullanabilirsin

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const scrollContainerRef = useRef(null);

    const openModal = (index) => {
        setModalContent(
            <div className="fixed inset-0 backdrop-blur-[3px] bg-white/50 border-[1px] border-solid border-black/30 bg-opacity-50 flex justify-center items-center z-50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative w-[90%] h-[90%] flex justify-center items-center"
                >
                    <img src={images[index]} alt="Common Image" className="max-w-full max-h-full object-contain rounded-lg" />
                    <button
                        className="absolute top-4 right-4 p-2 cursor-pointer bg-white rounded-full shadow-md hover:bg-gray-200"
                        onClick={() => setModalContent(null)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </motion.div>
            </div>
        );
    };

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const atStart = container.scrollLeft === 0;
        const atEnd = Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth;

        setIsAtStart(atStart);
        setIsAtEnd(atEnd);

        // Şu anki pozisyonu hesapla
        const index = Math.round(container.scrollLeft / 300); // 300px genişlikte kaydırılıyor
        setCurrentIndex(index);
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    // Sayfa yüklendiğinde ve kaydırma olduğunda başlat
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        handleScroll(); // İlk yüklemede kontrol et
        container.addEventListener("scroll", handleScroll);

        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="relative flex top-[119px] flex-col items-center">
            {/* Orijinal Tasarım: Scroll Container */}
            <div className="w-[1540px] h-[238px] p-5 bg-gradient-to-b  right-[162px] rounded-[10px] shadow-lg border border-white backdrop-blur-[20px] flex items-start gap-2.5 overflow-x-auto scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-100" ref={scrollContainerRef}>
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

            {/* **Yeni Scroll Navigation (DIV'İN DIŞINDA)** */}
            <div className="mt-2 flex items-center justify-center w-[220px] h-8 p-2 bg-white/50  rounded-full shadow-md border-[1px] border-black/30 border-solid">
                <button
                    onClick={scrollLeft}
                    disabled={isAtStart}
                    className={`w-7 h-7 flex items-center justify-center rounded-full border ${isAtStart ? "border-gray-200 bg-gray-100 cursor-not-allowed opacity-50" : "border-gray-300 bg-gray-100 hover:bg-gray-200 shadow-md"}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <span className="mx-6 text-lg font-medium text-gray-800">{currentIndex + 1} of {images.length}</span>
                <button
                    onClick={scrollRight}
                    disabled={isAtEnd}
                    className={`w-7 h-7 flex items-center justify-center rounded-full border ${isAtEnd ? "border-gray-200 bg-gray-100 cursor-not-allowed opacity-50" : "border-gray-300 bg-gray-100 hover:bg-gray-200 shadow-md"}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
