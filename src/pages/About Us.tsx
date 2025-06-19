const About = () => {
  return (
    <div className=" pb-16 bg-white text-gray-800">

      {/* Full Width Banner Image */}
      <div className="w-full mb-12">
        <img
          src="/About us banner.jpg"
          alt="About Soil Health"
          className="w-full h-[450px] object-cover"
        />
      </div>

      {/* Main Content Wrapper */}
      <div className="px-6 md:px-20 max-w-7xl mx-auto">

        {/* Section Heading */}
        <div className="text-left mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-dark-700">
            ABOUT SOIL HEALTH CARD Scheme
          </h1>
          <p className="text-lg md:text-xl text-green-600 font-semibold mt-2">
            Healthy Earth, Healthy Life.
          </p>
        </div>

        {/* Intro Paragraph */}
        <div className="text-justify mb-12 leading-relaxed space-y-4">
          <p>
            A Soil Health Card is used to assess the current status of soil health and, when used over time,
            to determine changes in soil health that are affected by land management. A Soil Health Card
            displays soil health indicators and associated descriptive terms. The indicators are typically based
            on farmers' practical experience and knowledge of local natural resources.
          </p>
          <p>
            Soil Health Card (SHC) is a Government of India’s scheme promoted by the Department of Agriculture
            & Co-operation under the Ministry of Agriculture and Farmers’ Welfare. It is being implemented
            through the Department of Agriculture of all the States and Union Territory Governments. It was
            launched by Hon’ble Prime Minister Shri Narendra Modi on 19.02.2015 at Suratgarh, Rajasthan.
          </p>
        </div>

        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-green-800 mb-6">
            Key Features of the Soil Health Card Scheme
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-green-700">Soil Report</h3>
              <p>
                In the form of soil card, the farmers will get a report. This report will contain all the details about the soil of their particular farm.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-green-700">Regular Updates</h3>
              <p>
                A farm will get the soil card once in every 3 years.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div>
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Benefits of the Soil Health Card Scheme
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Farmers will get a proper soil health record and awareness of management practices.
              They can plan the future of their crops and land effectively.
            </li>
            <li>
              The soil card informs farmers about nutrient deficiencies, helping them choose the right fertilizers
              and crops, which ultimately boosts crop yield.
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default About;
