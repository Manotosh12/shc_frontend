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
      <main className="flex-1 mt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 