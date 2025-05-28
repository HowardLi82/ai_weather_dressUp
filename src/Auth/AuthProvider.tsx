import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";

interface AuthContextProps {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    signOut: () => Promise<void>;
}

const auth = getAuth();

const AuthContext = createContext<AuthContextProps>(undefined!);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            setUser(user);
            setIsLoading(false);
            setIsAuthenticated(user !== null);
        });
    },[]);
    
    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            isLoading,
            signOut: () => signOut(auth),
        }}>

            { children }
        </AuthContext.Provider>
    );

};

export const useAuth = () => useContext(AuthContext);