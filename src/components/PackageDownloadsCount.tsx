
import { useEffect, useState } from "react";
import { fetchPackageDownloadsCount } from "@/app/api/getDownloadsCount";

const PackageDownloadsCount = ({
  pkg_name,
  pkg_version
}: {
  pkg_name: string;
  pkg_version: string;
}) => {
  const [downloadsCount, setDownloadsCount] = useState();

  useEffect(() => {
    const getDownloadsCount = async () => {

      try {
        const data = await fetchPackageDownloadsCount(pkg_name, pkg_version);
        setDownloadsCount(data.downloads.length);
      } catch (err) {
        console.error('Failed to fetch downloads:', err);
      }
    };

    getDownloadsCount();

  }, []);


  return <>{downloadsCount}</>;
};

export default PackageDownloadsCount;
