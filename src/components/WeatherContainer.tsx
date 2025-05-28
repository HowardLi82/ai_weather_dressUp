import "./WeatherContainer.scss"
import { FC } from "react";
import { Outlet } from "react-router-dom";

export const WeatherContainer: FC = () => {
    return (
        <>
            <div className="section">
                <Outlet/>
            </div>
        </>
    );
};