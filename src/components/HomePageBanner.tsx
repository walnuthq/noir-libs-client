import { CheckIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

const HomePageBanner = () => {
    const noirLibsInstallCommand = 'curl -s https://raw.githubusercontent.com/walnuthq/noir-libs/main/install.sh | bash';
    const copyCommand = () => {
        navigator.clipboard.writeText(noirLibsInstallCommand);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    const [copied, setCopied] = useState(false);

    return (
        <div className='flex justify-between text-center items-center font-bold bg-blue-900   md:pb-16 text-white'>
            <div className='md:max-w-5xl px-4 mx-auto flex flex-col'>
            <h1 className="text-4xl font-bold text-center mt-20">
                <a href="https://noir-lang.org/" target="_blank"
                   className="text-blue-400 hover:text-blue-300 transition-all delay-75 cursor-pointer">Noir</a> Package
                Registry
            </h1>
            <div className="flex justify-center mt-10 md:mt-24 px-4 sm:px-0 ">
                <div className="md:max-w-5xl px-4 md:pb-0 pb-6 mx-auto flex flex-col">
                    <div>
                        <p className="text-lg sm:text-xl text-white mb-4 text-center">
                            Install noir-libs by running the following command in your terminal
                        </p>
                        <div
                            className="bg-gray-100 p-4 rounded text-sm flex flex-col sm:flex-row items-center sm:justify-between font-bold">
                            <code className="text-blue-800 break-all w-full sm:w-auto text-center sm:text-left">
                                { noirLibsInstallCommand }
                            </code>
                            <button onClick={ copyCommand } className="mt-4 sm:mt-0 sm:ml-4">
                                { copied ? (
                                    <CheckIcon className="w-6 h-6 text-green-600"/>
                                ) : (
                                    <ClipboardDocumentIcon className="w-6 h-6 text-gray-700"/>
                                ) }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>

    );
};

export default HomePageBanner;