import "./Footer.scss";
import { FC } from "react";

export const Footer: FC = () => {
    return (
        <>
            <footer className="footer">
                <div className="content has-text-centered">
                    <p>
                        這是一個根據臺灣地區與天氣來快速變換穿搭風格的一個網站，沒有想法就讓AI幫你搭配看看!
                    </p>
                </div>
            </footer>
        </>
    );
};