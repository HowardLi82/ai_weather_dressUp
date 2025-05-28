import "./DressUpGallery.scss"
import { FC, useEffect, useState } from "react";
import { DressUpCard } from "./DressUpCard";
import { getDataFromFirestore } from "../api/getDataFromFirestore";
import "../assets/images/wait_suit.webp"

interface Props {
    created: number;
    url: string;
    weather_description: string;
    weather_icon: string;
}

export const DressUpGallery: FC = () => {

    const [dressUpArr, setDressUpArr] = useState<Props[]>([]);

    useEffect(() => {
        const getFirestoreData = async () => {
            try {
                const data = await getDataFromFirestore();
                setDressUpArr([...dressUpArr, ...data]);

            } catch (error) {
                console.error("獲取圖片發生問題",error);
            };

        };
        getFirestoreData();
    },[]);

    return (
        <>
            <div className="dressUpGallery container">
                <div className="columns is-variable is-1-mobile is-2-tablet is-3-desktop">
                    {
                        dressUpArr.map((e) => 
                            <DressUpCard 
                            created={e.created} 
                            url={e.url}
                            weather_description={e.weather_description}
                            weather_icon={e.weather_icon}
                        />
                        )
                    }
                </div>
            </div>
        </>
    );
};