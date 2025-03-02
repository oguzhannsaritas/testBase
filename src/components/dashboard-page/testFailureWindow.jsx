import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function TestFailureWindow() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-row space-x-2 relative justify-center  items-center left-[0.6%] top-[147px]">
            {/* SVG Arkaplan */}
            <svg width="550" height="450" viewBox="0 0 436 345" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_ddd_2_2045)">
                    <rect x="396" y="20" width="265" height="356" rx="10" transform="rotate(90 396 20)"
                          fill="url(#paint0_linear_2_2045)" shape-rendering="crispEdges"/>
                    <rect x="395.5" y="20.5" width="264" height="355" rx="9.5" transform="rotate(90 395.5 20.5)"
                          stroke="white" stroke-opacity="0.1" shape-rendering="crispEdges"/>
                    <rect x="395.5" y="20.5" width="264" height="355" rx="9.5" transform="rotate(90 395.5 20.5)"
                          stroke="url(#paint1_linear_2_2045)" style="mix-blend-mode:overlay"
                          shape-rendering="crispEdges"/>
                </g>
                <defs>
                    <filter id="filter0_ddd_2_2045" x="0" y="0" width="436" height="345" filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dy="20"/>
                        <feGaussianBlur stdDeviation="20"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_2045"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dy="15"/>
                        <feGaussianBlur stdDeviation="15"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                        <feBlend mode="normal" in2="effect1_dropShadow_2_2045" result="effect2_dropShadow_2_2045"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dy="5"/>
                        <feGaussianBlur stdDeviation="5"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                        <feBlend mode="normal" in2="effect2_dropShadow_2_2045" result="effect3_dropShadow_2_2045"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow_2_2045" result="shape"/>
                    </filter>
                    <linearGradient id="paint0_linear_2_2045" x1="528.5" y1="20" x2="528.5" y2="376"
                                    gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" stop-opacity="0.6"/>
                        <stop offset="1" stop-color="white" stop-opacity="0.5"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_2_2045" x1="471.083" y1="239.533" x2="681.387" y2="82.9873"
                                    gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" stop-opacity="0"/>
                        <stop offset="1" stop-color="white"/>
                    </linearGradient>
                </defs>
            </svg>

            {/* Resim - SVG'nin Üstüne Geliyor */}
            <img
                src="/arkaplan.png" // Burayı kendi resim yolunla değiştir
                alt="Test Failure"
                className="absolute w-[35%] h-80 left-[32.2%] cursor-pointer top-10 rounded-lg transition-transform duration-300 "
                onClick={() => setIsOpen(true)}
            />

            {/* AnimatePresence ile Animasyonlu Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-[9999]"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <motion.div
                            className="relative bg-white/50 border-[1px] border-solid border-black/30 p-4 rounded-lg shadow-lg max-w-3xl"
                            initial={{scale: 0.8, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.8, opacity: 0}}
                            transition={{duration: 0.3, ease: "easeOut"}}
                        >
                            {/* Kapatma Butonu */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-2  right-2 bg-white/50 border-[1px] border-solid border-black/30 p-2 rounded-full hover:bg-gray-300"
                            >
                                <X size={20}/>
                            </button>

                            {/* Büyük Resim */}
                            <motion.img
                                src="/arkaplan.png" // Aynı resmi burada da kullanıyoruz
                                alt="Test Failure Enlarged"
                                className="w-full h-auto rounded-lg"
                                initial={{scale: 0.8, opacity: 0}}
                                animate={{scale: 1, opacity: 1}}
                                exit={{scale: 0.8, opacity: 0}}
                                transition={{duration: 0.3}}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
