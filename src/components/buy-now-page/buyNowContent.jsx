export function BuyNowContent() {
    return (
        <div className="text-start flex flex-col mt-[150px] w-full max-w-[388px]"> {/* İçeriği en sola hizala */}
            <h1 className="text-black text-[40px] font-semibold">
                Get Started with Seamless Test Automation
            </h1>
            <p className="mt-4 text-md text-gray-700 leading-6">
                Join our platform and unlock the power of effortless test automation. Create, manage, and execute tests
                without any coding skills required. With our intuitive interface, setting up and running tests is easier
                than ever!
            </p>

            <div className="mt-6 space-y-4 text-md text-gray-700 leading-6">
                <FeatureItem text="Instant Setup: Sign up in seconds and start automating immediately." />
                <FeatureItem text="Run Tests Anywhere: Execute your tests globally with real-time insights." />
                <FeatureItem text="Detailed Test History: Track your progress and optimize workflows effortlessly." />
            </div>

            <p className="mt-6 text-md text-gray-700 leading-6">
                Sign up today and experience the future of smart, flexible, and efficient test automation!
            </p>
        </div>
    );
}


function FeatureItem({ text }) {
    return (
        <div className="flex items-center gap-2">
            <FeatureIcon />
            <span>{text}</span>
        </div>
    );
}

// 🎨 SVG ikon bileşeni
function FeatureIcon() {
    return (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_2_2175)">
                <path d="M15 1L18 8H25L20 14L22 21L15 17L8 21L10 14L5 8H12L15 1Z" fill="#D9D9D9" />
                <path d="M15 1L18 8H25L20 14L22 21L15 17L8 21L10 14L5 8H12L15 1Z" stroke="black" strokeWidth="1.5"
                      strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <filter id="filter0_d_2_2175" x="0.25" y="0.25" width="29.5" height="29.5"
                        filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix"
                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                   result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix"
                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_2175" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_2175" result="shape" />
                </filter>
            </defs>
        </svg>
    );
}
