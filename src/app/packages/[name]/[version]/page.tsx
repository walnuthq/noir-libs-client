"use client"
import { useEffect, useState } from 'react';
import { PackageDetail } from './components/PackageDetail';

interface PageProps {
  params: {
    name: string;
    version: string;
  }
}

export default function Page({ params }: PageProps) {
  const [packageDetail, setPackageDetail] = useState()
  
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(`/api/v1/packages/${params.name}/${params.version}`);
        if (response.status === 200) {
          const data = await response.json();
          setPackageDetail(data);
        }
      } catch (err) {
        console.log('no packages ', err);
      }
    };
    
    fetchPackages();
  }, [params.name, params.version]);

  return (packageDetail ? <PackageDetail data={packageDetail}/> : <></>)
}