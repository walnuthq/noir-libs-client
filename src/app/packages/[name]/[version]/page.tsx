"use client"
import { useEffect, useState } from 'react';
import { PackageDetail } from './components/PackageDetail';
import { FileQuestion } from 'lucide-react';
import Footer from '@/components/Footer';
import { PackageVersionDto } from '@/types/PackageVersionDto';
import Header from '@/components/Header';

interface PageProps {
  params: {
    name: string;
    version: string;
  }
}

export const runtime = "edge";


export default function Page({ params }: PageProps) {
  const [packageDetail, setPackageDetail] = useState<PackageVersionDto | undefined>(undefined);
  const [packageFetched, setPackageFetched] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(`/api/v1/packages/${params.name}/${params.version}`);
        if (response.status === 200) {
          const data: PackageVersionDto = await response.json();
          setPackageDetail(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setPackageFetched(true);
      }
    };
    
    fetchPackages();
  }, [params.name, params.version]);

  return (
    <div style={{ height: '100vh', overflowY: 'auto'}} className='bg-gray-100'>
      <Header/>
      {packageFetched && (packageDetail ? <div className='mb-24'><PackageDetail data={{ name: params.name, packageVersion: packageDetail }}/> </div>:
          <div className="flex flex-col items-center justify-center min-h-[400px] p-8 ">
            <FileQuestion className="w-16 h-16 text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Package Not Found</h1>
            <p className="text-gray-600 text-center mb-6">
              The package you're looking for doesn't exist or has been removed
            </p>
            <div className="flex space-x-4">
              <a 
                href="/"
                className="px-4 py-2 font-bold bg-blue-900 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Return Home
              </a>
            </div>
          </div>)
      }
      <Footer/>
    </div>
    
  )
}