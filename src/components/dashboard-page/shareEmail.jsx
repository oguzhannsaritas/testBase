export function ShareEmail() {
    return (
        <div className="flex flex-row right-[235px] top-[560px] relative">
            <div className="relative w-[400px] flex items-center bg-white/70 border border-white/70 rounded-lg
                            shadow-md backdrop-blur-md px-3">

                {/* Sol taraftaki SVG */}
                <div className="absolute left-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="12" fill="url(#paint0_linear_47_2853)"/>
                        <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="black"
                              stroke-opacity="0.5"/>
                        <path
                            d="M17.3334 17.3334H6.66671C5.93337 17.3334 5.33337 16.7334 5.33337 16.0001V8.00008C5.33337 7.26675 5.93337 6.66675 6.66671 6.66675H17.3334C18.0667 6.66675 18.6667 7.26675 18.6667 8.00008V16.0001C18.6667 16.7334 18.0667 17.3334 17.3334 17.3334Z"
                            stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                            stroke-linejoin="round"/>
                        <path
                            d="M17.3334 6.66675H6.66671C5.93337 6.66675 5.33337 7.26675 5.33337 8.00008L12 12.6667L18.6667 8.00008C18.6667 7.26675 18.0667 6.66675 17.3334 6.66675Z"
                            stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
                        <defs>
                            <linearGradient id="paint0_linear_47_2853" x1="12" y1="0" x2="12" y2="24"
                                            gradientUnits="userSpaceOnUse">
                                <stop stop-color="black" stop-opacity="0.02"/>
                                <stop offset="1" stop-color="white" stop-opacity="0.1"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* Input Alanı */}
                <input
                    type="text"
                    placeholder="Share Email"
                    className="w-full h-[32px] bg-transparent pl-12 pr-20 focus:outline-none text-sm"
                />

                {/* Sağ taraftaki Share Butonu */}
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2
                                    flex items-center justify-center w-[80px] h-[28px]
                                    bg-black/5 border border-white/70 rounded-lg
                                    shadow-md backdrop-blur-md cursor-pointer">
                    <span className="text-[13px] font-medium">Share</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.33337 13.3334L10.6667 8.00008L5.33337 2.66675" stroke="black"
                              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}
