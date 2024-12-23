"use client"
import { Suspense, useEffect, useState } from 'react';
import { getPackageData } from '@/lib/api';
import { PackageDetail } from './components/PackageDetail';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    name: string;
  }
}

export default function Page({ params }: PageProps) {
  const [packageDetail, setPackageDetail] = useState()
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(`/api/v1/packages/${params.name}`);
        if (response.status === 200) {
          const data = await response.json();
          setPackageDetail(data);
        }
      } catch (err) {
        console.log('no packages ', err);
      }
    };
    
    fetchPackages();
  }, []);

  return(packageDetail? (<PackageDetail data={packageDetail}/>) : (<></>)
    
  )
}