import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export function Banner() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [showHowUse, setShowHowUse] = useState(false);
    const howUseRef = useRef(null);
    const [selectedVideo, setSelectedVideo] = useState(null);

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

    return (
        <div className="relative flex w-full -top-5 z-50">
            <div className="flex flex-row space-x-2 relative left-2 -translate-x-1/2 ">
                <button className="inline-flex items-center justify-start w-[150px] h-[32px]
                                bg-white/70 border border-white/70 rounded-lg
                                shadow-md backdrop-blur-md px-3 cursor-pointer">
                    <span className="flex-1 text-black text-[13px] font-medium leading-5">
                        Create Function
                    </span>
                </button>

                <div className="relative" ref={dropdownRef}>
                    <button
                        className="inline-flex cursor-pointer items-center justify-start w-[170px] h-[32px]
                                    bg-white/70 border border-white/70 rounded-lg
                                    shadow-md backdrop-blur-md px-3"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="flex-1 text-black text-[13px] font-medium leading-5">
                            Kaydedilmiş Testler
                        </span>
                        <span className="ml-2">
                            {isOpen ? (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down">
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                            ) : (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right">
                                    <path d="M9 6l6 6-6 6"></path>
                                </svg>
                            )}
                        </span>
                    </button>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                className="absolute left-0 mt-1 w-[170px] bg-white/70 shadow-lg rounded-lg overflow-hidden"
                                initial={{ opacity: 1, height: 1 }}
                                animate={{ opacity: 2, height: "auto" }}
                                exit={{ opacity: 2, height: 2 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
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
                        )}
                    </AnimatePresence>
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
                onClick={handleSignOut}
            >
                <span className="flex-1 text-black text-[13px] font-medium leading-5">
                    Sign Out
                </span>
            </button>

            <AnimatePresence>
                {showHowUse && !selectedVideo && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center backdrop-blur-[3px] z-50 bg-black/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            ref={howUseRef}
                            className="bg-white/50 rounded-lg shadow-lg p-5 w-[40%] h-[40%] flex flex-col justify-center items-center"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <button
                                className="relative -top-40 -right-80   border border-solid border-black/40 shadow-md backdrop-blur  z-50 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-white/40"
                                onClick={() => setShowHowUse(false)}
                            >
                                ✕
                            </button>
                            <div className="flex relative flex-row items-center justify-center -top-4 space-x-4">
                                {["/06.mp4", "/01.mp4", "/05.mp4", "/video4.mp4"].map((video, index) => (
                                    <button
                                        key={index}
                                        className="bg-gray-200 px-4 cursor-pointer py-2 rounded-lg hover:bg-gray-300"
                                        onClick={() => setSelectedVideo(video)}
                                    >
                                        Video {index + 1}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center backdrop-blur-[3px] z-50 bg-black/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="bg-white/50 rounded-lg shadow-lg p-5 w-[50%] h-[50%] flex flex-col justify-center items-center"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <button
                                className="absolute top-60 right-96 bg-white/40 border border-solid border-black/50  z-50 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-white/55"
                                onClick={() => setSelectedVideo(null)}
                            >
                                ⬅
                            </button>
                            <video key={selectedVideo} className="w-full h-full object-cover rounded-lg shadow-lg" controls>
                                <source src={selectedVideo} type="video/mp4" />
                            </video>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
