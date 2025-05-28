import axios from "axios";
import { config } from "../config";

const apikey = config.imgurId.id;

export const postImgToCloudinary = async (props: string) => {
    const imageURL = props;
    try {
        const formData = new FormData();
        formData.append('file', imageURL);
        formData.append('upload_preset', 'ai_dressUp');

        const postToCloudinary = await fetch (
            `https://api.cloudinary.com/v1_1/dv8hduzvv/image/upload`,
            {
            method: "POST",
            body: formData,
            }).then(r => r.json());

        const backData = postToCloudinary.data;
        console.log(backData);

        return backData;
    } catch (error) {
        console.error("API 請求失敗:", Error);
        throw error;
    };
};

export const postImgToImgur = async (props: string) => {

    const imageURL = props;

    try {
        const response = await axios.post(
            `https://api.imgur.com/3/image`,
            {
            image: imageURL,
            },
            {
            headers: {
                Authorization: `Client-ID ${apikey}`,
            },
            }
        );

        const backData = response.data;

        return backData;

    } catch (error) {
        console.error("API 請求失敗:", Error);
        throw error;
    }
};

