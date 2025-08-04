import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getFertilizerRecommendation } from '../services/api';

interface Fertilizer {
  name: string;
  quantity: string;
  provides: string;
}

interface RecommendationResult {
  main_fertilizers: Fertilizer[];
  alternative_fertilizers: Fertilizer[];
  organic: string;
  ph_correction: string;
}

interface FormData {
  nLow: string; nMedium: string; nHigh: string;
  pLow: string; pMedium: string; pHigh: string;
  kLow: string; kMedium: string; kHigh: string;
  ocLow: string; ocMedium: string; ocHigh: string;
  phAcidic: string; phNeutral: string; phAlkaline: string;
}

const FertilizerRecommendation: React.FC = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<FormData>({
    nLow: '', nMedium: '', nHigh: '',
    pLow: '', pMedium: '', pHigh: '',
    kLow: '', kMedium: '', kHigh: '',
    ocLow: '', ocMedium: '', ocHigh: '',
    phAcidic: '', phNeutral: '', phAlkaline: '',
  });

  const [result, setResult] = useState<RecommendationResult | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestBody = {
      n: {
        Low: parseFloat(formData.nLow || '0'),
        Medium: parseFloat(formData.nMedium || '0'),
        High: parseFloat(formData.nHigh || '0'),
      },
      p: {
        Low: parseFloat(formData.pLow || '0'),
        Medium: parseFloat(formData.pMedium || '0'),
        High: parseFloat(formData.pHigh || '0'),
      },
      k: {
        Low: parseFloat(formData.kLow || '0'),
        Medium: parseFloat(formData.kMedium || '0'),
        High: parseFloat(formData.kHigh || '0'),
      },
      OC: {
        Low: parseFloat(formData.ocLow || '0'),
        Medium: parseFloat(formData.ocMedium || '0'),
        High: parseFloat(formData.ocHigh || '0'),
      },
      pH: {
        Acidic: parseFloat(formData.phAcidic || '0'),
        Neutral: parseFloat(formData.phNeutral || '0'),
        Alkaline: parseFloat(formData.phAlkaline || '0'),
      },
    };

    try {
      const response = await getFertilizerRecommendation(requestBody);
      setResult(response.data);
    } catch (error) {
      console.error('Error fetching recommendation:', error);
    }
  };

  const renderInputGroup = (title: string, keys: string[], prefix: string) => (
    <div className="mb-3">
      <label className="font-semibold block text-sm text-gray-700 mb-1">{title} *</label>
      <div className="grid grid-cols-3 gap-2">
        {keys.map((key) => (
          <input
            key={key}
            type="number"
            name={`${prefix}${key}`}
            value={formData[`${prefix}${key}` as keyof FormData]}
            onChange={handleChange}
            placeholder={key}
            className="border rounded px-2 py-1 text-sm"
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto p-4 border rounded shadow bg-white">
      <div className="bg-blue-600 text-white text-center py-2 rounded mb-4">
        <h2 className="text-lg font-bold">{t('fertilizer.title')}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {renderInputGroup(t('fertilizer.nitrogen'), ['Low', 'Medium', 'High'], 'n')}
        {renderInputGroup(t('fertilizer.phosphorus'), ['Low', 'Medium', 'High'], 'p')}
        {renderInputGroup(t('fertilizer.potassium'), ['Low', 'Medium', 'High'], 'k')}
        {renderInputGroup(t('fertilizer.organicCarbon'), ['Low', 'Medium', 'High'], 'oc')}
        {renderInputGroup(t('fertilizer.ph'), ['Acidic', 'Neutral', 'Alkaline'], 'ph')}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full text-sm font-semibold"
        >
          {t('fertilizer.submit')}
        </button>
      </form>

      {result && (
        <div className="mt-5 bg-gray-50 p-4 rounded text-sm space-y-3">
          <div>
            <strong>{t('fertilizer.resultTitle')}</strong>
          </div>
          <div>
            <strong>Main Fertilizers:</strong>
            <ul className="list-disc ml-5">
              {result.main_fertilizers.map((f: Fertilizer, idx: number) => (
                <li key={idx}>{`${f.name} - ${f.quantity} (${f.provides})`}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Alternative Fertilizers:</strong>
            <ul className="list-disc ml-5">
              {result.alternative_fertilizers.map((f: Fertilizer, idx: number) => (
                <li key={idx}>{`${f.name} - ${f.quantity} (${f.provides})`}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Organic:</strong> {result.organic}
          </div>
          <div>
            <strong>pH Correction:</strong> {result.ph_correction}
          </div>
        </div>
      )}
    </div>
  );
};

export default FertilizerRecommendation;
