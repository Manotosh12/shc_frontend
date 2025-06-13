const Contact = () => {
  return (
    <main className="min-h-screen bg-[url('/Contact.jpg')] bg-cover bg-top bg-no-repeat">
      <div>

        {/* Header */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-green-800 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-700">
            Have questions or need help? Reach out to us — we're here to assist you.
          </p>
        </section>

     {/* Contact Form */}
<div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-6 md:p-12 border border-gray-100">
  <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
    
    {/* Name */}
    <div className="col-span-2">
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        Name
      </label>
      <input
        type="text"
        placeholder="Enter your full name"
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-inner transition duration-200"
        required
      />
    </div>

    {/* Email */}
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        Email
      </label>
      <input
        type="email"
        placeholder="you@example.com"
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-inner transition duration-200"
        required
      />
    </div>

    {/* Phone */}
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        Phone
      </label>
      <input
        type="tel"
        placeholder="1234567890"
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-inner transition duration-200"
        required
      />
    </div>

    {/* Message */}
    <div className="col-span-2">
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        Message
      </label>
      <textarea
        rows={5}
        placeholder="Write your message here..."
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-inner transition duration-200 resize-none"
        required
      ></textarea>
    </div>

    {/* Submit Button */}
    <div className="col-span-2 text-center md:text-right mt-2">
      <button
        type="submit"
        className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 ease-in-out"
      >
        ✉️ Send Message
      </button>
    </div>
  </form>
</div>
      </div>
    </main>
  );
};

export default Contact;
