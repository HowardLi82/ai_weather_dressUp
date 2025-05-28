import moment from "moment";
import { WeatherDescription } from "../models/WeatherDescription";
import "./DressUpCard.scss";
import { FC } from "react";

interface Props {
    created: number;
    url: string;
    weather_description: string;
    weather_icon: string;
}

export const DressUpCard: FC<Props> = (props: Props) => {

    const realTime = props.created * 1000;
    return (
        <>
            <div className="is-4-widescreen is-6-desktop column is-6-tablet is-12-mobile">
              <div className="card-image">
                <figure className="image">
                  <img
                    src={props.url}
                    alt="Placeholder image"
                  />
                </figure>
                <div className="card-footer-item">
                  <div className="left">
                    <img src={`https://openweathermap.org/img/wn/${props.weather_icon}@2x.png`} alt="" />
                    <p className="weather-des">{WeatherDescription[props.weather_description]}</p>
                  </div>
                  <p className="time">{moment(realTime).format("YYYY/MM/DD HH:mm:ss")}</p>
                </div>
              </div>
            </div>
        </>
    );
};