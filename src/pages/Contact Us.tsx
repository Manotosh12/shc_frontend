

const Contact = () => {
  return (
   <main className="min-h-screen bg-[url('/Contact.jpg')] bg-cover bg-top bg-no-repeat">
  <div className="bg-white bg-opacity-90 min-h-screen px-4 py-24 md:px-16 text-gray-800">
    
        {/* Header */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Have questions or need help? Reach out to us — we're here to assist you.
          </p>
        </section>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-12">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                placeholder="1234567890"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                rows={5}
                placeholder="Type your message here..."
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              ></textarea>
            </div>

            <div className="col-span-2 text-right">
              <button
                type="submit"
                className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        
      </div>
    </main>
  );
};

export default Contact;
