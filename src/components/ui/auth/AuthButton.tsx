"use client";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import UserAccount from "./UserAccount";
import { useAuthStore } from "@/stores/authStore";

const AuthButton = () => {
    const user = useAuthStore((state) => state.user);
    const loading = useAuthStore((state) => state.loading);
    const storeLogin = useAuthStore((state) => state.login);

    const handleLogin = async () => {
        await storeLogin();
    };
    const handleLogout = () => {
        useAuthStore.getState().logout();
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return user ? (
        <div>
            <UserAccount user={user} />
            <LogoutButton onLogout={handleLogout} />
        </div>
    ) : (
        <LoginButton onClick={handleLogin} />
    );
};

export default AuthButton;
