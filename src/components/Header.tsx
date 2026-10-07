import Image from "next/image";
import NavLinks from "./NavLinks";

const Header = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <header className=" container relative max-w-6xl mx-auto   py-4">
            {/* Logo + Title */}
            <div className="flex items-center justify-center gap-2">
                <Image
                    className="h-10 w-10"
                    height={50}
                    width={50}
                    src="/logo.webp"
                    alt="logo"
                />

                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold text-red-700">
                        Bangla News 24
                    </h2>
                    <p className="text-xs text-neutral-500">{date}</p>
                </div>
            </div>

            {/* Sign In / Sign Up */}
            <div className="absolute right-0 top-4 flex items-center gap-2 text-sm">
                <button className="btn">সাইন ইন</button>
                <button className="btn bg-red-600 text-white">
                    সাইন আপ
                </button>
            </div>

            <NavLinks></NavLinks>
        </header>
    );
};

export default Header;