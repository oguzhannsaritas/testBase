import { useState } from "react";

export function PricingCard2() {
    const [hover, setHover] = useState(false);

    return (
        <div
            className="relative w-[340px] h-[399px] top-64 flex flex-col items-center"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {/* Content with Background */}
            <div
                className="relative flex flex-col items-center p-6 w-[340px] h-[399px] rounded-[10px] border border-gray-300
                        backdrop-blur-[20px] shadow-[0px_5px_10px_0px_rgba(0,0,0,0.10)] transition-all duration-1000"
                style={{
                    background: hover
                        ? "rgba(0, 0, 0, 0.1)"
                        : "rgba(255, 255, 255, 0.5)",
                    boxShadow: hover
                        ? "0px 10px 20px rgba(0, 0, 0, 0.1)"
                        : "0px 5px 10px rgba(0,0,0,0.10)"
                }}
            >
                <div className={`text-sm font-medium mb-5 leading-tight transition-all duration-300 ${hover ? "text-black" : "text-black"}`}>
                    All-Access
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className={`text-4xl font-semibold font-['Inter'] transition-all duration-300 ${hover ? "text-black" : "text-black"}`}>
                        $99
                    </div>
                    <div className={`text-[14px] font-normal transition-all duration-300 ${hover ? "text-black/50" : "text-black/50"}`}>
                        One-time
                    </div>
                </div>

                <div
                    className={`w-full h-px  bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,0,1.100)_0%,rgba(0,0,0,0.00)_100%)] my-4`}
                ></div>

                {/* Features */}
                <div className="flex flex-col gap-3 w-full">
                    {["All 300+ components", "2,000+ Figma variants", "2,116 unique icons"].map((text, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className="relative">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8 8C9.52047 6.47953 10.2807 5.7193 11.0415 5.21701C14.0491 3.23156 17.9509 3.23156 20.9585 5.21701C21.7193 5.7193 22.4795 6.47953 24 8V8C25.5205 9.52047 26.2807 10.2807 26.783 11.0415C28.7684 14.0491 28.7684 17.9509 26.783 20.9585C26.2807 21.7193 25.5205 22.4795 24 24V24C22.4795 25.5205 21.7193 26.2807 20.9585 26.783C17.9509 28.7684 14.0491 28.7684 11.0415 26.783C10.2807 26.2807 9.52047 25.5205 8 24V24C6.47953 22.4795 5.7193 21.7193 5.21701 20.9585C3.23156 17.9509 3.23156 14.0491 5.21701 11.0415C5.7193 10.2807 6.47953 9.52047 8 8V8Z"
                                        fill={hover ? "url(#paint0_linear_172_453)" : "rgba(255,255,255,0.5)"}/>
                                    <path
                                        d="M8.35355 8.35355C9.89146 6.81565 10.6091 6.10163 11.317 5.63428C14.1574 3.75913 17.8426 3.75913 20.683 5.63428C21.3909 6.10163 22.1085 6.81565 23.6464 8.35355C25.1844 9.89146 25.8984 10.6091 26.3657 11.317C28.2409 14.1574 28.2409 17.8426 26.3657 20.683C25.8984 21.3909 25.1843 22.1085 23.6464 23.6464C22.1085 25.1843 21.3909 25.8984 20.683 26.3657C17.8426 28.2409 14.1574 28.2409 11.317 26.3657C10.6091 25.8984 9.89146 25.1844 8.35355 23.6464C6.81565 22.1085 6.10163 21.3909 5.63428 20.683C3.75913 17.8426 3.75913 14.1574 5.63428 11.317C6.10163 10.6091 6.81565 9.89146 8.35355 8.35355Z"
                                        stroke="black" stroke-opacity="0.1"/>
                                    <path
                                        d="M9.33325 16.4934L13.4199 20.5801"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M13.4199 20.5799L22.6666 11.3333"
                                        stroke="black"
                                        strokeWidth="1.5"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <defs>
                                        <linearGradient id="paint0_linear_176_2756" x1="16" y1="0" x2="16" y2="32"
                                                        gradientUnits="userSpaceOnUse">
                                            <stop stopColor="white" stopOpacity="0.02"/>
                                            <stop offset="1" stopColor="white" stopOpacity="0.1"/>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <div
                                className={`text-[14px] font-medium transition-all duration-300 ${hover ? "text-black" : "text-black"}`}>
                                {text}
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    className={`w-full h-px transition-all duration-300 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,0,1.100)_0%,rgba(0,0,0,0.00)_100%)]
 my-4`}
                ></div>

                {/* Buy Button */}
                <button
                    className={`px-5 py-2 rounded-lg border cursor-pointer border-black/10 flex items-center gap-2 transition-all duration-300
                    ${hover ? "bg-white text-black shadow-md" : "bg-transparent text-black border-white/50 shadow-[0px_4px_10px_rgba(255,255,255,0.2),inset_0px_1px_3px_rgba(255,255,255,0.4)]"}`}
                >
                <span className="text-[14px] font-medium">Buy now</span>
                    <span>💳</span>
                </button>
            </div>
        </div>
    );
}
