export function NavBar() {
    return (
        <nav
            className="flex fixed w-[780px] min-w-[640px] max-w-[780px] p-1.5 justify-between items-center top-10 left-1/2 -translate-x-1/2">
            <div className="font-bold text-lg ml-[-30px]">
                <span className="text-black">TEST</span>
                <span className="text-black font-extrabold">base</span>
            </div>
            <div className="flex space-x-6 text-black">
                <a href="#" className="px-4 py-1 rounded-full  transition-all hover:bg-gray-300">Components</a>
                <a href="#" className="px-4 py-1 rounded-full transition-all hover:bg-gray-300">Pricing</a>
                <a href="#" className="px-4 py-1 rounded-full transition-all hover:bg-gray-300">Changelog</a>
            </div>
            <div className="flex space-x-4">
                <a href="#" className="px-4 py-1 rounded-full transition-all hover:bg-gray-300">Signup</a>
                <button className="px-4 py-1 rounded-full transition-all hover:bg-gray-300">Log in</button>
                <a href="#" className="px-4 py-1 rounded-full transition-all hover:bg-gray-300">Buy now</a>
            </div>
        </nav>

    );
}

