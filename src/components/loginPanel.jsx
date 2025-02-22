import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../button.module.css";

export function LoginPanel() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault(); // Sayfanın yenilenmesini engeller
        if (email === "oguzhan@gmail.com" && password === "1234") {
            navigate("/dashboard"); // Başarıyla giriş yaptıysa yönlendir
        } else {
            alert("Email veya şifre hatalı!");
        }
    };

    return (
        <div className="rounded-[12px] absolute left-full ml-[30px] -translate-x-1/2 md:right-12 top-[112px] w-full max-w-xs md:max-w-sm bg-black/50 p-6 text-white">
            <div className="grow shrink basis-0 mt-3 text-white/70 text-[15px] font-normal font-['Inter'] leading-tight text-start">
                Please log in to use TestBase.
            </div>

            <div className="my-4 flex ml-7 w-[290px] h-[2px] flex-shrink-0 rounded-[10px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.20)_0%,rgba(255,255,255,0.00)_100%)]" />

            {/* 📌 FORM ELEMANLARI */}
            <form className="space-y-4" onSubmit={handleLogin}>
                <div className="relative">
                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full px-3 py-2 bg-white/10 mt-[10px] rounded-[10px] text-white shadow-[0px_4px_10px_rgba(255,255,255,0.2),inset_0px_1px_3px_rgba(255,255,255,0.4)] placeholder-white/60 border-2 border-white/[0.07] focus:outline-none focus:border-white/20"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                </div>

                <div className="relative">
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-3 py-2 bg-white/10 rounded-[10px] mt-[10px] text-white placeholder-white/60 border-2 border-white/[0.07] focus:outline-none focus:border-white/20 shadow-[0px_4px_10px_rgba(255,255,255,0.2),inset_0px_1px_3px_rgba(255,255,255,0.4)]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </div>

                <div className="flex justify-between items-center text-white text-sm gap-5">
                    <div className={`${styles.buttonShiny} border-2 mt-[10px]`}>
                        <div className={styles.button}>
                            <button type="button" className={styles.shiny}>Forgot password?</button>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.33337 13.3334L10.6667 8.00008L5.33337 2.66675" stroke="white"
                                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className={styles.glow}/>
                    </div>

                    <div className={`${styles.buttonShiny} border-2 mt-[10px]`}>
                        <div className={styles.button}>
                            <button type="submit" className={styles.shiny}>Log in</button>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.33337 13.3334L10.6667 8.00008L5.33337 2.66675" stroke="white"
                                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </form>

            <div
                className="mt-[15px] mb-[18px] flex ml-7 w-[290px] h-[2px] flex-shrink-0 rounded-[10px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.20)_0%,rgba(255,255,255,0.00)_100%)]"/>

            {/* 📌 KAYIT ALANI */}
            <div className="flex flex-col items-center justify-center">
                <div className="text-center text-white text-sm">
                    <p>Still don't have an account?</p>
                    <p className="text-gray-400">It only takes a few seconds to register.</p>
                    <div className="mt-[26px] mb-[6px] flex w-[290px] h-[2px] flex-shrink-0 rounded-[10px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.20)_0%,rgba(255,255,255,0.00)_100%)]" />
                </div>

                <div className={`${styles.buttonShiny} border-2 w-26 flex flex-col items-center justify-center mt-[10px] mb-10`}>
                    <div className={styles.button}>
                        <button className={styles.shiny}>Register</button>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.33337 13.3334L10.6667 8.00008L5.33337 2.66675" stroke="white"
                                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className={styles.glow} />
                </div>
            </div>
        </div>
    );
}
