import { VersionDto } from '@/types/VersionDto';

export interface PackageVersionDto {
    version: VersionDto;
    ownerUserName: string;
    readme?: string;
    description?: string;
    tags?: string;
    repository?: string;
}