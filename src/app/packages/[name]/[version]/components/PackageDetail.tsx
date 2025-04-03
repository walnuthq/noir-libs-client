
'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import PackageDownloadsChart from './PackageDownloadsChart';
import Link from 'next/link';
import { ArchiveBoxIcon, ArrowDownOnSquareIcon } from '@heroicons/react/20/solid';
import { formatDistanceToNow } from 'date-fns';
import { fetchPackageDownloadsCount } from '@/app/api/getDownloadsCount';
import PackageDownloadsCount from '@/components/PackageDownloadsCount';
// import {ClipboardDocumentIcon} from '@heroicons/react/20/solid';
import { CheckIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { VersionDto } from '@/types/VersionDto';
import { PackageVersionDto } from '@/types/PackageVersionDto';
import { DownloadsDto } from '@/types/DownloadsDto';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface PackageDetailProps {
  data: { name: string, packageVersion: PackageVersionDto };
}

export function PackageDetail({ data }: PackageDetailProps) {
  const [activeTab, setActiveTab] = useState('Readme');
  const [monthlyDownloads, setMonthlyDownloads] = useState<DownloadsDto>();
  const [versions, setVersions] = useState<VersionDto[]>([]);
  const tabs = ['Readme', 'Versions'];
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText(`noir-libs add ${data.name}@${data.packageVersion.version.version}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  useEffect(() => {
    const getDownloadsCount = async () => {

      try {
        const resp = await fetchPackageDownloadsCount(data.name, data.packageVersion.version.version);
        setMonthlyDownloads(resp);
      } catch (err) {
        console.error('Failed to fetch downloads:', err);
      }
    };
    const getVersionsArray = async () => {
      try {
        const response = await fetch(`/api/v1/packages/${data.name}/versions/all`);
        if (response.status === 200) {
          const versionsResp: VersionDto[] = await response.json();
          setVersions(versionsResp);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getVersionsArray();
    getDownloadsCount();
  }, [])

  return (
    <>
      <div className="max-w-5xl mx-auto p-4 mt-8">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">
              {data.name} {data.packageVersion.version.version}
            </h1>
              {data.packageVersion.version.isYanked && (
                  <span className="text-sm font-medium px-2 py-1 bg-red-200 text-red-800 rounded-md">YANKED</span>
              )}
          </div>

          <div className="mt-2">{data.packageVersion.description}</div>
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
                {tab === 'Versions' ? `${versions.length} Versions` : 'Readme'}
              </button>
            ))}
          </div>
        </div>
        <div className="md:flex gap-6">
          <div className="flex-grow">
            <div className="prose max-w-none">
              {activeTab === 'Readme' && (
                <Card className='w-full mb-4'>
                  <div className='p-5 overflow-x-auto'>
                    <div className="markdown-content w-full max-w-full">
                      <ReactMarkdown 
                        className='break-words w-full ' 
                        rehypePlugins={[rehypeRaw, rehypeSanitize]}
                      >
                        {data.packageVersion.readme}
                      </ReactMarkdown>
                    </div>
                  </div>
                </Card>
                
              )}
              {activeTab === 'Versions' && (
                <>
                  {versions.map((version) => (
                    <Link href={`/packages/${data.name}/${version.version}`} key={`${data.name}-${version.version}`} className='w-full no-underline'>
                      <Card className='w-full flex justify-between  hover:shadow-xl transition-all mb-3 delay-0 cursor-pointer' style={{  padding: '20px' }}>
                        <div className='flex items-center gap-4'>
                          <div className=' bg-gray-300 p-2 rounded-full'>
                            <ArchiveBoxIcon className='size-7'/>
                          </div>
                          <div>
                            <div className="text-gray-600 text-xs">{formatDistanceToNow(new Date(version.createdAt), { addSuffix: true })}</div>
                            <div className='text-lg font-semibold whitespace-nowrap'>{version.version}</div>
                            <div className="text-gray-600 text-xs">Size: <span className='text-base text-black'>{version.sizeKb} KB</span></div>
                          </div>
                        </div>
                        <div>
                          <div className='flex items-center gap-2 text-blue-900'>
                            <ArrowDownOnSquareIcon className='size-5'/>
                            <div className='text-lg font-semibold whitespace-nowrap'>Downloads</div>
                          </div>
                          <div className='text-right mt-2'>
                            All time <span className='font-bold'><PackageDownloadsCount pkg_name={data.name} pkg_version={version.version}/></span>
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
                  <span>{data.packageVersion.version.version}</span>
                </div>
                <div>
                  <span className="text-gray-600">Uploaded</span>{' '}
                  <span>{formatDistanceToNow(new Date(data.packageVersion.version.createdAt), { addSuffix: true })}</span>
                </div>
                <div>
                  <span className="text-gray-600">Size</span>
                  {' '}
                  <span>{data.packageVersion.version.sizeKb} KB</span>
                </div>
              </div>
            </Card>
            { !data.packageVersion.version.isYanked &&
                <Card className="p-4 mb-4">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    Installation
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Run the following command in your project directory</p>
                      <div className=' bg-gray-100 p-2 rounded text-sm flex justify-between'>
                        <code className="block">
                          noir-libs add {data.name}@{data.packageVersion.version.version}
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
            }
            <Card className="p-4  mb-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                Monthly downloads
              </h3>
              <PackageDownloadsChart data={monthlyDownloads} />
            </Card>

            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                Other
              </h3>
              {data.packageVersion.repository &&
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Github</p>
                    <a href={data.packageVersion.repository} target="_blank" className="py-1  rounded-lg break-words  transition-all">
                      {data.packageVersion.repository}
                    </a>
                  </div>
              }
              {data.packageVersion.ownerUserName &&
                  <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Owner</p>
                      <a href={`https://github.com/${data.packageVersion.ownerUserName}`} target="_blank" className="py-1 break-words  rounded-lg  transition-all">
                        {`https://github.com/${data.packageVersion.ownerUserName}`}
                      </a>
                  </div>
              }
              <p className="text-sm text-gray-600 mb-2">Keywords</p>
              {data.packageVersion.tags && <div className="flex flex-wrap gap-2">
                <div className='py-1 px-2 bg-slate-100 rounded-lg'>{data.packageVersion.tags}</div>
              </div> }
            </Card>
          </div>
        </div>
      </div>
    </>

  );
}