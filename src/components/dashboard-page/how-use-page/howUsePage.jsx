export function HowUsePage() {
    return (
        <div className="w-full h-full flex items-center justify-center ">
            <video
                className="w-full h-full object-cover rounded-lg shadow-lg"
                controls
            >
                <source  src="/05.mp4" type="video/mp4" />
            </video>
        </div>
    );
}
