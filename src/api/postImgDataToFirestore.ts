import { db } from "../firebase"
import { collection, addDoc } from "firebase/firestore";

interface Props {
    id: string;
    url: string;
    created: number;
    weather_icon: string;
    weather_description: string;
};

export const postImgDataToFirestore = async (props: Props) => {
    
    try {
        await addDoc(collection(db, "dressCode"), {
            id: props.id,
            url: props.url,
            created: props.created,
            weather_icon: props.weather_icon,
            weather_description: props.weather_icon,
        });

    } catch (error) {
        console.error("API 請求失敗:", Error);
        throw error;
    };
}
