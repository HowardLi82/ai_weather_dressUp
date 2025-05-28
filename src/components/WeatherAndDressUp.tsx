import "./WeatherAndDressUp.scss"
import { ChangeEventHandler, FC, MouseEventHandler, useEffect, useRef, useState } from "react";
import { WeatherInfoCard } from "./WeatherInfoCard";
import { WeatherCardTitle } from "../models/WeatherCardTitle";
import { TwCountry } from "../models/TwCountry";
import { getWeatherInfo, weatherInfoProps } from "../api/api";
import { DressUpStyle } from "../models/DressUpStyle";
import { Gender } from "../models/Gender";
import { getDressUpImg } from "../api/getDressUpImg";
import { WeatherDescription } from "../models/WeatherDescription";
import { WeatherAndDressUP_Placeholder } from "./WeatherAndDressUP_Placeholder";
import { postImgDataToFirestore } from "../api/postImgDataToFirestore";


const cardTilte = Object.keys(WeatherCardTitle).filter(p => isNaN(p as any));
// const selectGender = Object.values(Gender).filter(p => isNaN(p as any))

export interface ForStyleInfo {
    city: string;
    main_temp: number;
    witchStyle: string;
    genderSelect: string;
    created: number;
};

export interface ToFirestore {
    id: string;
    url: string;
    created: number;
    weather_icon: string;
    weather_description: string;
};

export const WeatherAndDressUp: FC = () => {

    const [place, setplace] = useState<string>(TwCountry.南投縣);
    const [weatherData, setWeatherData] = useState<weatherInfoProps | null>(null);
    const [style, setStyle] = useState<string>(DressUpStyle.台系風格);
    const [gender, setGender] = useState<string>(Gender.女性);

    // 先想出來的辦法，因為要用useEffect，所以這個改變的時候，便會呼叫chat gpt那個api去取回資料(為甚麼不用其他的useState? 因為這個我看得懂)
    const [dressTrigger, setDressTrigger] = useState<number>(0);
    const [dressCode, setDressCode] = useState<Record<string, any>>({});
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    // 另一個板機，在拿到gpt畫的圖後才會啟動postImgToImgur這個function
    const initPostToImgur: number = 0;
    const [postToImgur, setpostToImgur] = useState<number>(initPostToImgur);
    // 第三個板機QQ，不太確定這樣寫行不行...
    const initPostToFirestore = 0;
    const [postFirestoreTrigger, setPostFirestoreTrigger] = useState<number>(initPostToFirestore);
    const [postToFirestore, setPostToFirestore] = useState<Record<string, any>>({});
    const [catImg, setCatImg] = useState<boolean>(true);

    const handlePlaceChange: ChangeEventHandler<HTMLSelectElement> = e => (setplace(e.target.value as TwCountry));
    const handleStyleChange: ChangeEventHandler<HTMLSelectElement> = e => (setStyle(e.target.value as DressUpStyle));
    const handleGenderChange: ChangeEventHandler<HTMLSelectElement> = e =>(setGender(e.target.value));
    const handleDressChange: MouseEventHandler<HTMLButtonElement> = () => (setDressTrigger(dressTrigger + 1));

    // 獲得天氣資料
    useEffect(() => {
        const fetchData = async () => {
            const data = await getWeatherInfo(place);
            setWeatherData(data);
        };
        fetchData()
    }, [place]);
    

    // 送資料去呼叫chat gpt API，並拿到資料
    const dressUpFisrtRenderPass = useRef(true);

    useEffect(() => {
        if (dressUpFisrtRenderPass.current) {
            dressUpFisrtRenderPass.current = false;
            return;
        } else {
            if (weatherData === null) {
                console.warn("dressCode.ImgData 尚未準備好，跳過執行");
            } else {
                // 還原成等待的畫面(WeatherAndDressUP_Placeholder)
                setIsWaiting(false);
                setCatImg(false);
                const fetchImg = async () => {
        
                    const sendtoChat: ForStyleInfo = {
                        city: weatherData!.city,
                        main_temp: weatherData!.main_temp,
                        witchStyle: style,
                        genderSelect: gender,
                        created: Date.now(),
                    };
        
                    try {
                        const data = await getDressUpImg(sendtoChat);
                        setDressCode(() => ({...dressCode, ...data}));
                        setIsWaiting(true);

                        setpostToImgur(postToImgur + 1);
                    } catch (error) {
                    }
                };
                fetchImg();
            }
        }
    },[dressTrigger]);
    // _____________________________________________

        const firstToBackend= useRef(true);

        useEffect(() => {
        if (firstToBackend.current) {
                firstToBackend.current=false;
                return;
            } else {
                
            if( dressCode.ImgData === undefined) {
                console.warn("dressCode.ImgData 尚未準備好，跳過執行");
            } else {
                const sendMessage = async () => {

                    const imgurl = dressCode.ImgData[0].url;

                    const response = await fetch(
                            
                            "https://ai-dressup-backend-2.vercel.app/api", 
                            {
                                method: "POST",
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ url: imgurl }),
                            });
                    const data = await response.json();

                    setPostToFirestore(() => ({...postToFirestore, ...data}));
                    setPostFirestoreTrigger(() => postFirestoreTrigger + 1);
                };
                sendMessage();
            };

        };
        },[postToImgur])

