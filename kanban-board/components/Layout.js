import React from 'react';
import TopBar from '../components/TopBar';

function Layout({ children }) {
  return (
    <div className="min-w-full min-h-screen h-screen overflow-hidden bg-white">
      <TopBar />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}

export default Layout;