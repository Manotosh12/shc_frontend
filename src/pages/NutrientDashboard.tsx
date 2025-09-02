import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchBlocksByDistrict, fetchDistrictsByState, fetchStates } from '../services/api';
import SoilPieCharts from '../components/SoilPieCharts';
import SoilReportDashboard from '../components/SoilReportDashboard';
import { toPng, toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';

type StateType = { state_id: string; state_name: string };
type DistrictType = { district_id: string; district_name: string };
type BlockType = { block_id: string; block_name: string };

const NutrientDashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'chart' | 'report'>('chart');
  const [states, setStates] = useState<StateType[]>([]);
  const [districts, setDistricts] = useState<DistrictType[]>([]);
  const [blocks, setBlocks] = useState<BlockType[]>([]);

  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('');

  const pageRef = useRef<HTMLDivElement>(null);

  // Dropdown state for export
  const [exportOpen, setExportOpen] = useState(false);

  useEffect(() => {
    fetchStates().then(res => setStates(res.data as StateType[]));
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetchDistrictsByState(selectedState).then(res => setDistricts(res.data as DistrictType[]));
      setSelectedDistrict('');
      setBlocks([]);
      setSelectedBlock('');
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedDistrict) {
      fetchBlocksByDistrict(selectedDistrict).then(res => setBlocks(res.data as BlockType[]));
      setSelectedBlock('');
    }
  }, [selectedDistrict]);

  let level: 'state' | 'district' | 'block' = 'state';
  let selectedId = '';

  if (selectedBlock) {
    level = 'block';
    selectedId = selectedBlock;
  } else if (selectedDistrict) {
    level = 'district';
    selectedId = selectedDistrict;
  } else if (selectedState) {
    level = 'state';
    selectedId = selectedState;
  }

  // Export as PNG/JPG using html-to-image
  const exportAsImage = async (format: 'jpg' | 'png') => {
    if (!pageRef.current) return;

    const dataUrl =
      format === 'jpg'
        ? await toJpeg(pageRef.current, { quality: 0.95 })
        : await toPng(pageRef.current, { cacheBust: true });

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `nutrient-dashboard.${format}`;
    link.click();
  };

  // Export as PDF
  const exportAsPDF = async () => {
    if (!pageRef.current) return;

    const dataUrl = await toPng(pageRef.current, { cacheBust: true });
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const img = new Image();
    img.src = dataUrl;

    img.onload = () => {
      const imgRatio = img.width / img.height;
      let width = pdfWidth;
      let height = pdfWidth / imgRatio;
      if (height > pdfHeight) {
        height = pdfHeight;
        width = pdfHeight * imgRatio;
      }

      pdf.addImage(img, 'PNG', 10, 10, width - 20, height - 20);
      pdf.save('nutrient-dashboard.pdf');
    };
  };

  return (
    <div>
      {/* Heading at the top */}
      <h1 className="text-3xl font-bold mb-6 text-black-700">{t('nutrient.title')}</h1>

      {/* Tabs and Export Button in one row */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded font-semibold ${activeTab === 'chart' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('chart')}
          >
            {t('tabs.chart')}
          </button>
          <button
            className={`px-4 py-2 rounded font-semibold ${activeTab === 'report' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('report')}
          >
            {t('tabs.report')}
          </button>
        </div>
        {/* Export Button with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setExportOpen(prev => !prev)}
            className="px-4 py-2 bg-blue-500 text-white rounded shadow"
          >
            Export ▼
          </button>
          {exportOpen && (
            <div className="absolute right-0 z-10 mt-2 bg-white border rounded shadow w-32">
              <button
                onClick={() => {
                  exportAsImage('jpg');
                  setExportOpen(false);
                }}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Export JPG
              </button>
              <button
                onClick={() => {
                  exportAsPDF();
                  setExportOpen(false);
                }}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Export PDF
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Page Content */}
      <div ref={pageRef}>
        {/* Filter Dropdowns */}
        {activeTab === 'chart' && (
          <div className="flex gap-4 mb-6">
            <select
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">{t('filters.selectState')}</option>
              {states.map(state => (
                <option key={state.state_id} value={state.state_id}>{state.state_name}</option>
              ))}
            </select>

            {districts.length > 0 && (
              <select
                value={selectedDistrict}
                onChange={e => setSelectedDistrict(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="">{t('filters.selectDistrict')}</option>
                {districts.map(dist => (
                  <option key={dist.district_id} value={dist.district_id}>{dist.district_name}</option>
                ))}
              </select>
            )}

            {blocks.length > 0 && (
              <select
                value={selectedBlock}
                onChange={e => setSelectedBlock(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="">{t('filters.selectBlock')}</option>
                {blocks.map(block => (
                  <option key={block.block_id} value={block.block_id}>{block.block_name}</option>
                ))}
              </select>
            )}
          </div>
        )}

        {/* Show Pie Charts or Soil Report */}
        {activeTab === 'chart' && selectedId && (
          <SoilPieCharts level={level} id={selectedId} />
        )}

        {activeTab === 'report' && <SoilReportDashboard />}
      </div>
    </div>
  );
};

export default NutrientDashboard;