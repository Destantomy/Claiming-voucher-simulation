import React from 'react';
import { useLogout } from '../hooks/useLogout';

const Sidebar = ({ setSelectedCategory }) => {
    const { logout } = useLogout();

    const handleLogout = () => {
      logout();
    }

  return (
    <div className="sidebar">
      <div className="sidebar-menu">
        <ul className="space-y-2 font-medium">
          <li>
            <div
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <button onClick={() => setSelectedCategory(null)}>All</button>
            </div>
          </li>
          <li>
            <div
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <button onClick={() => setSelectedCategory('cashback')}>
                Cashback
              </button>
            </div>
          </li>
          <li>
            <div
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <button onClick={() => setSelectedCategory('ongkir')}>
                Ongkir
              </button>
            </div>
          </li>
          <li>
            <div
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <button onClick={() => setSelectedCategory('pengembalian')}>
                Pengembalian
              </button>
            </div>
          </li>
          <li>
            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <button onClick={handleLogout}>Logout</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
