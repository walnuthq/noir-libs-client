import Link from 'next/link';
import { GitHubIcon } from '@/components/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExitIcon } from '@radix-ui/react-icons';
import { useUser } from '@/lib/user-context-provider';

export function UserProfile() {
    const { profile, signOut } = useUser();
    return (
        <>
            { profile === undefined ?
                <Link href={ `/api/v1/auth/github` }
                      className='md:flex hidden  gap-2 items-center hover:text-blue-300 transition-all delay-75 cursor-pointer'>
                    <span>Sign up with Github</span>
                    <GitHubIcon className='w-4 h-4'/>
                </Link> :
                <Link href="/dashboard">
                    <div className="flex flex-row items-center gap-2 cursor-pointer">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={ profile.avatarUrl }/>
                            <AvatarFallback>{ profile.name.charAt(0) ?? 'U' }</AvatarFallback>
                        </Avatar>
                        { profile.name }
                        <Button
                            className="bg-blue-900 text-white hover:bg-blue-800  rounded-full w-8 h-8 flex items-center justify-center"
                            onClick={ () => signOut() }>
                            <ExitIcon className="w-4 h-4"/>
                        </Button>
                    </div>
                </Link>
            }
        </>
    );
}