import React from 'react';
import SoilReportDashboard from '../components/SoilReportDashboard';

const NutrientDashboard = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-green-800 mb-4">Nutrient Dashboard</h1>
      <p className="text-lg text-gray-600">Monitor and analyze your soil's nutrient levels in real-time.</p>
      <SoilReportDashboard />
    </div>
  );
};

export default NutrientDashboard; 