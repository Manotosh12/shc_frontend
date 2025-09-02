import React, { useEffect, useState, useCallback } from 'react';
import { fetchStateSoilReportPie, fetchDistrictSoilReportPie, fetchBlockSoilReportPie } from '../services/api';
import isEqual from 'lodash.isequal';
import { PieChart } from '@mui/x-charts';
import { useTranslation } from 'react-i18next';

interface SoilPieChartsProps {
  level: 'state' | 'district' | 'block';
  id: string | number;
}

interface SoilPieData {
  n: Record<string, number>;
  p: Record<string, number>;
  k: Record<string, number>;
  OC: Record<string, number>;
  pH: Record<string, number>;
  [key: string]: Record<string, number>;
}

// Type for the chart data item
interface ChartDataItem {
  id: number;
  value: number;
  label: string;
  raw: number;
  percent: string;
}

const SoilPieCharts: React.FC<SoilPieChartsProps> = ({ level, id }) => {
  const { t } = useTranslation();
  const [data, setData] = useState<SoilPieData | null>(null);

  const fetchData = useCallback(async () => {
    let res: SoilPieData[] | undefined;
    if (level === 'state') {
      const response = await fetchStateSoilReportPie(String(id));
      res = response.data as SoilPieData[];
    } else if (level === 'district') {
      const response = await fetchDistrictSoilReportPie(String(id));
      res = response.data as SoilPieData[];
    } else if (level === 'block') {
      const response = await fetchBlockSoilReportPie(String(id));
      res = response.data as SoilPieData[];
    }

    const newData = res?.[0];
    setData(prev => (newData && !isEqual(prev, newData) ? newData : prev));
  }, [level, id]);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [fetchData, id]);

  if (!data) return <p className="text-gray-500">{t('charts.loading')}</p>;

  const nutrients = ['n', 'p', 'k', 'OC', 'pH'];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {nutrients.map(nutrient => {
        const values = data[nutrient];
        const total = Object.values(values).reduce((sum, v) => sum + v, 0);
        const chartData: ChartDataItem[] = Object.entries(values).map(([key, value], index) => ({
          id: index,
          value,
          label: key,
          raw: value,
          percent: total ? ((value / total) * 100).toFixed(1) : '0.0'
        }));

        return (
          <div key={nutrient} className="p-2 border rounded shadow bg-white">
            <h2 className="text-lg font-semibold mb-2">{nutrient.toUpperCase()}</h2>
            <PieChart
              series={[
                {
                  data: chartData,
                  arcLabel: (item) => {
                    // Calculate percentage from the item's value and total
                    const percentage = total ? ((item.value / total) * 100).toFixed(1) : '0.0';
                    return `${percentage}%`;
                  },
                  arcLabelMinAngle: 10,
                },
              ]}
              width={200}
              height={200}
              sx={{
                '& .MuiPieArc-root': {
                  transition: 'transform 0.2s',
                  cursor: 'pointer',
                },
                '& .MuiPieArc-root:hover': {
                  transform: 'scale(1.07)',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))',
                },
                '& .MuiPieArcLabel-root': {
                  fontSize: 12,
                },
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SoilPieCharts;
