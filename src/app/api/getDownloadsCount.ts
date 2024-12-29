export const fetchPackageDownloadsCount = async (pkg_name:string, pkg_version:string) => {
  try {
    const response = await fetch(`/api/v1/packages/${pkg_name}/${pkg_version}/downloads`);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.log('no packages ', err);
  }
  
};