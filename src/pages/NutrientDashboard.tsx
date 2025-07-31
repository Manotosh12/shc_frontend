import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchBlocksByDistrict, fetchDistrictsByState, fetchStates } from '../services/api';
import SoilPieCharts from '../components/SoilPieCharts';
import SoilReportDashboard from '../components/SoilReportDashboard';

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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-green-700">{t('nutrient.title')}</h1>

      {/* Tab Switcher */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded font-semibold ${activeTab === 'chart' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('chart')}
        >
          {t('tabs.chart')}
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${activeTab === 'report' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('report')}
        >
          {t('tabs.report')}
        </button>
      </div>

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
  );
};

export default NutrientDashboard;
