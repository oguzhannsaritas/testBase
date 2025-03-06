import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../button.module.css";

export function LoginPanel() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault(); // Sayfanın yenilenmesini engeller
        if (email === "oguzhan@gmail.com" && password === "1234") {
            navigate("/dashboard"); // Başarıyla giriş yaptıysa yönlendir
        } else {
            alert("Email veya şifre hatalı!");
        }
    };

    return (
        <div
            className="rounded-[12px] absolute left-full ml-[30px] shadow-lg  -translate-x-1/2 md:right-12 top-[112px] w-full border border-gray-300 max-w-xs md:max-w-sm bg-white/50 p-6 text-white">
            <div className="w-[240px] h-5 justify-start items-center gap-2 inline-flex">
                <div
                    className="grow shrink basis-0 mt-3 text-black/70 text-[15px] font-normal font-['Inter'] leading-tight text-start  ">
                    Please Login to use TestBase
                </div>
            </div>
            <div
                className="my-4 flex ml-7 w-[290px] h-[2px] flex-shrink-0 rounded-[10px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,0,1.100)_0%,rgba(0,0,0,0.00)_100%)]"/>

            {/* 📌 FORM ELEMANLARI */}
            <form className="space-y-4" onSubmit={handleLogin}>
                <div className="relative">
                    <input
                        type="email"
                        id="LoginEmailInput"
                        placeholder="Email address"
                        className="w-full px-3 py-2 text-sm  mt-[10px] placeholder-black rounded-[10px] text-black shadow-[0px_4px_10px_rgba(255,255,255,0.2),inset_0px_1px_3px_rgba(255,255,255,0.4)]  bg-white/40 border-2 border-white/20 focus:outline-none "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        style={{
                            whiteSpace: "nowrap",  // 🔥 Metin alt satıra geçmez
                            overflowX: "auto",  // 🔥 Uzun metin olursa yatay scroll eklenir
                            paddingRight: "40px", // Sağ tarafı biraz boş bırak
                        }}
                    />

                    <div className="absolute right-2 top-7 -translate-y-1/2">
                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <rect width="24" height="24" rx="12" fill="url(#paint0_linear_47_2853)"/>
                                <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="black"
                                      stroke-opacity="0.1"/>
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
                                        <stop stop-color="white" stop-opacity="0.02"/>
                                        <stop offset="1" stop-color="black" stop-opacity="0.1"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>

                </div>

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="loginPasswordInput"
                        placeholder="Password"
                        className="w-full px-3 py-2 text-sm rounded-[10px] mt-[10px] text-black placeholder-black border-2 border-white/[0.07] focus:outline-none focus:border-white/20 shadow-[0px_4px_10px_rgba(255,255,255,0.2),inset_0px_1px_3px_rgba(255,255,255,0.4)] bg-white/40"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        style={{
                            whiteSpace: "nowrap",  // 🔥 Metin alt satıra geçmez
                            overflowX: "auto",  // 🔥 Uzun metin olursa yatay scroll eklenir
                            paddingRight: "40px", // Sağ tarafı biraz boş bırak
                        }} />

                    <div
                        className="absolute right-2 top-7 -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <rect width="24" height="24" rx="12" fill="url(#paint0_linear)"/>
                                <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="black"
                                      strokeOpacity="0.1"/>
                                <g transform="translate(5,5)">
                                    <path d="M10 3C10 1.5 8.5 1 7 1C5.5 1 4 2 4 6V6"
                                          stroke="black" strokeWidth="1.5"/>
                                    <rect x="2" y="6" width="10" height="7" rx="1.5"
                                          stroke="black" strokeWidth="1.5"/>
                                    <circle cx="7" cy="9" r="1" fill="black"/>
                                    <line x1="7" y1="10" x2="7" y2="11"
                                          stroke="black" strokeWidth="1.5"/>
                                </g>
                                <defs>
                                    <linearGradient id="paint0_linear" x1="12" y1="0" x2="12" y2="24"
                                                    gradientUnits="userSpaceOnUse">
                                        <stop stopColor="white" stopOpacity="0.02"/>
                                        <stop offset="1" stopColor="white" stopOpacity="0.5"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        ) : (
                            // Kapalı kilit simgesi (Şifre gizliyken)
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <rect width="24" height="24" rx="12" fill="url(#paint0_linear)"/>
                                <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="black"
                                      strokeOpacity="0.1"/>
                                <g transform="translate(5,5)">
                                    <path d="M4 6V4C4 2.34315 5.34315 1 7 1C8.65685 1 10 2.34315 10 4V6"
                                          stroke="black" strokeWidth="1.5"/>
                                    <rect x="2" y="6" width="10" height="7" rx="1.5"
                                          stroke="black" strokeWidth="1.5"/>
                                    <circle cx="7" cy="9" r="1" fill="black"/>
                                    <line x1="7" y1="10" x2="7" y2="11"
                                          stroke="black" strokeWidth="1.5"/>
                                </g>
                                <defs>
                                    <linearGradient id="paint0_linear" x1="12" y1="0" x2="12" y2="24"
                                                    gradientUnits="userSpaceOnUse">
                                        <stop stopColor="white" stopOpacity="0.02"/>
                                        <stop offset="1" stopColor="white" stopOpacity="0.5"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        )}
                    </div>
                </div>
                <div className="flex justify-between items-center text-white text-sm gap-5">
                    <div
                        className={`${styles.buttonShiny} cursor-pointer border-[1px] border-black/30 mt-[10px] border-solid bg-transparent shadow-[0px_4px_10px_rgba(0,0,0,0.5),inset_0px_0px_3px_rgba(0,0,0,0.5)]`}>
                        <div className={styles.button}>
                            <button type="button" className={`${styles.shiny} cursor-pointer !text-black`}>Forgot
                                password?
                            </button>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.33337 13.3334L10.6667 8.00008L5.33337 2.66675" stroke="black"
                                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className={styles.glow}/>
                    </div>

                    <div
                        className={`${styles.buttonShiny} border-[1px ] border-solid mt-[10px]  border-black/30  bg-transparent shadow-[0px_4px_10px_rgba(0,0,0,0.5),inset_0px_0px_3px_rgba(0,0,0,0.5)]`}>
                        <div
                            className={`${styles.button}  cursor-pointer `}>
                            <button type="submit" id="loginButton" className={`${styles.shiny} cursor-pointer !text-black`}>Log in
                            </button>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.33337 13.3334L10.6667 8.00008L5.33337 2.66675" stroke="black"
                                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </form>

            <div
                className="mt-[15px] mb-[18px] flex ml-[22px] w-[290px] h-[2px] flex-shrink-0 rounded-[10px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,0,1.100)_0%,rgba(0,0,0,0.00)_100%)]"/>

            {/* 📌 KAYIT ALANI */}
            <div className="flex flex-col items-center justify-center">
                <div className="text-center text-black/70 text-sm">
                    <p>Still don't have an account?</p>
                    <p className="text-black/70">It only takes a few seconds to register.</p>
                    <div
                        className="mt-[26px] mb-[6px] flex w-[290px] h-[2px] flex-shrink-0 rounded-[10px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,0,1.100)_0%,rgba(0,0,0,0.00)_100%)]"/>
                </div>


                <div
                    className={`${styles.buttonShiny} border-[1px] border-solid border-black/30 w-26 flex flex-col items-center justify-center mt-[10px] mb-10 cursor-pointer bg-transparent shadow-[0px_4px_10px_rgba(0,0,0,0.5),inset_0px_0px_3px_rgba(0,0,0,0.5)]`}>
                    <div
                        className={`${styles.button}  cursor-pointer `}>
                        <button className={`${styles.shiny} !text-black`}>Register</button>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.33337 13.3334L10.6667 8.00008L5.33337 2.66675" stroke="black"
                                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className={styles.glow}/>
                </div>
            </div>
        </div>
    );
}
