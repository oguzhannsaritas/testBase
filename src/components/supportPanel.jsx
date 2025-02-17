export function SupportPanel() {
    return (
        <div className="w-[300px] md:w-[350px] relative left-96 ml-[600px] mt-[50px] bg-gradient-to-b from-white/60 to-white/50 shadow-lg backdrop-blur-md rounded-[10px] flex flex-col p-6 gap-6 border border-gray-300">
            <div className="w-full flex flex-col items-center justify-start gap-5 text-center text-xl text-gray-900 font-text-md-medium">
                <div className="self-stretch flex flex-col items-center justify-start gap-2">
                    <div className="self-stretch leading-[30px] font-medium">Support</div>
                    <div className="self-stretch text-base leading-[24px] text-gray-500">Our friendly team is here to help.</div>
                </div>
                <div className="flex flex-row items-start justify-start text-base text-primary-700">
                    <div className="flex flex-row items-center justify-center">
                        <div className="relative leading-[24px] font-medium">supportHakan@gmail.com</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
