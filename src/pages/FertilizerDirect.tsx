import React, { useState } from 'react';
import { getFertilizerDirectRecommendation } from '../services/api';
import type { FertilizerDirectRequest, FertilizerDirectResponse } from '../Fertilizer/Fertilizer';

export default function FertilizerDirect() {
  const [form, setForm] = useState<FertilizerDirectRequest>({
    n: 0,
    p: 0,
    k: 0,
    OC: 0,
    pH: 0,
  });
  const [result, setResult] = useState<FertilizerDirectResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value === '' ? 0 : parseFloat(e.target.value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await getFertilizerDirectRecommendation(form);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Fertilizer Recommendation</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-lg font-semibold mb-2">Enter Parameter Values</h2>
        <div className="grid grid-cols-3 gap-x-8 gap-y-6 items-center">
          <label htmlFor="n" className="text-gray-700 font-medium">Nitrogen (N)</label>
          <input
            id="n"
            type="number"
            step="0.01"
            name="n"
            value={form.n === 0 ? '' : form.n}
            onChange={handleChange}
            className="col-span-1 rounded border p-3 w-64 text-base"
            required
          />
          <span className="text-gray-500">kg/ha</span>

          <label htmlFor="p" className="text-gray-700 font-medium">Phosphorus (P)</label>
          <input
            id="p"
            type="number"
            step="0.01"
            name="p"
            value={form.p === 0 ? '' : form.p}
            onChange={handleChange}
            className="col-span-1 rounded border p-3 w-64 text-base"
            required
          />
          <span className="text-gray-500">kg/ha</span>

          <label htmlFor="k" className="text-gray-700 font-medium">Potassium (K)</label>
          <input
            id="k"
            type="number"
            step="0.01"
            name="k"
            value={form.k === 0 ? '' : form.k}
            onChange={handleChange}
            className="col-span-1 rounded border p-3 w-64 text-base"
            required
          />
          <span className="text-gray-500">kg/ha</span>

          <label htmlFor="OC" className="text-gray-700 font-medium">Organic Carbon (OC)</label>
          <input
            id="OC"
            type="number"
            step="0.01"
            name="OC"
            value={form.OC === 0 ? '' : form.OC}
            onChange={handleChange}
            className="col-span-1 rounded border p-3 w-64 text-base"
            required
          />
          <span className="text-gray-500">(%)</span>
        </div>

        <div className="grid grid-cols-3 gap-x-8 gap-y-6 items-center">
          <label htmlFor="pH" className="text-gray-700 font-medium">pH</label>
          <input
            id="pH"
            type="number"
            step="0.01"
            name="pH"
            value={form.pH === 0 ? '' : form.pH}
            onChange={handleChange}
            className="col-span-1 rounded border p-3 w-64 text-base"
            required
          />
          <span className="text-gray-500"></span>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded text-sm hover:bg-blue-700 shadow"
            disabled={loading}
          >
            {loading ? 'Calculating…' : 'Get Recommendations'}
          </button>
        </div>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {result && (
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">Recommendations</h2>

          <section>
            <h3 className="font-medium">Main Fertilizers</h3>
            <ul className="list-disc list-inside">
              {result.main_fertilizers.map((f, i) => (
                <li key={i}>{`${f.name} – ${f.quantity} (Provides ${f.provides})`}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="font-medium">Alternative Fertilizers</h3>
            <ul className="list-disc list-inside">
              {result.alternative_fertilizers.map((f, i) => (
                <li key={i}>{`${f.name} – ${f.quantity} (Provides ${f.provides})`}</li>
              ))}
            </ul>
          </section>

          <p className="font-medium">Organic: {result.organic}</p>
          <p className="font-medium">pH Correction: {result.ph_correction}</p>
        </div>
      )}
    </div>
  );
}