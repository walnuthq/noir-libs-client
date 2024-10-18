"use client";
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

interface Package {
  name: string;
  versions: string[];
  size: string;
}

export default function Home() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(`/api/v1`);
        if (response.status === 200) {
          const data = await response.json();
          setPackages(mapToPackages(data));
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
        packageMap.get(name)!.versions.push(version);
      } else {
        // If it doesn't exist, create a new entry
        packageMap.set(name, {
          name,
          versions: [version], // Start with the current version in an array
          size, // You might want to decide how to handle size if there are multiple versions
        });
      }
    });

    // Convert the map values to an array
    return Array.from(packageMap.values());
  }


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div style={{ padding: '20px', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-center">npkg</h1>
          <h1 className="text-2xl font-bold text-center">
            <a href="https://noir-lang.org/" target="_blank" className="text-blue-950">Noir</a> packages registry for{' '}
            <a href="https://aztec.network/learn" target="_blank" className="text-purple-800">Aztec Network</a>
          </h1>
        </header>
        <main className="overflow-y-auto flex-grow">
          <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
            {packages.map((pkg) => (
                <Card key={pkg.name} style={{ width: '300px', margin: '20px', padding: '20px' }}>
                  <div className="text-2xl text-center">{pkg.name}</div>
                  {pkg.versions.length === 1 ? ( // Check if there is only one version
                      <div>{pkg.versions[0]}</div> // Render the single version
                  ) : (
                      <div>
                        <div className="font-bold">Versions:</div>
                        <ul className="list-disc pl-5"> {/* Optional styling for the version list */}
                          {pkg.versions.map((ver, index) => (
                              <li key={index}>{ver}</li> // Render each version as a list item
                          ))}
                        </ul>
                      </div>
                  )}
                  <div><span className="font-bold">Size:</span> {pkg.size}</div>
                </Card>

            ))}
          </div>
        </main>
      </div>
  );
}
