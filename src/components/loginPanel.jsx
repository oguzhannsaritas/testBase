import styles from "../button.module.css";

export function LoginPanel() {
    return (
        <div
            className="rounded-[12px] absolute left-2/2 -translate-x-1/2 md:right-12 top-[200px] w-full max-w-xs md:max-w-sm bg-black/50 p-6 text-white">
            <div className="w-[220px] h-5 justify-start items-center gap-2 inline-flex">
                <div
                    className="grow shrink basis-0 mt-3 text-white/70 text-[15px] font-normal font-['Inter'] leading-tight text-start  ">
                    Please log in to use TestBase.
                </div>
            </div>

            {/* Ayrım çizgisi */}
            <div
                className="my-4 flex ml-7 w-[290px] h-[2px] flex-shrink-0 rounded-[10px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.20)_0%,rgba(255,255,255,0.00)_100%)]">
            </div>

            {/* Form elemanları */}
            <div className="space-y-4">
                <div className="relative ">
                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full px-3 py-2  bg-white/10  mt-[10px] rounded-[10px] text-white  placeholder-white/60 border-2 border-white/[0.07] focus:outline-none focus:border-white/20"
                    />
                    <div className="absolute right-2 top-7 -translate-y-1/2">
                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <rect width="24" height="24" rx="12" fill="url(#paint0_linear_47_2853)"/>
                                <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="white"
                                      stroke-opacity="0.1"/>
                                <path
                                    d="M17.3334 17.3334H6.66671C5.93337 17.3334 5.33337 16.7334 5.33337 16.0001V8.00008C5.33337 7.26675 5.93337 6.66675 6.66671 6.66675H17.3334C18.0667 6.66675 18.6667 7.26675 18.6667 8.00008V16.0001C18.6667 16.7334 18.0667 17.3334 17.3334 17.3334Z"
                                    stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                    stroke-linejoin="round"/>
                                <path
                                    d="M17.3334 6.66675H6.66671C5.93337 6.66675 5.33337 7.26675 5.33337 8.00008L12 12.6667L18.6667 8.00008C18.6667 7.26675 18.0667 6.66675 17.3334 6.66675Z"
                                    stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
                                <defs>
                                    <linearGradient id="paint0_linear_47_2853" x1="12" y1="0" x2="12" y2="24"
                                                    gradientUnits="userSpaceOnUse">
                                        <stop stop-color="white" stop-opacity="0.02"/>
                                        <stop offset="1" stop-color="white" stop-opacity="0.1"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-3 py-2  bg-white/10 rounded-[10px] mt-[10px] text-white placeholder-white/60 border-2 border-white/[0.07] focus:outline-none focus:border-white/20"
                    />
                    <div className="absolute right-2 top-7 -translate-y-1/2">
                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <rect width="24" height="24" rx="12" fill="url(#paint0_linear_47_2877)"/>
                                <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="black"
                                      stroke-opacity="0.1"/>

                                <g transform="translate(4,4)">
                                    <path
                                        d="M2.33337 3.33325C1.78004 3.33325 1.33337 3.77992 1.33337 4.33325V11.6666C1.33337 12.2199 1.78004 12.6666 2.33337 12.6666H13.6667C14.22 12.6666 14.6667 12.2199 14.6667 11.6666V4.33325C14.6667 3.77992 14.22 3.33325 13.6667 3.33325H2.33337Z"
                                        stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                    <path d="M3.33337 10.6667H12.6667" stroke="white" stroke-width="1.5"
                                          stroke-linecap="round"/>
                                    <path d="M9.33337 5.33325H12.6667" stroke="white" stroke-width="1.5"
                                          stroke-linecap="round"/>
                                    <path d="M9.33337 7.33325H12.6667" stroke="white" stroke-width="1.5"
                                          stroke-linecap="round"/>
                                    <path
                                        d="M3.33337 5.83325V6.83325C3.33337 7.10939 3.55723 7.33325 3.83337 7.33325H6.16671C6.44285 7.33325 6.66671 7.10939 6.66671 6.83325V5.83325C6.66671 5.55711 6.44285 5.33325 6.16671 5.33325H3.83337C3.55723 5.33325 3.33337 5.55711 3.33337 5.83325Z"
                                        stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                                </g>

                                <defs>
                                    <linearGradient id="paint0_linear_47_2877" x1="12" y1="0" x2="12" y2="24"
                                                    gradientUnits="userSpaceOnUse">
                                        <stop stop-color="white" stop-opacity="0.02"/>
                                        <stop offset="1" stop-color="white" stop-opacity="0.5"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>

                    </div>
                </div>

                <div className="flex justify-between items-center text-white text-sm gap-5">
                    <div
                        className={`${styles.buttonShiny} border-2 mt-[10px] shadow-[0px_4px_10px_rgba(255,255,255,0.2),inset_0px_1px_3px_rgba(255,255,255,0.4)]`}>
                        <div className={styles.button}>
                            <button className={styles.shiny}>Forgot password ?</button>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.33337 13.3334L10.6667 8.00008L5.33337 2.66675" stroke="white"
                                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className={styles.glow}/>
                        <div/>
                    </div>

                    <div
                        className={`${styles.buttonShiny} border-2 mt-[10px] shadow-[0px_4px_10px_rgba(255,255,255,0.2),inset_0px_1px_3px_rgba(255,255,255,0.4)]`}>
                        <div className={styles.button}>
                            <button className={styles.shiny}>Log in</button>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.33337 13.3334L10.6667 8.00008L5.33337 2.66675" stroke="white"
                                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className={styles.glow}/>
                        <div/>
                    </div>
                </div>
            </div>

            {/* Ayrım çizgisi */}
            <div
                className="  mt-[15px] mb-[18px] flex ml-7 w-[290px] h-[2px] flex-shrink-0 rounded-[10px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.20)_0%,rgba(255,255,255,0.00)_100%)]">
            </div>

            {/* Kayıt alanı */}

            <div className="flex flex-col items-center justify-center ">
                <div className=" text-center text-white text-sm">
                    <p>Still don't have an account?</p>
                    <p className="text-gray-400">It only takes a few seconds to register.</p>

                    <div
                        className="mt-[26px] mb-[6px] flex w-[290px] h-[2px] flex-shrink-0 rounded-[10px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.20)_0%,rgba(255,255,255,0.00)_100%)]">
                    </div>
                </div>


                <div
                    className={`${styles.buttonShiny} border-2 w-26 flex flex-col items-center justify-center mt-[10px] shadow-[0px_4px_10px_rgba(255,255,255,0.2),inset_0px_1px_3px_rgba(255,255,255,0.4)]`}>
                    <div className={styles.button}>
                        <button className={styles.shiny}>Log in</button>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.33337 13.3334L10.6667 8.00008L5.33337 2.66675" stroke="white"
                                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className={styles.glow}/>
                </div>

            </div>

        </div>
    );
}
