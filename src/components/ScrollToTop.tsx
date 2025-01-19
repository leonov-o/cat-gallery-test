import {useEffect, useState} from "react";
import {ArrowUpIcon} from "@radix-ui/react-icons";

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 flex items-center justify-center rounded-full bg-orange-500 p-4 shadow-lg transition hover:bg-orange-600"
                >
                    <ArrowUpIcon className="size-5 text-white"/>
                </button>
            )}
        </div>
    );
};