// _______________________________________________________________

    // 可能要用useEffect，當dressCode改變的時候，便觸發post圖片到imgur
    // isFirstRender 這個可以避免網頁一打開就會被render
    // const imgFirstRenderPass = useRef(true);

    // // // 發送資料存到firestore
    const firestoreFirstPass = useRef(true);

    useEffect(() => {
        if (firestoreFirstPass.current) {
            firestoreFirstPass.current = false;
            return;
        } else {
            if (postToFirestore.body === undefined) {
                console.warn("postToFirestore 尚未準備好，跳過執行");
            } else {

                const isoString = postToFirestore.body.created_at;
                const createdChange = (Math.floor(new Date(isoString).getTime())) / 1000;

                const postToFirestoreData: ToFirestore = {
                    id: postToFirestore.body.asset_id,
                    url: postToFirestore.body.url,
                    created: createdChange,
                    weather_icon: weatherData? weatherData.weather_icon : "",
                    weather_description: WeatherDescription[weatherData!.weather_icon],
                };

                try {
                    postImgDataToFirestore(postToFirestoreData);
                } catch (error) {
                    console.error("發送到firebase請求失敗:", error);
                } 
            };
        };
    },[postFirestoreTrigger]);

    return (
        <>
            <div className="test container">
                <div className="placeAndDressUp">
                    <div className="columns">
                        <div className="column">
                            <div className="city">
                                <div className="location">
                                    <div className="weatherDes">
                                        <img src={`https://openweathermap.org/img/wn/${weatherData?.weather_icon}@2x.png`} alt="" />
                                        <p>{WeatherDescription[weatherData !== null ? weatherData.weather_icon : ""]}</p>
                                    </div>

                                    <div className="select">
                                        <select value={place} onChange={handlePlaceChange} style={{background:"pink"}}>
                                            {Object.entries(TwCountry).map(([k, v]) => 
                                                <option value={v} key={k}>{k}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>

                                <div className="fixed-grid">
                                    <div className="grid">
                                        <WeatherInfoCard id={null} title={cardTilte[0]} weatherInfo={weatherData !== null ? `${weatherData.main_temp}度` : null}/>
                                        <WeatherInfoCard id={null} title={cardTilte[1]} weatherInfo={weatherData !== null ? `${weatherData.main_feels_like}度` : null}/>
                                        <WeatherInfoCard id={null} title={cardTilte[2]} weatherInfo={weatherData !== null ? weatherData.rain : null}/>
                                        <WeatherInfoCard id={null} title={cardTilte[3]} weatherInfo={weatherData !== null ? `${weatherData.visibility} /m` : null}/>
                                        <WeatherInfoCard id={null} title={cardTilte[4]} weatherInfo={weatherData !== null ? `${weatherData.wind_speed} m/s` : null}/>
                                        <WeatherInfoCard 
                                        id={"sunUpDown"} 
                                        title={cardTilte[5]} 
                                        weatherInfo={
                                            weatherData !== null 
                                            ? `日出: ${weatherData.sys_sunrise}                     日落: ${weatherData.sys_sunset}`
                                            : null}
                                        />
                                    </div>
                                </div> 
                            </div>

                        </div>

                        <div className="column">
                            <div className="dressup">
                                <div className="btnPlace">
                                    <div className="select">
                                        <select value={style} onChange={handleStyleChange}>
                                            {Object.entries(DressUpStyle).map(([k, v]) => 
                                                <option value={v} key={k}>{k}</option>
                                            )}
                                        </select>
                                    </div>

                                    <div className="select">
                                        <select value={gender} onChange={handleGenderChange} style={{marginLeft: "1rem"}}>
                                            {Object.entries(Gender).map(([k, v]) => 
                                            <option value={v} key={k}>{k}</option>
                                            )}
                                        </select>
                                    </div>
                                    
                                    <button className="button is-pulled-right" onClick={handleDressChange}>看看穿搭 GO!</button>
                                </div>
                                {
                                    isWaiting 
                                    ?   <div className="imageCard">
                                            <img src={`${dressCode.ImgData[0].url}`} alt="" />
                                        </div> 
                                    : <WeatherAndDressUP_Placeholder firstImg={catImg} />
                                }

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};