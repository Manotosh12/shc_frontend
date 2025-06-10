const Services = () => {
  return (
    <main className="pt-24 px-6 md:px-16 bg-white text-gray-800">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Our Services</h1>
        <p className="text-lg text-gray-600">
          Explore the range of services we offer to improve soil health and empower farmers.
        </p>
      </section>

      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-green-800 mb-2">Soil Testing</h2>
          <p className="text-gray-700 text-sm">
            Scientific testing of soil samples to identify nutrient levels, deficiencies, and chemical properties.
          </p>
        </div>

        <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-green-800 mb-2">Soil Health Reports</h2>
          <p className="text-gray-700 text-sm">
            Detailed reports with results and personalized crop & fertilizer recommendations for each farmer.
          </p>
        </div>

        <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-green-800 mb-2">Digital Access</h2>
          <p className="text-gray-700 text-sm">
            Access soil health reports and service details anytime using our digital dashboard and SHC portal.
          </p>
        </div>

        <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-green-800 mb-2">Farmer Training</h2>
          <p className="text-gray-700 text-sm">
            Workshops and training sessions to educate farmers on best soil and crop management practices.
          </p>
        </div>

        <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-green-800 mb-2">Fertilizer Advice</h2>
          <p className="text-gray-700 text-sm">
            Expert guidance on choosing the right fertilizers and micronutrients based on soil test results.
          </p>
        </div>

        <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-green-800 mb-2">Scheme Support</h2>
          <p className="text-gray-700 text-sm">
            Assistance with government schemes related to soil health, subsidies, and agriculture welfare.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Services;
