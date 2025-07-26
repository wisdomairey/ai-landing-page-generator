import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 transition-all duration-300 lg:ml-0">
          <div className="p-4 pt-16 lg:p-6 lg:pt-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;