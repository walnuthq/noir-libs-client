"use client";
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import { ArrowDownOnSquareIcon } from '@heroicons/react/20/solid';
import {ArchiveBoxIcon} from '@heroicons/react/20/solid';
import Link from 'next/link';
import PackageDownloadsCount from '@/components/PackageDownloadsCount';
interface Package {
  name: string;
  versions: any;
  tags: string;
  readme: string;
  dowloads: any;
  description: string;
}

export default function Home() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [allDownloads, setAllDownloads] = useState();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(`/api/v1/packages`);
        if (response.status === 200) {
          const data = await response.json();
          setPackages(data);
        }
      } catch (err) {
        console.log('no packages ', err);
      }
      setLoading(false);
    };
    const fetchAllDownloads = async () => {
      try {
        const response = await fetch(`/api/v1/packages/downloads`);
        if (response.status === 200) {
          const data = await response.json();
          setAllDownloads(data.total);
        }
      } catch (err) {
        console.log('no packages ', err);
      }
      setLoading(false);
    };
    
    fetchPackages();
    fetchAllDownloads();
  }, []);



  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <Header/>
        <main className="flex-grow  bg-gray-100 pt-6">
          <div className='md:max-w-5xl px-4 mx-auto flex flex-col'>
            <div className='flex-col  flex md:flex-row justify-center items-center gap-4 md:gap-24 text-blue-900'>
              <div className='flex items-center gap-2'>
                <ArchiveBoxIcon className='size-6'/>
                
                <div className='text-xl font-semibold whitespace-nowrap'>Total packages: {packages.length}</div>
              </div>
              <div className='flex items-center gap-2'>
                <ArrowDownOnSquareIcon className='size-6'/>
                <div className='text-xl font-semibold whitespace-nowrap'>Total downloads: {allDownloads}</div>
              </div>
            </div>
            <div className='text-center text-xl font-semibold whitespace-nowrap my-4 md:my-12 text-blue-900'>All packages</div>
            <div className="w-full flex flex-col justify-center items-center">
              {packages.map((pkg) => (
                <Link href={`/packages/${pkg.name}/${pkg.versions[0].version}`} key={pkg.name} className='w-full'>
                  <Card  className='flex justify-between gap-5 hover:shadow-xl transition-all delay-0 cursor-pointer' style={{  margin: '10px', padding: '20px' }}>
                    <div>
                      <div className="text-xl font-bold">{pkg.name} <span className='font-thin text-gray-600'>{pkg.versions[length].version}</span></div>
                      {/* <div className='mt-2'><span className="font-bold">Size:</span> {pkg.versions[length].sizeKb}</div> */}
                      <div className='flex mt-2 gap-2'>
                        <div className='py-1 px-2 bg-slate-100 rounded-lg'>{pkg.tags}</div>
                      </div>
                    </div>
                    <div>
                      <div className='flex items-center gap-2 text-blue-900'>
                        <ArrowDownOnSquareIcon className='size-5'/>
                        <div className='text-lg font-semibold whitespace-nowrap'>Downloads</div>
                      </div>
                      <div className='text-right mt-2'>
                        All time <span className='font-bold'><PackageDownloadsCount pkg_name={pkg.name} pkg_version={pkg.versions[0].version}/></span>
                      </div>
                    </div>
                  </Card>
                </Link>


              ))}
            </div>
          </div>
        </main>
      </div>
  );
}
