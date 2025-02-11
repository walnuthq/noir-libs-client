
import { useEffect, useState } from "react";
import { fetchAllPackageDownloadsCount, fetchPackageDownloadsCount } from "@/app/api/getDownloadsCount";

const PackageDownloadsCount = ({
  pkg_name,
  pkg_version
}: {
  pkg_name: string;
  // if provided, will count version downloads, otherwise all package downloads
  pkg_version?: string;
}) => {
  const [downloadsCount, setDownloadsCount] = useState<number>(0);

  useEffect(() => {
    const getDownloadsCount = async () => {
      try {
        if (pkg_version) {
          const data = await fetchPackageDownloadsCount(pkg_name, pkg_version);
          if (data) {
            setDownloadsCount(data.downloadDates.length);
          }
        } else {
          const count = await fetchAllPackageDownloadsCount(pkg_name);
          console.log('no mam', count);
          if (count) {
            setDownloadsCount(count);
          }
        }
      } catch (err) {
        console.error('Failed to fetch downloads:', err);
      }
    };

    getDownloadsCount();

  }, []);


  return <>{downloadsCount}</>;
};

export default PackageDownloadsCount;
