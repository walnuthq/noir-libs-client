import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { TrashIcon } from '@radix-ui/react-icons';
import { ApiKeyDto } from '@/app/dashboard/page';
import { Card } from '@/components/ui/card';
import { CheckIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { CreateApikeyDialogButton } from '@/app/dashboard/components/CreateApikeyDialog';

interface ApiKeyListProps {
    isNotLoggedCallback: () => void;
}

export function UserApiKeyList({ apiKeyListProps }: { apiKeyListProps: ApiKeyListProps }) {
    const [apiKeys, setApiKeys] = useState<{ apiKey?: string, apiKeyDto: ApiKeyDto } []>([]);
    const [copied, setCopied] = useState(false);
    const setApiKeysAfterCreation = (apiKey: string, apiKeyDto: ApiKeyDto) => {
        apiKeys.push({ apiKey, apiKeyDto: apiKeyDto });
        apiKeys.sort((a, b) => new Date(b.apiKeyDto.createdAt).getTime() - new Date(a.apiKeyDto.createdAt).getTime());
        setApiKeys([...apiKeys]);
    }

    const copyCommand = (apiKey: string) => {
        navigator.clipboard.writeText(apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const revokeApiKey = async (id: string) => {
        try {
            const response = await fetch(`/api/v1/auth/user/apikey/${ id }`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchApiKeys();
            }
        } catch (err) {
            console.error('Failed to revoke API key', err);
        }
    }

    const fetchApiKeys = async () => {
        try {
            const response = await fetch(`/api/v1/auth/user/apikey`);
            if (response.status === 200) {
                const data: ApiKeyDto[] = await response.json();
                setApiKeys(data.map(_ => ({ apiKeyDto: _ })));
            }
            if (response.status === 401) {
                apiKeyListProps.isNotLoggedCallback();
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchApiKeys();
    }, []);

    return (
        <div className="flex w-full flex-col mb-10">
            <div className="flex flex-row justify-between mt-20">
                <h1 className="text-2xl font-bold text-gray-900 mb-2 ">Your API keys</h1>
                <CreateApikeyDialogButton onSuccess={ setApiKeysAfterCreation }/>
            </div>
            { apiKeys.length === 0 ?
                <div className="mt-2">
                    You don't have any API keys yet.
                </div> :
                <div>
                    <ul className="list-none w-full">
                        { apiKeys.map((apiKeyObj) => (
                            <Card
                                key={ apiKeyObj.apiKey }
                                className="flex justify-between gap-5 transition-all delay-0 p-4 mt-4"
                            >
                                <div>
                                    <div className="text-xl pb-4">
                                        API Key <span
                                        className='pl-1 text-gray-600'>{ apiKeyObj.apiKeyDto.label ?? '' }</span>
                                    </div>
                                    { apiKeyObj.apiKey &&
                                        <div className="mt-2 mb-2">
                                            <p className="text-sm text-red-500">Make sure to save this key because you
                                                will not be able to see it again!</p>
                                            <div className=' bg-gray-100 p-2 rounded text-sm flex justify-between'>
                                                <code className="block font-bold">
                                                    { apiKeyObj.apiKey }
                                                </code>
                                                <button onClick={ () => copyCommand(apiKeyObj.apiKey!) }>
                                                    { copied ?
                                                        <CheckIcon className='size-5 text-green-600'/> :
                                                        <ClipboardDocumentIcon className='size-5 text-gray-700'/>
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    }
                                    <div className="mt-2 text-sm text-gray-600">Scopes:
                                        <span>
                                          { apiKeyObj.apiKeyDto.scopes.map(scope => (
                                              <span key={ scope }
                                                    className="text-sm font-medium px-2 py-1 ml-1 bg-blue-100 text-blue-700 rounded-full">
                                                    { scope }
                                              </span>
                                          )) }
                                         </span>
                                    </div>
                                    <div className="mt-2 text-sm text-gray-600">Created: <span
                                        className="ml-1">{ new Date(apiKeyObj.apiKeyDto.createdAt).toLocaleDateString() }</span>
                                    </div>

                                    <div className="text-sm mt-2 text-gray-600">Expires:
                                        { apiKeyObj.apiKeyDto.expiresAt ?
                                            <span className="ml-1">
                                                <span>{ new Date(apiKeyObj.apiKeyDto.expiresAt).toLocaleDateString() } </span>
                                                <span
                                                    className="ml-1">({ Math.ceil((new Date(apiKeyObj.apiKeyDto.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) } days left)</span>
                                        </span>
                                            :
                                            <span
                                                className="px-2 py-1 ml-1 font-medium bg-blue-100 text-blue-700 rounded-full">never</span>
                                        }
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Button
                                        size="sm"
                                        className="bg-red-600  text-white hover:bg-red-700 px-3 py-1 text-sm flex items-center gap-1"
                                        onClick={ () => revokeApiKey(apiKeyObj.apiKeyDto.id) }>
                                        <TrashIcon className="w-4 h-4"/> REVOKE
                                    </Button>
                                </div>
                            </Card>
                        )) }
                    </ul>
                </div>
            }
        </div>
    );
}
