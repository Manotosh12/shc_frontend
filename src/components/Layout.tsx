import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mt-16">
        <div className="px-4 md:px-12 lg:px-24 xl:px-32 2xl:px-64 w-full mx-auto">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 