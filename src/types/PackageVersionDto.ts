import { VersionDto } from '@/types/VersionDto';

export interface PackageVersionDto {
    version: VersionDto;
    readme?: string;
    description?: string;
    tags?: string;
}