import { FC } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export const NavFotLayout: FC = () => {
    return (
        <>
            <Navbar />
                <Outlet/>
            <Footer/>
        </>
    );
};