import {NavLink, Outlet} from "react-router";
import clsx from "clsx";
import {ToastContainer} from "react-toastify";

export const Header = () => {
    return (
        <div>
            <div className="flex h-20 items-center justify-between px-8">
                <div className="flex cursor-pointer items-end transition hover:text-orange-500">
                    <div className="size-12">
                        <img src="../../public/logo.png" alt="logo"/>
                    </div>
                    <NavLink to="" className="ml-2 font-atma text-2xl font-medium">
                        Cat Gallery
                    </NavLink>
                </div>
                <NavLink to="favourites" className={({isActive}) => clsx(
                    "font-atma text-xl font-medium transition hover:text-orange-500",
                    {
                        "text-orange-500": isActive
                    }
                )}>
                    Favourites
                </NavLink>
            </div>
            <Outlet/>
            <ToastContainer />
        </div>
    );
};
