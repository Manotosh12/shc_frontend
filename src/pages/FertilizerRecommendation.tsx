
const FertilizerRecommendation = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white shadow-md">
          {/* Header */}
          <div className="bg-[#006400] text-white p-3">
            <h1 className="text-lg font-semibold text-center">
              Fertilizer Recommendation System
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="p-4">
            {/* Dropdowns */}
            <div className="mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <label htmlFor="state" className="block text-sm text-gray-700 mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="state"
                      name="state"
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm appearance-none pr-8 cursor-pointer hover:border-green-500 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none transition-colors"
                      required
                    >
                      <option value="">Select State</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="district" className="block text-sm text-gray-700 mb-1">
                    District <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="district"
                      name="district"
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm appearance-none pr-8 cursor-pointer hover:border-green-500 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none transition-colors"
                      required
                    >
                      <option value="">Select District</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="crop" className="block text-sm text-gray-700 mb-1">
                    Crop <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="crop"
                      name="crop"
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm appearance-none pr-8 cursor-pointer hover:border-green-500 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none transition-colors"
                      required
                    >
                      <option value="">Select Crop</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Soil Test Results */}
            <div className="mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="organicCarbon" className="block text-sm text-gray-700 mb-1">
                    Available Organic Carbon (OC) (%) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="organicCarbon"
                    name="organicCarbon"
                    min="0"
                    step="0.01"
                    placeholder="Enter OC value"
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm cursor-text hover:border-green-500 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none transition-colors placeholder:text-gray-400 [caret-color:green] focus:[caret-color:green] text-gray-900 bg-white"
                    required
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label htmlFor="nitrogen" className="block text-sm text-gray-700 mb-1">
                    Available Nitrogen (N) (kg/ha) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="nitrogen"
                    name="nitrogen"
                    min="0"
                    step="0.01"
                    placeholder="Enter N value"
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm cursor-text hover:border-green-500 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none transition-colors placeholder:text-gray-400 [caret-color:green] focus:[caret-color:green] text-gray-900 bg-white"
                    required
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label htmlFor="phosphorus" className="block text-sm text-gray-700 mb-1">
                    Available Phosphorus (P) (kg/ha) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="phosphorus"
                    name="phosphorus"
                    min="0"
                    step="0.01"
                    placeholder="Enter P value"
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm cursor-text hover:border-green-500 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none transition-colors placeholder:text-gray-400 [caret-color:green] focus:[caret-color:green] text-gray-900 bg-white"
                    required
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label htmlFor="potassium" className="block text-sm text-gray-700 mb-1">
                    Available Potassium (K) (kg/ha) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="potassium"
                    name="potassium"
                    min="0"
                    step="0.01"
                    placeholder="Enter K value"
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm cursor-text hover:border-green-500 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none transition-colors placeholder:text-gray-400 [caret-color:green] focus:[caret-color:green] text-gray-900 bg-white"
                    required
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-8 py-2 rounded text-sm font-medium cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Get Recommendation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FertilizerRecommendation; 