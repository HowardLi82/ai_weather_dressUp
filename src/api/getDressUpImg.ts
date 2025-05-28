import OpenAI from "openai";
import { config } from "../config";

const apiKey = config.openAI.apikey;

const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
});

export interface Props {
    city: string;
    main_temp: number;
    witchStyle: string;
    genderSelect: string;
};

export const getDressUpImg = async (props: Props) => {

    const weatherprompt = `
    Location is ${props.city},
    Temperature is ${props.main_temp},
    Generate a ${props.witchStyle} realistic ${props.genderSelect} outfit suitable refer to the location and temperature. Use clothing styles inspired by 
    Uniqlo's StyleHint. Set the background with landmarks from the city.`;

    const data = await openai.images.generate({
        model: "dall-e-3",
        prompt: weatherprompt,
        size: "1024x1024", 
        n: 1,
    });

    const result = {
        created: data.created,
        ImgData: data.data,
    };

    return result;
};

