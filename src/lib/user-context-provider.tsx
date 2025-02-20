"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

type UserProfile = {
    name: string;
    avatarUrl: string;
};

type UserContextType = {
    profile: UserProfile | undefined;
    refreshProfile: () => Promise<void>;
    signOut: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [profile, setProfile] = useState<UserProfile | undefined>(undefined);
    const router = useRouter();

    const getProfile = async () => {
        const response = await fetch(`/api/v1/auth/user/profile`, { credentials: 'include' });
        if (response.ok) {
            const data: UserProfile = await response.json();
            setProfile(data);
        } else {
            console.log('Failed to fetch profile data', response.status);
        }
    };

    const signOut = async () => {
        try {
            await fetch(`/api/v1/auth/logout`);
            router.push('/');
            setProfile(undefined);
        } catch (err) {
            console.error('Failed to sign out', err);
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <UserContext.Provider value={ { profile, refreshProfile: getProfile, signOut } }>
            { children }
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within UserProvider");
    return context;
};
