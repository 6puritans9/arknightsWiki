"use client";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import UserAccount from "./UserAccount";
import { useAuthStore } from "@/stores/authStore";

type AuthButtonProps = {
    locale: string;
};

const AuthButton = ({ locale }: AuthButtonProps) => {
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
            <UserAccount locale={locale} user={user} />
            <LogoutButton locale={locale} onLogout={handleLogout} />
        </div>
    ) : (
        <LoginButton onClick={handleLogin} />
    );
};

export default AuthButton;
