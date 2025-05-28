import { db } from "../firebase"
import { collection, getDocs, orderBy, query, QueryDocumentSnapshot } from "firebase/firestore";

interface Props {
    created: number;
    url: string;
    weather_description: string;
    weather_icon: string;
}

export const getDataFromFirestore = async (): Promise<Props[]> => {

    try {
        const q = query(collection(db, "dressCode"), orderBy("created", "desc"));
        const data = await getDocs(q);
        const result: any = [];
        data.forEach((doc: QueryDocumentSnapshot) => {
            result.push(doc.data());
        });

        return result;

    } catch (error) {
        console.error("API 請求失敗:", Error);
        throw error;
    };
}
