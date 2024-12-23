import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

interface Download {
  id: number;
  downloadDate: string;
}

interface DownloadsResponse {
  package: string;
  version: string;
  totalDownloads: number;
  downloads: Download[];
}

interface ChartDataPoint {
  date: string;
  downloads: number;
}

const PackageDownloadsChart = ({ data }) => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        //the get request address is presented in a test format, the version for the request will be transmitted separately
        const response = await fetch(`/api/v1/packages/${data.name}/${data.versions[3].major}.${data.versions[3].minor}.${data.versions[3].patch}/downloads`);
        if (!response.ok) throw new Error('Failed to fetch downloads');
        
        const responseData: DownloadsResponse = await response.json();
        
        const downloadsByDate = responseData.downloads.reduce<Record<string, number>>((acc, download) => {
          const date = new Date(download.downloadDate).toISOString().split('T')[0];
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        const formattedData = Object.entries(downloadsByDate).map(([date, downloads]) => ({
          date,
          downloads
        }));

        formattedData.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching downloads:', error);
      }
    };
    
    if (data?.name && data?.versions?.[0]) {
      fetchDownloads();
    }
  }, [data]);

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            fontSize={12}
            angle={-45}
            textAnchor="end"
            tickFormatter={(date: string) => {
              return new Date(date).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric'
              });
            }}
          />
          <YAxis 
            fontSize={12}
            tickFormatter={(value: number) => value.toString()}
          />
          <Tooltip
            labelFormatter={(label: string) => new Date(label).toLocaleDateString()}
            formatter={(value: number) => [value, 'Downloads']}
          />
          <Line
            type="monotone"
            dataKey="downloads"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ strokeWidth: 2 }}
            name="Downloads"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PackageDownloadsChart;