import { PackageData } from "@/types/package";

export async function getPackageData(name: string): Promise<PackageData> {
  const response = await fetch(`/localhost:3000/api/v1/packages/${name}`);
  if (!response.ok) {
    throw new Error('Failed to fetch package data');
  }
  return response.json();
}

export async function getAllPackages(name: string) {
  const response = await fetch(`/localhost:3001/api/v1/upload`);
  if (!response.ok) {
    throw new Error('Failed to fetch package data');
  }
  return response.json();
}