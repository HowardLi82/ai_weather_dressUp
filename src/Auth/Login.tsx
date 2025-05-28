import { EmailAuthProvider, getAuth } from "firebase/auth";
import { useEffect, useRef } from "react";
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { GoogleAuthProvider } from "firebase/auth/cordova";
import { useLocation } from "react-router-dom";

const auth = getAuth()
const { AuthUI } = firebaseui.auth;


export const Login = () => {

    const uiContainerRef = useRef<HTMLDivElement>(undefined!);
    const { state } = useLocation();

    useEffect(() => {
        const ui = AuthUI.getInstance() || new AuthUI(auth);
        ui.start(uiContainerRef.current, {
            signInOptions: [
                {
                    provider: GoogleAuthProvider.PROVIDER_ID,
                    customParameters: {
                        // Forces account selection even when one account
                        // is available.
                        prompt: 'select_account'
                    },
                },

                {
                    provider: EmailAuthProvider.PROVIDER_ID,
                    signInMethod: EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
                },
            ],
            signInFlow: 'popup',
            signInSuccessUrl: state.returnTo,
        });
    },[]);

    return (
        <>
            <div className="section">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-3">
                            <div ref={uiContainerRef}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};