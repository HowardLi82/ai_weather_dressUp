import "./WeatherInfoCard.scss"
import { FC } from "react";

interface Props {
    title: string;
    weatherInfo: any;
    id: string | null;
}

export const WeatherInfoCard: FC<Props> = ({ title, weatherInfo, id }) => {
    return (
        <>  
            <div id={`${id}`}>
                <div className="card">
                    <header className="card-header">
                        <div className="card-header-title">
                            <h1 className="is-size-4">{title}</h1>
                        </div>
                    </header>
                    <div className="card-content">
                        <div className="mainInfo">
                            {weatherInfo}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};