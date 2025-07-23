import { useEffect, useState } from 'react';
import {
  fetchStates, fetchDistrictsByState, fetchBlocksByDistrict,
  fetchDistrictSoilReportByState, fetchBlockSoilReportByDistrict
} from '../services/api';

interface State {
  state_id: string;
  state_name: string;
}

interface District {
  district_id: string;
  district_name: string;
}

interface Block {
  block_id: string;
  block_name: string;
}

interface SoilReport {
  locationName: string;
  n: { High: number; Medium: number; Low: number; };
  p: { High: number; Medium: number; Low: number; };
  k: { High: number; Medium: number; Low: number; };
  OC: { High: number; Medium: number; Low: number; };
  pH: { Acidic: number; Neutral: number; Alkaline: number; };
  timestamp: string;
}

// API Response types - Remove custom AxiosXHR definition since we're using Axios types
interface DistrictWithSoilReports {
  district_name: string;
  soil_reports?: SoilReport[];
}

interface BlockWithSoilReports {
  block_name: string;
  soil_reports?: SoilReport[];
}

function getPercent(value: number, obj: { [key: string]: number }) {
  const total = Object.values(obj || {}).reduce((sum, v) => sum + (typeof v === 'number' ? v : 0), 0);
  if (!total) return '0.00%';
  return ((value / total) * 100).toFixed(2) + '%';
}

const SoilReportDashboard = () => {
  const [states, setStates] = useState<State[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);

  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('');

  const [reports, setReports] = useState<SoilReport[]>([]);

  useEffect(() => {
    fetchStates().then((res) => setStates(res.data as State[]));
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetchDistrictsByState(selectedState).then((res) => setDistricts(res.data as District[]));
      fetchDistrictSoilReportByState(selectedState).then((res) => {
        const districtsData = res.data as DistrictWithSoilReports[];
        const flatReports = districtsData.flatMap((district: DistrictWithSoilReports) =>
          (district.soil_reports || []).map((report: SoilReport) => ({
            ...report,
            locationName: district.district_name,
          }))
        );
        setReports(flatReports);
      });
      setSelectedDistrict('');
      setSelectedBlock('');
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedDistrict) {
      fetchBlocksByDistrict(selectedDistrict).then((res) => setBlocks(res.data as Block[]));
      fetchBlockSoilReportByDistrict(selectedDistrict).then((res) => {
        const blocksData = (res.data as BlockWithSoilReports[]) ?? [];
        const flatReports = blocksData.flatMap((block: BlockWithSoilReports) =>
          (block.soil_reports || []).map((report: SoilReport) => ({
            ...report,
            locationName: block.block_name,
          }))
        );
        setReports(flatReports);
      });
      setSelectedBlock('');
    }
  }, [selectedDistrict]);

  return (
    <div className="p-6">
      <div className="flex gap-4 mb-6">
        <select value={selectedState} onChange={e => setSelectedState(e.target.value)} className="p-2 border rounded">
          <option value="">Select a state</option>
          {states.map(state => (
            <option key={state.state_id} value={state.state_id}>{state.state_name}</option>
          ))}
        </select>

        <select value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)} className="p-2 border rounded" disabled={!selectedState}>
          <option value="">Select a district</option>
          {districts.map(d => (
            <option key={d.district_id} value={d.district_id}>{d.district_name}</option>
          ))}
        </select>

        <select value={selectedBlock} onChange={e => setSelectedBlock(e.target.value)} className="p-2 border rounded" disabled={!selectedDistrict}>
          <option value="">Select a block</option>
          {blocks.map(b => (
            <option key={b.block_id} value={b.block_id}>{b.block_name}</option>
          ))}
        </select>
      </div>

      

      <div className="overflow-x-auto mt-8">
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-green-100">
            <tr>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border" colSpan={3}>Nitrogen</th>
              <th className="px-4 py-2 border" colSpan={3}>Phosphorous</th>
              <th className="px-4 py-2 border" colSpan={3}>Potassium</th>
              <th className="px-4 py-2 border" colSpan={3}>OC</th>
              <th className="px-4 py-2 border" colSpan={3}>pH Level</th>
            </tr>
            <tr>
              <th className="px-4 py-2 border"></th>
              <th className="px-2 py-1 border">High</th>
              <th className="px-2 py-1 border">Medium</th>
              <th className="px-2 py-1 border">Low</th>
              <th className="px-2 py-1 border">High</th>
              <th className="px-2 py-1 border">Medium</th>
              <th className="px-2 py-1 border">Low</th>
              <th className="px-2 py-1 border">High</th>
              <th className="px-2 py-1 border">Medium</th>
              <th className="px-2 py-1 border">Low</th>
              <th className="px-2 py-1 border">High</th>
              <th className="px-2 py-1 border">Medium</th>
              <th className="px-2 py-1 border">Low</th>
              <th className="px-2 py-1 border">Acidic</th>
              <th className="px-2 py-1 border">Neutral</th>
              <th className="px-2 py-1 border">Alkaline</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, idx) => (
              <tr key={idx} className="text-center">
                <td className="px-4 py-2 border font-semibold text-left">{report.locationName}</td>
                <td className="px-2 py-1 border">{getPercent(report.n?.High ?? 0, report.n)}</td>
                <td className="px-2 py-1 border">{getPercent(report.n?.Medium ?? 0, report.n)}</td>
                <td className="px-2 py-1 border">{getPercent(report.n?.Low ?? 0, report.n)}</td>
                <td className="px-2 py-1 border">{getPercent(report.p?.High ?? 0, report.p)}</td>
                <td className="px-2 py-1 border">{getPercent(report.p?.Medium ?? 0, report.p)}</td>
                <td className="px-2 py-1 border">{getPercent(report.p?.Low ?? 0, report.p)}</td>
                <td className="px-2 py-1 border">{getPercent(report.k?.High ?? 0, report.k)}</td>
                <td className="px-2 py-1 border">{getPercent(report.k?.Medium ?? 0, report.k)}</td>
                <td className="px-2 py-1 border">{getPercent(report.k?.Low ?? 0, report.k)}</td>
                <td className="px-2 py-1 border">{getPercent(report.OC?.High ?? 0, report.OC)}</td>
                <td className="px-2 py-1 border">{getPercent(report.OC?.Medium ?? 0, report.OC)}</td>
                <td className="px-2 py-1 border">{getPercent(report.OC?.Low ?? 0, report.OC)}</td>
                <td className="px-2 py-1 border">{getPercent(report.pH?.Acidic ?? 0, report.pH)}</td>
                <td className="px-2 py-1 border">{getPercent(report.pH?.Neutral ?? 0, report.pH)}</td>
                <td className="px-2 py-1 border">{getPercent(report.pH?.Alkaline ?? 0, report.pH)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SoilReportDashboard;