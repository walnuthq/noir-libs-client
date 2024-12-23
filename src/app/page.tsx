"use client";
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import { ArrowDownOnSquareIcon } from '@heroicons/react/20/solid';
import {ArchiveBoxIcon} from '@heroicons/react/20/solid';
import Link from 'next/link';
interface Package {
  name: string;
  version: string;
  size: string;
}

export default function Home() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(`/api/v1/upload`);
        if (response.status === 200) {
          const data = await response.json();
          setPackages(data);
        }
      } catch (err) {
        console.log('no packages ', err);
      }
      setLoading(false);
    };
    
    fetchPackages();
  }, []);

  function mapToPackages(elements: any[]): Package[] {
    const packageMap = new Map<string, Package>();

    elements.forEach(({ name, version, size }) => {
      if (packageMap.has(name)) {
        // If the package already exists, push the version to the array
        // packageMap.get(name)!.versions.push(version);
      } else {
        // If it doesn't exist, create a new entry
        packageMap.set(name, {
          name,
          version, // Start with the current version in an array
          size, // You might want to decide how to handle size if there are multiple versions
        });
      }
    });
    console.log(elements);
    // Convert the map values to an array
    return Array.from(packageMap.values());
  }


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header/>
        <main className="overflow-y-auto flex-grow md:px-64 px-4 bg-gray-100 pt-6">
          <div className='flex-col flex md:flex-row justify-center items-center gap-12 md:gap-24 text-blue-900'>
            <div className='flex items-center gap-2'>
              <ArchiveBoxIcon className='size-6'/>
              
              <div className='text-xl font-semibold whitespace-nowrap'>Total packages: {packages.length}</div>
            </div>
            <div className='flex items-center gap-2'>
              <ArrowDownOnSquareIcon className='size-6'/>
              <div className='text-xl font-semibold whitespace-nowrap'>Total downloads:</div>
            </div>
          </div>
          <div className='text-center text-xl font-semibold whitespace-nowrap my-12 text-blue-900'>All packages</div>
          <div className="w-full flex flex-col justify-center items-center">
            {packages.map((pkg) => (
                <Card key={pkg.name} className='w-full flex justify-between' style={{  margin: '10px', padding: '20px' }}>
                  <div>
                    <Link href={`/packages/${pkg.name}`} className="text-xl font-bold hover:underline">{pkg.name}: <span className='font-thin text-gray-600'>{pkg.version}</span></Link>
                    <div className='mt-2'><span className="font-bold">Size:</span> {pkg.size}</div>
                    <div className='flex mt-2 gap-2'>
                      <div className='py-1 px-2 bg-slate-100 rounded-lg'>tag</div>
                      <div className='py-1 px-2 bg-slate-100 rounded-lg'>tag</div>
                      <div className='py-1 px-2 bg-slate-100 rounded-lg'>tag</div>
                    </div>
                  </div>
                  <div>
                    <div className='flex items-center gap-2 text-blue-900'>
                      <ArrowDownOnSquareIcon className='size-5'/>
                      <div className='text-lg font-semibold whitespace-nowrap'>Downloads</div>
                    </div>
                    <div className='text-right mt-2'>
                      All time <span className='font-bold'>30</span>
                    </div>
                  </div>
                </Card>

            ))}
          </div>
        </main>
      </div>
  );
}
