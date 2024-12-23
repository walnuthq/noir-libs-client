
'use client';

import { useEffect, useState } from 'react';
import { PackageData } from '@/types/package';
import { Card } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import PackageDownloadsChart from './PackageDownloadsChart';
import Link from 'next/link';

interface PackageDetailProps {
  data: PackageData;
}

export function PackageDetail({ data }: PackageDetailProps) {
  const [activeTab, setActiveTab] = useState('Readme');
  const tabs = ['Readme', 'Versions', 'Dependencies', 'Dependents'];


  return (
    <>
      <div className="mb-6 bg-blue-900 pt-6 pb-16 text-white">
        <div className='flex justify-between  mx-auto px-4 max-w-[1200px] text-center items-center font-bold'>
          <div>Noir Libs</div>
          <Link href={'https://t.me/walnuthq'} className='flex gap-2 items-center hover:text-blue-300 transition-all delay-75 cursor-pointer'>
            <span className="[&>svg]:h-6 [&>svg]:w-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 496 512">
                <path
                  d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" />
              </svg>
            </span>
            Join us on Telegram!
        </Link>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto p-4">
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <h1 className="text-2xl font-semibold">{data.name}</h1>
          </div>
        </div>
        <div className="border-b mb-6">
          <div className="flex gap-4">
            {tabs.map(tab => (
              <button
                key={tab}
                className={`pb-2 px-1 -mb-[2px] ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex-grow">
            <div className="prose max-w-none">
              {activeTab === 'Readme' && (
                <ReactMarkdown>{data.readme}</ReactMarkdown>
              )}
            </div>
          </div>
          <div className="w-80 flex-shrink-0">
            <Card className="p-4 mb-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                Metadata
              </h3>
              <div className="space-y-2">
                <div>
                  <span className="text-gray-600">Version</span>
                </div>
                <div>
                  <span className="text-gray-600">Uploaded</span>
                </div>
                <div>
                  <span className="text-gray-600">Size</span>
                </div>
              </div>
            </Card>
            <Card className="p-4 mb-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                Installation
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Run the following command in your project dir</p>
                  <code className="block bg-gray-100 p-2 rounded text-sm">
                    noir-libs add {data.name}@{'<version>'}
                  </code>
                </div>
              </div>
            </Card>
            <Card className="p-4  mb-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                Monthly downloads
              </h3>
              <PackageDownloadsChart data={data} />
            </Card>

            <Card className="p-4 mb-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                Links
              </h3>
              <div className="space-y-2">
                <div>
                  <span className="text-gray-600 text-sm">Repository</span>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Documentation</span>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.tag_name}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>

  );
}