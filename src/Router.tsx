import { FC } from "react";
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import { NavFotLayout } from "./components/NavFotLayout";
import { WeatherContainer } from "./components/WeatherContainer";
import { WeatherAndDressUp } from "./components/WeatherAndDressUp";
import { DressUpGallery } from "./components/DressUpGallery";
import { Login } from "./Auth/Login";
import { Profile } from "./Auth/Profile";

export const Router: FC = () => {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <NavFotLayout/>,
            children: [
                {
                    path: "profile",
                    element: <Profile />,
                },
                {
                    path: "login",
                    element: <Login />,
                },
                {
                    path: 'weathercon',
                    element: <WeatherContainer/>,
                    children: [
                        {
                            index: true,
                            element: <WeatherAndDressUp/>
                        },
                        {
                            path: "dressUpGA",
                            element: <DressUpGallery/>
                        }
                    ],
                },
            ],
        },
    ]);

    return (
        <RouterProvider router={router}/>
    );

    // return (
    //     <BrowserRouter>
    //         <Routes>
    //             <Route path="/" element={<NavFotLayout/>}>
    //                 <Route path="weathercon" element={<WeatherContainer />}>
    //                     <Route index element={<WeatherAndDressUp />}/>
    //                     <Route path="dressUpGA" element={<DressUpGallery/>}/>
    //                 </Route>
    //             </Route>
    //         </Routes>    
    //     </BrowserRouter>
    // );
};