import { useState, useCallback } from 'react';

export default function useAuth() {
    const [userData, setUserData] = useState(null);

    const login = (user) => {
        if (user) {
            setUserData(user);
            localStorage.setItem("userData", JSON.stringify(user));
        }
        return user ? true : false;
    }

    const isAuthenticated = () => {
        let localUserData = localStorage.getItem("userData");
        if (localUserData) setUserData(JSON.parse(localUserData));
        return userData ? true : false;
    }

    const logout = () => {
        setUserData(null);
        localStorage.removeItem("userData");
    }

    return [{ userData }, login, isAuthenticated, logout ];

}