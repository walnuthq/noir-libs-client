
'use client';

import { useEffect, useState } from 'react';
import { PackageData } from '@/types/package';
import { Card } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import PackageDownloadsChart from './PackageDownloadsChart';
import Link from 'next/link';
import { Car } from 'lucide-react';
import { ArrowDownOnSquareIcon } from '@heroicons/react/20/solid';
import { formatDistanceToNow } from 'date-fns';
import { fetchPackageDownloadsCount } from '@/app/api/getDownloadsCount';
import PackageDownloadsCount from '@/components/PackageDownloadsCount';
import {ArchiveBoxIcon} from '@heroicons/react/20/solid';
// import {ClipboardDocumentIcon} from '@heroicons/react/20/solid';
import { DownloadsData } from '@/types/downloads';
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';
import Header from './Header';

interface PackageDetailProps {
  data: PackageData;
}

export function PackageDetail({ data }: PackageDetailProps) {
  const [activeTab, setActiveTab] = useState('Readme');
  const [monthlyDownloads, setMonthlyDownloads] = useState<DownloadsData>();
  const [versionsArray, setVersionsArray] = useState([]);
  const tabs = ['Readme', 'Versions'];
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText(`noir-libs add ${data.name}@${data.version}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  useEffect(() => {
    const getDownloadsCount = async () => {

      try {
        const resp = await fetchPackageDownloadsCount(data.name, data.version);
        console.log(resp);
        setMonthlyDownloads(resp);
      } catch (err) {
        console.error('Failed to fetch downloads:', err);
      }
    };
    const getVersionsArray = async () => {
      try {
        const response = await fetch(`/api/v1/packages`);
        if (response.status === 200) {
          const packageData = await response.json();
          console.log(packageData.filter((item: any) => item.name === data.name)[0].versions);
          setVersionsArray(packageData.filter((item: any) => item.name === data.name)[0].versions);
        }
      } catch (err) {
        console.log('no packages ', err);
      }
    }
    getVersionsArray();
    getDownloadsCount();
  }, [])

  return (
    <>
      <div className="max-w-5xl mx-auto p-4">
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <h1 className="text-2xl font-semibold">{data.name}</h1>
            <span className='text-gray-600 text-xl'>{data.version}</span>
          </div>
        </div>
        <div className="border-b mb-6">
          <div className="flex gap-4">
            {tabs.map(tab => (
              <button
                key={tab}
                className={`pb-2 px-1 -mb-[2px] ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-900 text-blue-900'
                    : 'text-gray-600'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="md:flex gap-6">
          <div className="flex-grow">
            <div className="prose max-w-none">
              {activeTab === 'Readme' && (
                <div className="markdown-content">
                  <ReactMarkdown>{data.readme}</ReactMarkdown>
                </div>
                
              )}
              {activeTab === 'Versions' && (
                <>
                  {versionsArray.map((item :any) => (
                    <Link href={`/packages/${data.name}/${data.version}`} key={data.name} className='w-full no-underline'>
                      <Card className='w-full flex justify-between  hover:shadow-xl transition-all my-3 delay-0 cursor-pointer' style={{  padding: '20px' }}>
                        <div className='flex items-center gap-4'>
                          <div className=' bg-gray-300 p-2 rounded-full'>
                            <ArchiveBoxIcon className='size-7'/>
                          </div>
                          <div>
                            <div className="text-gray-600 text-xs">{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</div>
                            <div className='text-lg font-semibold whitespace-nowrap'>{item.version}</div>
                            <div className="text-gray-600 text-xs">Size: <span className='text-base text-black'>{item.sizeKb} KB</span></div>
                          </div>
                        </div>
                        <div>
                          <div className='flex items-center gap-2 text-blue-900'>
                            <ArrowDownOnSquareIcon className='size-5'/>
                            <div className='text-lg font-semibold whitespace-nowrap'>Downloads</div>
                          </div>
                          <div className='text-right mt-2'>
                            All time <span className='font-bold'><PackageDownloadsCount pkg_name={data.name} pkg_version={data.version}/></span>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="md:w-80 flex-shrink-0">
            <Card className="p-4 mb-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                Metadata
              </h3>
              <div className="space-y-2">
                <div>
                  <span className="text-gray-600">Version</span>{' '}
                  <span>{data.version}</span>
                </div>
                <div>
                  <span className="text-gray-600">Uploaded</span>{' '}
                  <span>{formatDistanceToNow(new Date(data.created_at), { addSuffix: true })}</span>
                </div>
                <div>
                  <span className="text-gray-600">Size</span>
                  {' '}
                  <span>{data.size_kb} kb</span>
                </div>
              </div>
            </Card>
            <Card className="p-4 mb-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                Installation
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Run the following command in your project directory</p>
                  <div className=' bg-gray-100 p-2 rounded text-sm flex justify-between'>
                    <code className="block">
                      noir-libs add {data.name}@{data.version}
                    </code>
                    <button onClick={copyCommand}>
                      {copied ? 
                        <CheckIcon className='size-5 text-green-600'/> :
                        <ClipboardDocumentIcon className='size-5 text-gray-700'/>
                      }
                    </button>
                  </div>

                </div>
              </div>
            </Card>
            <Card className="p-4  mb-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                Monthly downloads
              </h3>
              <PackageDownloadsChart data={monthlyDownloads} />
            </Card>
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.tags}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>

  );
}