"use client";

import useAuthStore from "@/stores/authStore";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import UserAccount from "./UserAccount";

const AuthButton = () => {
    const user = useAuthStore((state) => state.user);
    const loading = useAuthStore((state) => state.loading);
    const storeLogin = useAuthStore((state) => state.login);
    const storeLogout = useAuthStore((state) => state.logout);

    const handleLogin = async () => {
        await storeLogin();
    };
    const handleLogout = async () => {
        await storeLogout();
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
