import { useState } from "react";

export function PricingCard4() {
    return (
        <div
            className="group relative flex flex-col items-center p-6 w-[340px] top-[148px] rounded-[10px] border border-gray-300
        backdrop-blur-[20px] shadow-[0px_5px_10px_0px_rgba(0,0,0,0.10)] transition-all duration-1000
        bg-[rgba(255,255,255,0.5)]"
            style={{
                background: "rgba(255,255,255,0.5)",
                transition: "background 1s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.boxShadow = "0px 10px 20px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.5)";
                e.currentTarget.style.boxShadow = "0px 5px 10px 0px rgba(0,0,0,0.10)";
            }}
        >

            <div className="h-[113px] flex-col justify-start items-center inline-flex overflow-hidden">
                <div
                    className="text-sm font-medium font-['Inter'] leading-tight text-black">
                    Pro Plan
                </div>
                <div className="justify-start items-center inline-flex overflow-hidden">
                    <div className="text-3xl font-semibold font-['Inter'] text-black">
                        $
                    </div>
                    <div className="text-6xl font-semibold font-['Inter'] text-black">
                        25
                    </div>
                </div>
                <div
                    className="text-sm font-medium font-['Inter'] leading-tight text-black/50">
                    per month, billed monthly
                </div>
            </div>

            <div className="relative w-full">
                <input
                    type="email"
                    placeholder="Email address"
                    className="w-full px-3  text-sm py-2   group-hover:bg-white/65 group-hover:border-black/15  group-hover:text-black  group-hover:shadow-black/10 shadow-[0px_4px_10px_rgba(255,255,255,0.2),inset_0px_1px_3px_rgba(255,255,255,0.4)]  bg-white/40  mt-[10px] rounded-[10px] text-black/65 placeholder-black/70 border-2 border-white/[0.07] focus:outline-none focus:border-white/20"
                    style={{
                        whiteSpace: "nowrap",
                        overflowX: "auto",
                        paddingRight: "40px",
                    }} />
                <div className="absolute right-2 top-7 -translate-y-1/2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="12" fill="url(#paint0_linear_47_2853)"/>
                        <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="black"
                              stroke-opacity="0.1"/>
                        <path
                            d="M17.3334 17.3334H6.66671C5.93337 17.3334 5.33337 16.7334 5.33337 16.0001V8.00008C5.33337 7.26675 5.93337 6.66675 6.66671 6.66675H17.3334C18.0667 6.66675 18.6667 7.26675 18.6667 8.00008V16.0001C18.6667 16.7334 18.0667 17.3334 17.3334 17.3334Z"
                            stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path
                            d="M17.3334 6.66675H6.66671C5.93337 6.66675 5.33337 7.26675 5.33337 8.00008L12 12.6667L18.6667 8.00008C18.6667 7.26675 18.0667 6.66675 17.3334 6.66675Z"
                            stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
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

            <div
                className="text-black text-[13px] font-normal font-['Inter'] flex relative top-4 leading-tight ">
                You will be charged $120 for a one year access. When you click on “Subscribe”, your subscription
                will begin and you will be charged $120 immediately. It will renew automatically. You are also
                agreeing to our Terms of Service and our Privacy Policy.
            </div>

            <button
                className="px-5 py-2 rounded-lg border cursor-pointer border-white/50 flex items-center gap-2 top-7 relative mb-7 transition-all duration-300
                     text-black  shadow-[0px_4px_10px_rgba(255,255,255,0.2),inset_0px_1px_3px_rgba(255,255,255,0.4)] group-hover:bg-white   group-hover:shadow-md"
            >
                <span className="text-[14px] font-medium">Subscribe</span>
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.83337 13.3333L11.1667 7.99996L5.83337 2.66663" stroke="black" stroke-width="1.5"
                          stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>

            <div
                className="w-full h-px transition-all duration-300 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,0,1.100)_0%,rgba(0,0,0,0.00)_100%)] my-4"></div>

            <div className="text-black text-sm  font-medium font-['Inter'] leading-tight ">
                OR, PAY WITH PAYPAL
            </div>

            <button
                className="px-5 py-2 rounded-lg cursor-pointer border border-white/50 flex items-center gap-2 top-4 relative mb-4 transition-all duration-300
                     text-black shadow-[0px_4px_10px_rgba(255,255,255,0.2),inset_0px_1px_3px_rgba(255,255,255,0.4)] group-hover:bg-white  group-hover:shadow-md"
            >
                <span className="text-[14px] font-medium">Subscribe</span>
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                     className="group-hover:stroke-black">
                    <path d="M5.83337 13.3333L11.1667 7.99996L5.83337 2.66663" stroke="black" stroke-width="1.5"
                          stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>

            <div
                className="text-black text-[13px] font-normal top-4 flex relative font-['Inter'] leading-tight ">
                This purchase will not auto-renew. You will be taken to PayPal to complete the payment.
            </div>
        </div>
    );
}
