import { DownloadsDto } from '@/types/DownloadsDto';
import { DownloadsCountDto } from '@/types/DownloadsCountDto';

export const fetchPackageDownloadsCount = async (pkg_name:string, pkg_version:string): Promise<DownloadsDto | undefined> => {
  try {
    const response = await fetch(`/api/v1/packages/${pkg_name}/${pkg_version}/downloads`);
    if (response.status === 200) {
      return await response.json() as unknown as DownloadsDto;
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchAllPackageDownloadsCount = async (pkg_name:string): Promise<number | undefined> => {
  try {
    const response = await fetch(`/api/v1/packages/${pkg_name}/downloads/count`);
    if (response.status === 200) {
      return (await response.json() as unknown as DownloadsCountDto).count;
    }
  } catch (err) {
    console.log(err);
  }
};

// all existing packages count
export const fetchAllPackagesDownloadsCount = async (): Promise<number | undefined> => {
  try {
    const response = await fetch(`/api/v1/packages/downloads/count`);
    if (response.status === 200) {
      const data = await response.json();
      return (data as unknown as DownloadsCountDto).count;
    }
  } catch (err) {
    console.log(err);
  }
};