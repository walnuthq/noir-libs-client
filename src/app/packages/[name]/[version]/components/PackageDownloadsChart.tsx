import { DownloadsData } from '@/types/downloads';
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

interface ChartDataPoint {
  date: string;
  downloads: number;
}

interface PackageDownloadsChartProps {
  data: DownloadsData | undefined;
}

const PackageDownloadsChart = ({ data }: PackageDownloadsChartProps) => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    if (data?.downloads) {
      const downloadsByDate = data.downloads.reduce<Record<string, number>>((acc, download) => {
        const date = new Date(download.downloadDate).toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      const formattedData = Object.entries(downloadsByDate)
        .map(([date, downloads]) => ({
          date,
          downloads
        }))
        .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

      setChartData(formattedData);
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