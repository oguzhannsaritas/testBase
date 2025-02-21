import { useNavigate } from "react-router-dom";

export function NavBar() {
    const navigate = useNavigate();

    return (
        <nav className="flex fixed w-[780px] min-w-[640px] max-w-[780px] p-1.5 justify-between items-center top-10 left-1/2 -translate-x-1/2 z-50">
            <div className="font-bold text-lg ml-[-30px]">
                <span className="text-black">TEST</span>
                <span className="text-black font-extrabold">base</span>
            </div>
            <div className="flex space-x-6 text-black">
                <button onClick={() => navigate("/components")} className="px-4 py-1 rounded-full transition-all hover:bg-gray-300">Components</button>
                <button onClick={() => navigate("/pricing")} className="px-4 py-1 rounded-full transition-all hover:bg-gray-300">Pricing</button>
                <button onClick={() => navigate("/changelog")} className="px-4 py-1 rounded-full transition-all hover:bg-gray-300">Changelog</button>
            </div>
            <div className="flex space-x-4">
                <button onClick={() => navigate("/signup")} className="px-4 py-1 rounded-full transition-all hover:bg-gray-300">Signup</button>
                <button onClick={() => navigate("/login")} className="px-4 py-1 rounded-full transition-all hover:bg-gray-300">Log in</button>
                <button onClick={() => navigate("/buyNow")} className="px-4 py-1 rounded-full transition-all hover:bg-gray-300">Buy Now</button>
            </div>
        </nav>
    );
}
