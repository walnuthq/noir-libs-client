import { VersionDto } from '@/types/VersionDto';
import { PackageVersionDto } from '@/types/PackageVersionDto';

export interface PackageDto {
    name: string;
    versions: VersionDto[];
    latestPackageVersion: PackageVersionDto;
}