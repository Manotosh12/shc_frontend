import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Contact } from '../types';
import { useTranslation } from 'react-i18next';

const ContactUs = () => {
  const { t } = useTranslation();

  const categories = ['DACFW', 'NIC', 'STATE'];
  const [activeTab, setActiveTab] = useState('DACFW');
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    api.get<Contact[]>(`/contacts?category=${activeTab}`).then((res) => {
      setContacts(res.data);
    });
  }, [activeTab]);

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* ✅ Banner */}
      <div className="w-full mb-5">
        <img
          src="/Contact.jpg"
          alt={t('contact.bannerAlt')}
          className="w-full h-[290px] object-cover"
        />
      </div>

      {/* ✅ Content below the banner */}
      <div className="px-4 md:px-12">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-xl font-bold bg-blue-400 text-white py-1 px-2 rounded-xl shadow-md inline-block">
            {t('contact.heading')}
          </h1>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-8 gap-4 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-6 py-2 rounded-full text-sm font-semibold shadow transition duration-300 ${
                activeTab === cat
                  ? 'bg-blue-400 text-white'
                  : 'bg-blue-100 text-green-900 hover:bg-blue-200'
              }`}
              onClick={() => setActiveTab(cat)}
            >
              {t(`contact.tabs.${cat}`)}
            </button>
          ))}
        </div>

        {/* Contacts Table */}
        <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-200 text-green-900">
              <tr>
                <th className="px-6 py-3">{t('contact.table.name')}</th>
                <th className="px-6 py-3">{t('contact.table.designation')}</th>
                <th className="px-6 py-3">{t('contact.table.phone')}</th>
                <th className="px-6 py-3">{t('contact.table.email')}</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-600">
                    {t('contact.noContacts')} <strong>{t(`contact.tabs.${activeTab}`)}</strong>.
                  </td>
                </tr>
              ) : (
                contacts.map((c) => (
                  <tr key={c.id} className="border-t hover:bg-green-50">
                    <td className="px-6 py-4">{c.name}</td>
                    <td className="px-6 py-4">{c.designation}</td>
                    <td className="px-6 py-4">{c.phone}</td>
                    <td className="px-6 py-4">{c.email}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default ContactUs;
