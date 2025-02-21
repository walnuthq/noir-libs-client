import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { TrashIcon } from '@radix-ui/react-icons';
import { ApiKeyDto } from '@/app/dashboard/page';
import { Card } from '@/components/ui/card';
import { CheckIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { PackageDto } from '@/types/PackageDto';
import { CreateApikeyDialogButton } from '@/app/dashboard/components/CreateApikeyDialog';
import Link from 'next/link';

interface ApiKeyListProps {
    isNotLoggedCallback: () => void;
}

export function UserPackagesList({ apiKeyListProps }: { apiKeyListProps: ApiKeyListProps }) {
    const [userPackages, setUserPackages] = useState<PackageDto[]>([]);

    const fetchUserPackages = async () => {
        try {
            const response = await fetch(`/api/v1/packages/user`);
            if (response.status === 200) {
                const data: PackageDto[] = await response.json();
                setUserPackages(data);
            }
            if (response.status === 401) {
                apiKeyListProps.isNotLoggedCallback();
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUserPackages();
    }, []);


    return (
        <div className="flex w-full  flex-col">
            <div className="flex flex-row justify-between mt-20">
                <h1 className="text-2xl font-bold text-gray-900 mb-2 ">Your packages</h1>
            </div>
            { userPackages.length === 0 ?
                <div className="mt-2">
                    You don't have any packages yet.
                </div> :
                <div>
                    <ul className="list-none w-full">
                        { userPackages.map((userPackage) => (
                            <Card
                                key={ userPackage.name }
                                className="flex flex-col justify-between gap-5 transition-all delay-0 p-4 mt-4"
                            >
                                <div>
                                    <div className="text-xl font-bold">
                                        Package <span className='pl-1 text-gray-600'>{ userPackage.name ?? '' }</span>
                                    </div>
                                </div>
                                Versions:
                                { userPackage.versions.map((version) => (
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <Link href={ `/packages/${ userPackage.name }/${ version.version }` } className="hover:underline">
                                                • { version.version }
                                            </Link>
                                            { version.isYanked && <span className="text-sm font-medium ml-1 px-1 py-1 bg-red-200 text-red-800 rounded-md">YANKED</span> }
                                        </div>
                                    </div>
                                ))
                                }
                            </Card>
                        )) }
                    </ul>
                </div>
            }
        </div>
    );
}
