import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";
import { HowUsePage } from "./how-use-page/howUsePage.jsx";

export function Banner() {
    const navigate = useNavigate(); // Sayfa yönlendirme için kullanılır.
    const [isOpen, setIsOpen] = useState(false); // Dropdown açık/kapalı durumu
    const dropdownRef = useRef(null);
    const [showHowUse, setShowHowUse] = useState(false); // "Nasıl Kullanırım?" ekranı açık mı?
    const howUseRef = useRef(null);

    const handleSignOut = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        function handleClickOutsideModal(event) {
            if (howUseRef.current && !howUseRef.current.contains(event.target)) {
                setShowHowUse(false);
            }
        }

        if (showHowUse) {
            document.addEventListener("mousedown", handleClickOutsideModal);
        } else {
            document.removeEventListener("mousedown", handleClickOutsideModal);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutsideModal);
        };
    }, [showHowUse]);

    return (
        <div className="relative flex w-full -top-5 z-50">
            <div className="flex flex-row space-x-2 relative left-2 -translate-x-1/2 ">
                <button className="inline-flex items-center justify-start w-[150px] h-[32px]
                                bg-white/70 border border-white/70 rounded-lg
                                shadow-md backdrop-blur-md px-3 cursor-pointer">
                    <span className="flex-1 text-black text-[13px] font-medium leading-5">
                        Create Function
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4V20M4 12H20" stroke="black" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                </button>

                <div className="relative" ref={dropdownRef}>
                    <button
                        className="inline-flex cursor-pointer items-center justify-start w-[170px] h-[32px]
                                    bg-white/70  border border-white/70 rounded-lg
                                    shadow-md backdrop-blur-md px-3"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="flex-1 text-black text-[13px] font-medium leading-5">
                            Kaydedilmiş Testler
                        </span>
                        <svg
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`transition-transform ${isOpen ? "rotate-90" : ""}`}
                        >
                            <path d="M5.83337 13.3333L11.1667 7.99996L5.83337 2.66663" stroke="black" strokeWidth="1.5"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                    <motion.div
                        className="absolute left-0 mt-1 w-[170px] bg-white/70 shadow-lg rounded-lg overflow-hidden"
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0}}
                        transition={{duration: 0.3, ease: "easeInOut"}}
                    >
                        <ul className="space-y-2 py-2 z-2">
                            {[...Array(6)].map((_, i) => (
                                <li key={i} className="border border-white/50 rounded-lg
                                    shadow-md backdrop-blur-md px-3 py-2 hover:bg-black/10 cursor-pointer">
                                    Test {i + 1}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                <button className="inline-flex cursor-pointer items-center justify-start w-[150px] h-[32px]
                                bg-white/70 border border-white/50 rounded-lg
                                shadow-md backdrop-blur-md px-3"
                        onClick={() => setShowHowUse(true)}
                >
                    <span className="flex-1 text-black text-[13px] font-medium leading-5">
                        Nasıl Kullanırım ?
                    </span>
                </button>
            </div>

            <button
                className="absolute -right-60 top-0 inline-flex items-center justify-start w-[132px] h-[32px]
                            bg-white/70 border border-white/70 rounded-lg
                            shadow-md backdrop-blur-md px-3 cursor-pointer"
                onClick={handleSignOut} // Çıkış fonksiyonunu burada çağırıyoruz.
            >
                <span className="flex-1 text-black text-[13px] font-medium leading-5">
                    Sign Out
                </span>
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.83337 13.3333L11.1667 7.99996L5.83337 2.66663" stroke="black" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>

            <AnimatePresence>
                {showHowUse && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center backdrop-blur-[3px] cursor-pointer z-50 bg-black/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            ref={howUseRef}
                            className="bg-white/50 rounded-lg shadow-lg p-1 w-[40%] h-[40%] absolute top-5 left-[30%]"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            {/* Kapatma Butonu */}
                            <button
                                className="absolute top-4 right-6 bg-transparent z-50 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
                                onClick={() => setShowHowUse(false)}
                            >
                                <svg
                                    className="w-5 h-5 text-black !cursor-pointer pointer-events-auto"
                                    fill="currentColor"
                                    viewBox="0 0 1024 1024"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => setShowHowUse(false)}
                                >
                                    <path
                                        d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512 282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0zm0 961.008c-247.024 0-448-201.984-448-449.01 0-247.024 200.976-448 448-448s448 200.977 448 448-200.976 449.01-448 449.01zm181.008-630.016c-12.496-12.496-32.752-12.496-45.248 0L512 466.752l-135.76-135.76c-12.496-12.496-32.752-12.496-45.264 0-12.496 12.496-12.496 32.752 0 45.248L466.736 512l-135.76 135.76c-12.496 12.48-12.496 32.769 0 45.249 12.496 12.496 32.752 12.496 45.264 0L512 557.249l135.76 135.76c12.496 12.496 32.752 12.496 45.248 0 12.496-12.48 12.496-32.769 0-45.249L557.248 512l135.76-135.76c12.512-12.512 12.512-32.768 0-45.248z"
                                    ></path>
                                </svg>
                            </button>

                            <HowUsePage />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
