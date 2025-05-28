export const config = {
    openWeather: {
        apiKey: import.meta.env.VITE_OPENWEATHER_API,
    },
    openAI: {
        apikey: import.meta.env.VITE_OPENAI_API,
    },
    imgurId: {
        id: import.meta.env.VITE_IMGUR_ID,
        accessToken: import.meta.env.VITE_IMGUR_ACCESS_TOKEN,
    },
    firebase: {
        apiKey: import.meta.env.VITE_APIKEY,
        authDomain: import.meta.env.VITE_AUTHDOMAIN,
        projectId: import.meta.env.VITE_PROJECTID,
        storageBucket: import.meta.env.VITE_STORAGEBUCKET,
        messagingSenderId: import.meta.env.VITE_MESSAFINGSENDERID,
        appId: import.meta.env.VITE_APPID,
        measurementId: import.meta.env.VITE_MEASUREMENTID,
      },
};