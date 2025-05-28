import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Navbar.scss";
import { faCameraRetro, faCircleUser, faFaceLaughWink, faPersonDressBurst, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FC, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";

export const Navbar: FC = () => {

    const [menuVisible, setMenuVisible] = useState<boolean>(false);
    const { isAuthenticated, user, signOut } = useAuth();
     const { pathname } = useLocation();

    const loginButton = (
        <Link 
        className="navbar-item" 
        to="/login"
        state={{ returnTo: pathname }}
        >
            <FontAwesomeIcon icon={faCircleUser} size="2x"/>Log In
        </Link>
    );

    const profile = (
        <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
                {user?.photoURL 
                ? (
                    <figure className="image is-32x32">
                        <img src={user.photoURL} className="is-rounded"/> 
                    </figure>
                )
                : <FontAwesomeIcon icon={faFaceLaughWink} size="2x"/>}
            </a>

            <div className="navbar-dropdown is-right">
                <span className="navbar-item has-text-weight-bold">
                    {user?.displayName}
                </span>
                <span className="navbar-item is-selected">
                    {user?.email}
                </span>

                <hr className="navbar-divider"/>
                <a className="navbar-item" onClick={signOut}>
                    <FontAwesomeIcon icon={faRightFromBracket} /> Log Out
                </a>
            </div>
        </div>

    );

    return (
        <>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <NavLink 
                    className="navbar-item"
                    to="weathercon"
                    >
                        <FontAwesomeIcon icon={faPersonDressBurst} />AI WEATHER OUTFIT
                    </NavLink>

                    <a 
                        role="button" 
                        className={`navbar-burger ${menuVisible ? "is-active" : "" }`}
                        aria-label="menu" 
                        aria-expanded="false" 
                        data-target="navbarBasicExample"
                        onClick={() => setMenuVisible(!menuVisible)}
                        >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className={`navbar-menu ${menuVisible ? "is-active" : ""}`}>
                    <div className="navbar-start">
                        <NavLink 
                            className={({ isActive }) => `navbar-item ${isActive ? "has-text" : "" }`}
                            to="weathercon/dressUpGA"
                        >
                            <FontAwesomeIcon icon={faCameraRetro} />/ 穿搭紀錄
                        </NavLink>

                    </div>

                    <div className="navbar-end">
                        {isAuthenticated ? profile : loginButton}
                    </div>
                </div>
            </nav>
        </>
    );
};
