'use client';
import LoginForm from "@/components/LoginForm";
import ProfilePage from "@/components/ProfilePage";
import { useEffect, useState } from "react";


export default function Auth() {
    const [isLogedin, setIsLogedin] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        handleLoginMode();
    }, []);

    const handleLoginMode = () => {
        const saved = localStorage.getItem("authData");
        if (!saved) {
            setUserId(null);
            setIsLogedin(false);
            return;
        }

        try {
            const authData = JSON.parse(saved);
            const parsedId = authData?.id ? Number(authData.id) : null;
            setIsLogedin(true);
            setUserId(parsedId);
        } catch {
            setUserId(null);
            setIsLogedin(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("authData");
        setIsLogedin(false);
        setUserId(null);
    }



    return <div className="Auth">
        {!isLogedin && <LoginForm handleLoginMode={handleLoginMode} />}
        {isLogedin && userId && <ProfilePage id={userId} handleLogout={handleLogout} />}
    </div>
}