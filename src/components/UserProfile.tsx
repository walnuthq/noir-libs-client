import Link from 'next/link';
import { GitHubIcon } from '@/components/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React, { useEffect, useState } from 'react';

export function UserProfile() {
    const [profile, setProfile] = useState<{ name: string, avatarUrl: string } | undefined>(undefined);
    useEffect(() => {
        getProfile();
    }, []);
    const getProfile = async () => {
        const response = await fetch(`/api/v1/auth/user/profile`, { credentials: 'include' });
        if (response.ok) {
            const data: { name: string, avatarUrl: string } = await response.json();
            setProfile(data);
        } else {
            console.log('Failed to fetch profile data', response.status);
        }
    };
    return (
        <>
            { profile === undefined ?
                <Link href={ `/api/v1/auth/github` }
                      className='md:flex hidden  gap-2 items-center hover:text-blue-300 transition-all delay-75 cursor-pointer'>
                    <span>Sign up with Github</span>
                    <GitHubIcon className='w-4 h-4'/>
                </Link> :
                <Link href="/dashboard">
                    <div className="flex flex-row items-center gap-2 cursor-pointer" >
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={ profile.avatarUrl }/>
                            <AvatarFallback>{ profile.name.charAt(0) ?? 'U' }</AvatarFallback>
                        </Avatar>
                        { profile.name }
                    </div>
                </Link>
            }
        </>
    );
}