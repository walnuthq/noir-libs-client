import Link from 'next/link';
import { Button } from './ui/button';
import { CheckIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { GitHubIcon } from './Footer';

const Header = () => {
  const noirLibsInstallCommand = 'curl -s https://raw.githubusercontent.com/walnuthq/noir-libs/main/install.sh | bash';
  const copyCommand = () => {
    navigator.clipboard.writeText(noirLibsInstallCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const [copied, setCopied] = useState(false);


  return (
    <header className=" bg-blue-900 pt-6 pb-6 md:pb-16 text-white">
      <div className='md:max-w-5xl px-4 mx-auto flex flex-col'>
        <div className='flex justify-between text-center items-center font-bold'>
          <div className='text-2xl'>Noir Libs</div>
          <div className='flex items-center gap-4'>
            <Link href={'https://t.me/walnuthq'} className='md:flex hidden  gap-2 items-center hover:text-blue-300 transition-all delay-75 cursor-pointer'>
            <span className="[&>svg]:h-4 [&>svg]:w-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 496 512">
                <path
                  d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" />
              </svg>
            </span>
              Join us on Telegram
            </Link>
            <div>|</div>
            <Link href={'https://github.com/walnuthq/noir-libs'} className='md:flex hidden  gap-2 items-center hover:text-blue-300 transition-all delay-75 cursor-pointer'>
              <span>GitHub</span>
              <GitHubIcon className='w-4 h-4'/>
            </Link>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-center mt-20 md:mt-32">
          <a href="https://noir-lang.org/" target="_blank" className="text-blue-400 hover:text-blue-300 transition-all delay-75 cursor-pointer">Noir</a> Package Registry 
        </h1>
        <div className="flex justify-center mt-10 md:mt-24 px-4 sm:px-0 ">
          <div className="md:max-w-5xl px-4 mx-auto flex flex-col">
            <div>
              <p className="text-lg sm:text-xl text-white mb-4 text-center">
              Install noir-libs by running the following command in your terminal
              </p>
              <div
                  className="bg-gray-100 p-4 rounded text-sm flex flex-col sm:flex-row items-center sm:justify-between font-bold">
                <code className="text-blue-800 break-all w-full sm:w-auto text-center sm:text-left">
                  {noirLibsInstallCommand}
                </code>
                <button onClick={copyCommand} className="mt-4 sm:mt-0 sm:ml-4">
                  {copied ? (
                      <CheckIcon className="w-6 h-6 text-green-600"/>
                  ) : (
                      <ClipboardDocumentIcon className="w-6 h-6 text-gray-700"/>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;