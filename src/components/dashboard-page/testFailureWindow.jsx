import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner"; // Sonner toast bildirimini import ettik

export function TestFailureWindow({ videoInfo }) {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [isImageOpen, setIsImageOpen] = useState(false);

    const finalVideoSrc = videoInfo && videoInfo.video
        ? "/videos/" + videoInfo.video
        : null;

    // Eğer thumbnail varsa resim göster, yoksa "Görüntü bekleniyor..." div'i göster
    const finalThumbnail = videoInfo && videoInfo.thumbnail ? (
        <img
            src={"/videos/" + videoInfo.thumbnail}
            alt="Test Failure"
            className="w-full h-full rounded-lg cursor-pointer"
            onClick={() => setIsImageOpen(true)}
        />
    ) : (
        <div className="w-full h-full bg-gray-300 rounded-[10px] flex justify-center items-center">
        </div>
    );

    // Video ikonuna tıklanıldığında çalışacak fonksiyon
    const handleVideoClick = () => {
        if (finalVideoSrc) {
            setIsVideoOpen(true);
        } else {
            toast.error(
                <>
                    The test has not been run, please run the test.
                    <br />
                    If you have run the test, please wait
                </>
            );
        }
    };

    return (
        <div className="flex flex-row space-x-2 relative justify-center items-center left-[0.6%] top-[147px]">
            <svg width="550"
                 height="450"
                 viewBox="0 0 436 345"
                 className="scale-y-90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_ddd_2_2045)">
                    <rect x="396" y="20" width="265" height="356" rx="10" transform="rotate(90 396 20)"
                          fill="url(#paint0_linear_2_2045)" shapeRendering="crispEdges"/>
                    <rect x="395.5" y="20.5" width="264" height="355" rx="9.5" transform="rotate(90 395.5 20.5)"
                          stroke="white" strokeOpacity="0.1" shapeRendering="crispEdges"/>
                </g>
            </svg>

            {/* Thumbnail veya Bekleme Ekranı */}
            <div className="absolute w-[35%] h-64 left-[32.2%] top-[75px] transition-transform duration-300">
                {finalThumbnail}

                {/* Play İkonu */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleVideoClick}
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="black"
                    className="absolute inset-0 cursor-pointer border-solid border-2 border-black hover:scale-110 transition-transform duration-300 rounded-full m-auto opacity-80"
                >
                    <path d="M8 5v14l11-7z"/>
                </svg>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {isVideoOpen && finalVideoSrc && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-[9999]"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <motion.div
                            className="relative bg-white/50 border-[1px] border-solid border-white/50 p-4 rounded-lg shadow-lg max-w-3xl"
                            initial={{scale: 0.8, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.8, opacity: 0}}
                            transition={{duration: 0.3, ease: "easeOut"}}
                        >
                            <button
                                onClick={() => setIsVideoOpen(false)}
                                className="absolute -right-12 -top-12 bg-white/50 border-[1px] border-solid border-black/30 p-2 z-50 cursor-pointer rounded-full hover:bg-white"
                            >
                                <X size={20}/>
                            </button>

                            <motion.video
                                src={finalVideoSrc}
                                autoPlay
                                controls
                                className="w-full h-auto rounded-lg"
                                initial={{scale: 2, opacity: 2}}
                                animate={{scale: 1, opacity: 1}}
                                exit={{scale: 0.8, opacity: 0}}
                                transition={{duration: 0.3}}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Resim Modal */}
            <AnimatePresence>
                {isImageOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-[9999]"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <motion.div
                            className="relative bg-white/50 border-[1px] border-solid border-white/50 p-4 rounded-lg shadow-lg max-w-3xl"
                            initial={{scale: 0.8, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.8, opacity: 0}}
                            transition={{duration: 0.3, ease: "easeOut"}}
                        >
                            <button
                                onClick={() => setIsImageOpen(false)}
                                className="absolute -right-12 -top-12 bg-white/50 border-[1px] border-solid border-black/30 p-2 z-50 cursor-pointer rounded-full hover:bg-white"
                            >
                                <X size={20}/>
                            </button>

                            <motion.img
                                src={videoInfo && videoInfo.thumbnail ? "/videos/" + videoInfo.thumbnail : ""}
                                className="w-full h-auto rounded-lg"
                                initial={{scale: 2, opacity: 2}}
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
