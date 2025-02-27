import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function Banner() {
    const navigate = useNavigate(); // Sayfa yönlendirme için kullanılır.
    const [isOpen, setIsOpen] = useState(false); // Dropdown açık/kapalı durumu

    const handleSignOut = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    return (
        <div className="relative flex w-full -top-5 z-50">
            <div className="flex flex-row space-x-2 relative left-2 -translate-x-1/2 ">
                <button className="inline-flex items-center justify-start w-[150px] h-[32px]
                                bg-white/50 border border-white/50 rounded-lg
                                shadow-md backdrop-blur-md px-3 cursor-pointer">
                    <span className="flex-1 text-black text-[13px] font-medium leading-5">
                        Create Function
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4V20M4 12H20" stroke="black" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                </button>

                {/* Kaydedilmiş Testler Butonu */}
                <div className="relative">
                    <button
                        className="inline-flex cursor-pointer items-center justify-start w-[170px] h-[32px]
                                    bg-white/50 border border-white/50 rounded-lg
                                    shadow-md backdrop-blur-md px-3"
                        onClick={() => setIsOpen(!isOpen)} // Aç/kapat
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
                                  strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {/* Açılır Menü */}
                    <motion.div
                        className="absolute left-0 mt-1 w-[170px] bg-white/55 shadow-lg rounded-lg overflow-hidden"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <ul className="space-y-2 py-2">
                            <li className="border border-white/50 rounded-lg
                                    shadow-md backdrop-blur-md px-3 py-2 hover:bg-white/50 cursor-pointer">Test 1
                            </li>
                            <li className="border border-white/50 rounded-lg
                                    shadow-md backdrop-blur-md px-3 py-2 hover:bg-white/50 cursor-pointer">Test 2
                            </li>
                            <li className="border border-white/50 rounded-lg
                                    shadow-md backdrop-blur-md px-3 py-2 hover:bg-white/50 cursor-pointer">Test 3
                            </li>
                            <li className="border border-white/50 rounded-lg
                                    shadow-md backdrop-blur-md px-3 py-2 hover:bg-white/50 cursor-pointer">Test 1
                            </li>
                            <li className="border border-white/50 rounded-lg
                                    shadow-md backdrop-blur-md px-3 py-2 hover:bg-white/50 cursor-pointer">Test 2
                            </li>
                            <li className="border border-white/50 rounded-lg
                                    shadow-md backdrop-blur-md px-3 py-2 hover:bg-white/50 cursor-pointer">Test 3
                            </li>
                        </ul>
                    </motion.div>
                </div>

                <button className="inline-flex cursor-pointer items-center justify-start w-[150px] h-[32px]
                                bg-white/50 border border-white/50 rounded-lg
                                shadow-md backdrop-blur-md px-3">
                    <span className="flex-1 text-black text-[13px] font-medium leading-5">
                        Nasıl Kullanırım ?
                    </span>
                </button>
            </div>

            <button
                className="absolute -right-60 top-0 inline-flex items-center justify-start w-[132px] h-[32px]
                            bg-white/50 border border-white/50 rounded-lg
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
        </div>
    );
}
