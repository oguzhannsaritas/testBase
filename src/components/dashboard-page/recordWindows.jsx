import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export function RecordWindows({ setModalContent }) {
    const [images, setImages] = useState([]);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const scrollContainerRef = useRef(null);

    // ✅ API'den ekran görüntülerini al ve sıralama yap
    const fetchScreenshots = async () => {
        try {
            const response = await fetch("http://localhost:5003/api/screenshots");
            let data = await response.json();

            // **En son eklenen en başta olacak şekilde sıralıyoruz**
            data = data.reverse();

            setImages(data);
        } catch (error) {
            console.error("Error fetching screenshots:", error);
        }
    };

    // ✅ İlk yükleme ve her 5 saniyede bir kontrol et
    useEffect(() => {
        fetchScreenshots();
        const interval = setInterval(fetchScreenshots, 5000);
        return () => clearInterval(interval);
    }, []);

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
                    {images.length === 0
                        ? // Eğer görüntü yoksa, 5 tane placeholder göster
                        Array.from({ length: 5 }).map((_, index) => (
                            <div
                                key={index}
                                className="w-[370px] h-48 bg-gradient-to-b p-2 border-solid to-white rounded-[10px] shadow-lg border-[1px] border-black/30 backdrop-blur-[20px] flex flex-col justify-center items-center gap-2.5 animate-pulse"
                            >
                                <div className="w-full  h-full bg-gray-300 rounded-[10px]"><p
                                    className="text-black justify-center flex relative items-center inset-y-20">Görüntü bekleniyor...</p></div>

                            </div>
                        ))
                        : // Eğer görüntüler varsa, onları göster
                        images.map((src, index) => (
                            <div
                                key={index}
                                className="w-[370px] h-48 bg-gradient-to-b border-solid to-white rounded-[10px] shadow-lg border-[1px] border-black/30 backdrop-blur-[20px] flex flex-col justify-start items-center gap-2.5 cursor-pointer p-1"
                                onClick={() => openModal(index)}
                            >
                                <img src={`http://localhost:5003${src}`} alt={`Item ${index + 1}`} className="w-full h-44 object-cover rounded-[10px]" />
                            </div>
                        ))}
                </div>
            </div>

            <div className="mt-2 flex items-center justify-center w-[220px] h-8 p-2 bg-white/50 rounded-full shadow-md border-[1px] border-black/30 border-solid">
                <button
                    onClick={() => scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })}
                    disabled={isAtStart}
                    className={`w-7 h-7 flex items-center justify-center rounded-full border ${isAtStart ? "border-gray-200 bg-gray-100 cursor-not-allowed opacity-50" : "border-gray-300 bg-gray-100 hover:bg-gray-200 shadow-md"}`}
                >
                    ◀
                </button>
                <span className="mx-6 text-lg font-medium text-gray-800">{images.length} görüntü</span>
                <button
                    onClick={() => scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })}
                    disabled={isAtEnd}
                    className={`w-7 h-7 flex items-center justify-center rounded-full border ${isAtEnd ? "border-gray-200 bg-gray-100 cursor-not-allowed opacity-50" : "border-gray-300 bg-gray-100 hover:bg-gray-200 shadow-md"}`}
                >
                    ▶
                </button>
            </div>
        </div>
    );
}

function ModalContent({ images, initialIndex, closeModal }) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const goNext = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    const goPrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    return (
        <div className="fixed inset-0 backdrop-blur-[10px] bg-black/30 border-[1px] border-solid border-black/30 bg-opacity-50 flex justify-center items-center z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative w-[90%] h-[90%] flex justify-center items-center"
            >
                {/* Sol buton (Önceki resim) */}
                <button
                    onClick={goPrev}
                    disabled={currentIndex === 0}
                    className={`absolute -left-16 cursor-pointer top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full border bg-white shadow-md hover:bg-gray-200 ${
                        currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    ◀
                </button>

                {/* Kapama butonu */}
                <button
                    onClick={closeModal}
                    className="absolute top-3 right-3 border border-black border-solid cursor-pointer w-10 h-10 bg-white rounded-full shadow-md hover:bg-gray-200 flex items-center justify-center"
                >
                    X
                </button>

                {/* Resim */}
                <img
                    src={`http://localhost:5003${images[currentIndex]}`}
                    alt="Selected"
                    className="max-w-full max-h-full object-contain rounded-lg"
                />

                {/* Sağ buton (Sonraki resim) */}
                <button
                    onClick={goNext}
                    disabled={currentIndex === images.length - 1}
                    className={`absolute -right-16 cursor-pointer top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full border bg-white shadow-md hover:bg-gray-200 ${
                        currentIndex === images.length - 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    ▶
                </button>
            </motion.div>
        </div>
    );
}

