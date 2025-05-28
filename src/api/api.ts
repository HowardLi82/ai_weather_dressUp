import axios from 'axios';
import { config } from '../config';
import moment from 'moment';

export interface weatherInfoProps {
    weather_description: string;
    weather_icon: string;
    main_temp: number;
    main_feels_like: number;
    main_humidity: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    rain: string | null;
    sys_sunrise: string;
    sys_sunset: string;
    city: string;
};

// 明天標記city，用TwCountry的key
const apiKey = config.openWeather.apiKey;

const timeFormat = "YYYY.MM.DD HH:mm:ss";

export const getWeatherInfo = async ( props: string ): Promise<weatherInfoProps> => {


    //取得 lat, lon數值 (獲得經緯度資訊)，取得經緯度後放進下方取得天氣的URL內
    const {lat, lon} = (await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${props}&appid=${apiKey}`)).data[0];
    //取得 所有天氣資訊
    const weatherInfo = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    
    // console.log(typeof(weatherInfo))
    // console.log(weatherInfo);
    const weatherObject: weatherInfoProps = {
        weather_description: (weatherInfo.data.weather[0].description),
        weather_icon: weatherInfo.data.weather[0].icon,
        main_temp: Math.floor((weatherInfo.data.main.temp)-273.15),
        main_feels_like: Math.floor((weatherInfo.data.main.feels_like)-273.15),
        main_humidity: weatherInfo.data.main.humidity,
        visibility: weatherInfo.data.visibility,
        wind_speed: weatherInfo.data.wind.speed,
        wind_deg: weatherInfo.data.wind.deg,
        rain: weatherInfo.data.rain 
        ? `${Object.keys(weatherInfo.data.rain)[0]} / ${Object.values(weatherInfo.data.rain)[0]}mm` 
        : "無降雨",
        sys_sunrise: moment((weatherInfo.data.sys.sunrise) * 1000).format(timeFormat),
        sys_sunset: moment((weatherInfo.data.sys.sunset) * 1000).format(timeFormat),
        city: props,
    };
    // console.log(weatherObject);

    return weatherObject;
};