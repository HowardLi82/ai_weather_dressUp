import { useAuth } from './AuthProvider';

export const Profile = () => {

    const { user, signOut} = useAuth();

    return (
        <div>
            <div>{user?.displayName}</div>
            <div>{user?.email}</div>
            <button onClick={signOut}>Log Out</button>
        </div>
    );
};