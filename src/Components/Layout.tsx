import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 