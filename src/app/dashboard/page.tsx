"use client"
import { useState } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { UserApiKeyList } from '@/app/dashboard/components/UserApiKeyList';
import { UserPackagesList } from '@/app/dashboard/components/UserPackagesList';

export const runtime = "edge";

export interface ApiKeyDto {
    id: string;
    label?: string;
    scopes: string[];
    createdAt: string;
    expiresAt: string;
}

export default function Page() {
    const [isLogged, setIsLogged] = useState(true);

    return (
        <div style={ { height: '100vh', overflowY: 'auto' } } className="bg-gray-100">
            <Header/>
            <div className="flex justify-between mx-auto px-4 max-w-5xl items-center font-bold">
                { isLogged ? (
                    <div className="flex w-full flex-col">
                        <UserApiKeyList apiKeyListProps={ { isNotLoggedCallback: () => setIsLogged(false) } }/>
                        <UserPackagesList apiKeyListProps={ { isNotLoggedCallback: () => setIsLogged(false) } }/>
                    </div>
                ) : (
                    <div className="flex w-full mt-20 flex-col">
                        <div className="flex flex-row justify-between">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">You are not logged in</h1>
                        </div>
                    </div>
                ) }
            </div>
            <Footer/>
        </div>
    );
}