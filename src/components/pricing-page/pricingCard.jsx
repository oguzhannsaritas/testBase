export function PricingCard() {
    return (
        <div className="relative w-[340px] h-[399px]  top-64 flex flex-col items-center">
            {/* Content with Background */}
            <div className="relative flex flex-col items-center p-6 w-[340px] h-[399px] rounded-[20px] shadow-lg"
                 style={{
                     background: 'linear-gradient(135deg, #EDE6F6, #FCEAE8, #D7E6FB)',
                     boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)'
                 }}>
                <div className="text-black text-sm font-medium mb-5 leading-tight">All-Access</div>
                <div className="flex flex-col items-center gap-1">
                    <div className="text-black text-4xl font-semibold font-['Inter']">$99</div>
                    <div className="text-black/50 text-[14px] font-normal">One-time</div>
                </div>

                <div
                    className="w-full h-px bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,0,0,1.100)_0%,rgba(0,0,0,0.00)_100%)] my-4"></div>

                {/* Features */}
                <div className="flex flex-col gap-3 w-full">
                    {[
                        "All 300+ components",
                        "2,000+ Figma variants",
                        "2,116 unique icons"
                    ].map((text, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div data-svg-wrapper className="relative">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8 8C10.181 5.819 11.2715 4.7285 12.4479 4.14556C14.6861 3.03643 17.3139 3.03643 19.5521 4.14556C20.7285 4.7285 21.819 5.819 24 8V8C26.181 10.181 27.2715 11.2715 27.8544 12.4479C28.9636 14.6861 28.9636 17.3139 27.8544 19.5521C27.2715 20.7285 26.181 21.819 24 24V24C21.819 26.181 20.7285 27.2715 19.5521 27.8544C17.3139 28.9636 14.6861 28.9636 12.4479 27.8544C11.2715 27.2715 10.181 26.181 8 24V24C5.819 21.819 4.7285 20.7285 4.14556 19.5521C3.03643 17.3139 3.03643 14.6861 4.14556 12.4479C4.7285 11.2715 5.819 10.181 8 8V8Z"
                                        fill="url(#paint0_linear_176_2717)"/>
                                    <path
                                        d="M8.35355 23.6464C6.14401 21.4369 5.13089 20.4144 4.59357 19.3301C3.55376 17.2318 3.55376 14.7682 4.59357 12.6699C5.13089 11.5856 6.14401 10.5631 8.35355 8.35355C10.5631 6.14401 11.5856 5.13089 12.6699 4.59357C14.7682 3.55376 17.2318 3.55376 19.3301 4.59357C20.4144 5.13089 21.4369 6.14401 23.6464 8.35355C25.856 10.5631 26.8691 11.5856 27.4064 12.6699C28.4462 14.7682 28.4462 17.2318 27.4064 19.3301C26.8691 20.4144 25.856 21.4369 23.6464 23.6464C21.4369 25.856 20.4144 26.8691 19.3301 27.4064C17.2318 28.4462 14.7682 28.4462 12.6699 27.4064C11.5856 26.8691 10.5631 25.856 8.35355 23.6464Z"
                                        stroke="black" stroke-opacity="0.1"/>
                                    <path d="M9.33325 16.4934L13.4199 20.5801" stroke="black" stroke-width="1.5"
                                          stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M13.4199 20.5799L22.6666 11.3333" stroke="black" stroke-width="1.5"
                                          stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <defs>
                                        <linearGradient id="paint0_linear_176_2717" x1="16" y1="0" x2="16" y2="32"
                                                        gradientUnits="userSpaceOnUse">
                                            <stop stop-color="white" stop-opacity="0.02"/>
                                            <stop offset="1" stop-color="white" stop-opacity="0.5"/>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <div className="text-black text-[14px] font-medium">{text}</div>
                        </div>
                    ))}
                </div>

                <div
                    className="w-full h-px bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,0,0,1.100)_0%,rgba(0,0,0,0.00)_100%)] my-4"></div>

                {/* Buy Button */}
                <button
                    className="px-5 py-2 bg-white rounded-lg shadow-md border border-black/10 flex items-center gap-2">
                    <span className="text-black text-[14px] font-medium">Buy now</span>
                    <span className="text-black">💳</span>
                </button>
            </div>
        </div>
    );
}
