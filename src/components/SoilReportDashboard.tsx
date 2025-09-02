import { useEffect, useState, useRef } from 'react';
import {
  fetchStates, fetchDistrictsByState, fetchBlocksByDistrict,
  fetchDistrictSoilReportByState, fetchBlockSoilReportByDistrict
} from '../services/api';
import * as XLSX from 'xlsx';

interface State { state_id: string; state_name: string; }
interface District { district_id: string; district_name: string; }
interface Block { block_id: string; block_name: string; }

interface SoilReport {
  locationName: string;
  n: { High: number; Medium: number; Low: number; };
  p: { High: number; Medium: number; Low: number; };
  k: { High: number; Medium: number; Low: number; };
  OC: { High: number; Medium: number; Low: number; };
  pH: { Acidic: number; Neutral: number; Alkaline: number; };
  timestamp: string;
}

interface DistrictWithSoilReports { district_name: string; soil_reports?: SoilReport[]; }
interface BlockWithSoilReports { block_name: string; soil_reports?: SoilReport[]; }

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

  // Export dropdown state
  const [exportOpen, setExportOpen] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);

  useEffect(() => { fetchStates().then((res) => setStates(res.data as State[])); }, []);

  useEffect(() => {
    if (selectedState) {
      fetchDistrictsByState(selectedState).then((res) => setDistricts(res.data as District[]));
      fetchDistrictSoilReportByState(selectedState).then((res) => {
        const districtsData = res.data as DistrictWithSoilReports[];
        const flatReports = districtsData.flatMap(d =>
          (d.soil_reports || []).map(r => ({ ...r, locationName: d.district_name }))
        );
        setReports(flatReports);
      });
      setSelectedDistrict(''); setSelectedBlock('');
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedDistrict) {
      fetchBlocksByDistrict(selectedDistrict).then((res) => setBlocks(res.data as Block[]));
      fetchBlockSoilReportByDistrict(selectedDistrict).then((res) => {
        const blocksData = (res.data as BlockWithSoilReports[]) ?? [];
        const flatReports = blocksData.flatMap(b =>
          (b.soil_reports || []).map(r => ({ ...r, locationName: b.block_name }))
        );
        setReports(flatReports);
      });
      setSelectedBlock('');
    }
  }, [selectedDistrict]);

  // Close export dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportRef.current && !exportRef.current.contains(event.target as Node)) {
        setExportOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getFlattenedReports = () => {
    return reports.map(r => ({
      Location: r.locationName,
      Nitrogen_High: getPercent(r.n?.High ?? 0, r.n),
      Nitrogen_Medium: getPercent(r.n?.Medium ?? 0, r.n),
      Nitrogen_Low: getPercent(r.n?.Low ?? 0, r.n),
      Phosphorous_High: getPercent(r.p?.High ?? 0, r.p),
      Phosphorous_Medium: getPercent(r.p?.Medium ?? 0, r.p),
      Phosphorous_Low: getPercent(r.p?.Low ?? 0, r.p),
      Potassium_High: getPercent(r.k?.High ?? 0, r.k),
      Potassium_Medium: getPercent(r.k?.Medium ?? 0, r.k),
      Potassium_Low: getPercent(r.k?.Low ?? 0, r.k),
      OC_High: getPercent(r.OC?.High ?? 0, r.OC),
      OC_Medium: getPercent(r.OC?.Medium ?? 0, r.OC),
      OC_Low: getPercent(r.OC?.Low ?? 0, r.OC),
      pH_Acidic: getPercent(r.pH?.Acidic ?? 0, r.pH),
      pH_Neutral: getPercent(r.pH?.Neutral ?? 0, r.pH),
      pH_Alkaline: getPercent(r.pH?.Alkaline ?? 0, r.pH),
    }));
  };

  const handleExportCSV = () => {
    const flattened = getFlattenedReports();
    const ws = XLSX.utils.json_to_sheet(flattened);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SoilReport');
    XLSX.writeFile(wb, 'soil_report.csv');
    setExportOpen(false);
  };

  const handleExportExcel = () => {
    const flattened = getFlattenedReports();
    const ws = XLSX.utils.json_to_sheet(flattened);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SoilReport');
    XLSX.writeFile(wb, 'soil_report.xlsx');
    setExportOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex gap-4 mb-6">
        <select value={selectedState} onChange={e => setSelectedState(e.target.value)} className="p-2 border rounded">
          <option value="">Select a state</option>
          {states.map(state => (<option key={state.state_id} value={state.state_id}>{state.state_name}</option>))}
        </select>

        <select value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)} className="p-2 border rounded" disabled={!selectedState}>
          <option value="">Select a district</option>
          {districts.map(d => (<option key={d.district_id} value={d.district_id}>{d.district_name}</option>))}
        </select>

        <select value={selectedBlock} onChange={e => setSelectedBlock(e.target.value)} className="p-2 border rounded" disabled={!selectedDistrict}>
          <option value="">Select a block</option>
          {blocks.map(b => (<option key={b.block_id} value={b.block_id}>{b.block_name}</option>))}
        </select>

        {/* Export Dropdown */}
        <div className="relative" ref={exportRef}>
          <button className="p-2 border rounded bg-green-600" onClick={() => setExportOpen(!exportOpen)}>Export</button>
          {exportOpen && (
            <div className="absolute mt-1 bg-white border rounded shadow">
              <button className="block w-full text-left px-4 py-2 hover:bg-green-100" onClick={handleExportCSV}>CSV</button>
              <button className="block w-full text-left px-4 py-2 hover:bg-green-100" onClick={handleExportExcel}>Excel</button>
            </div>
          )}
        </div>
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
