import { CheckIcon } from "../../ıcons/checkIcon.jsx";
import {FailCheckIcon} from "../../ıcons/failCheckIcon.jsx";

export function TestSteps() {
    return (
        <div
            className="rounded-[12px] absolute top-[112px] w-full max-w-lg md:max-w-sm bg-white/70 border border-white/90 p-6 text-white flex flex-col"
            style={{ maxHeight: "500px", right: 'calc(50% - 843px)' }}
        >
            <input
                placeholder="Lütfen Test İsmini Giriniz"
                className="flex-shrink-0 flex relative rounded-md h-6 px-3 w-60 -top-3 placeholder-black mx-auto text-black text-[13px] bg-white/50 hover:bg-white/65 active:bg-white/75 border border-black/10 shadow-md transition-colors text-center focus:outline-none"
            />

            <div className="-top-1 mb-[6px] flex relative w-[290px] h-[2px] flex-shrink-0 mx-auto rounded-[10px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,0,0,0.50)_0%,rgba(255,255,255,0.00)_100%)]"/>

            {/* Burada kaydırma çubuğu (scroll) olan bir container oluşturduk */}
            <div className="custom-scrollbar overflow-y-auto pr-2" style={{ maxHeight: "450px" }}>
                {[...Array(10)].map((_, index) => (
                    <div key={index} className="grow shrink basis-0 mt-3 text-black text-[15px] font-normal font-['Inter'] leading-tight text-start flex">
                        <span className="mr-auto">#ID'li buton tıklanıldı</span>
                        <div className="relative ml-auto">
                            <CheckIcon fill="none" />
                        </div>
                    </div>
                ))}

                <div>
                    <div
                         className="grow shrink basis-0 mt-3 text-black text-[15px] font-normal font-['Inter'] leading-tight text-start flex">
                        <span className="mr-auto">#ID'li buton tıklanıldı</span>
                        <div className="relative ml-auto">
                            <FailCheckIcon fill="none"/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
