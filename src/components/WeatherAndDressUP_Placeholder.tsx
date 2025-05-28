import "./WeatherAndDressUP_Placeholder.scss";
import { FC } from "react";
import catCuteImg from "../assets/images/cat.png";

interface Props {
    firstImg: boolean;
};

export const WeatherAndDressUP_Placeholder: FC<Props> = ( {firstImg} ) => {
    // 設定貓的圖片

    return (
        <>
            <div className="imageCard" style={{overflow: "hidden",}}>
                {
                    firstImg 
                    ? <img src={catCuteImg} alt="" />
                    : <div className="loader"></div>
                }
            </div>
        </>
    );
};