export interface DownloadsData {
  package: string;
  version: string;
  downloads: Download[];
}

export interface Download {
  downloadDate: string;
}

