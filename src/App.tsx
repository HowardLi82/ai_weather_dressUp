import 'bulma/css/bulma.css';
import { FC } from 'react';
import './firebase';
import { Router } from './Router';
import { AuthProvider } from './Auth/AuthProvider';


export const App: FC = () => {
    return (
        <>
          <AuthProvider>
            <Router/>
          </AuthProvider>
        </>
    );
};
