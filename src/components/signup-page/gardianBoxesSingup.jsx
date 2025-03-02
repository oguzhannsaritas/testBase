export function GradientBoxesSignup() {
    return (
        <div className=" lg:flex flex-col absolute right-3/4 top-28 space-y-6  ">
            <div className=" w-[474px] min-w-[280px] h-[329px] left-[32px] top-[100px] bg-gradient-to-b from-white/60 to-white/50 shadow-lg backdrop-blur-md rounded-[10px] flex flex-col items-center p-6 gap-6 border border-gray-300"></div>
            <div
                className="w-[474px] min-w-[239px] h-[329px] bg-gradient-to-b from-white/60 to-white/50 shadow-lg backdrop-blur-md rounded-[10px] flex flex-col items-center p-[8px] border border-gray-300">
                <img
                    src="/world.png"
                    alt="World Image"
                    className="w-full  h-full object-cover rounded-md"
                />
            </div>
        </div>
    );
}