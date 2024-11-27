import React, { useEffect } from 'react';
import { useVouchersContext } from '../hooks/useVouchersContext';
import { useAuthContext } from '../hooks/useAuthContext';

const SidebarHistory = () => {
  
    const { vouchers, dispatch } = useVouchersContext();
    const { user } = useAuthContext();

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await fetch('http://localhost:4040/api/product/vouchers', {
            headers: {
                'Authorization': `Bearer ${user.token}`
              }
        });
        const data = await response.json();
        if(response.ok) {
            dispatch({ type: 'SET_VOUCHERS', payload: data });
        } else {
            console.error('API Error:', response.status, data);
        }
      } catch (error) {
        console.error('Gagal mengambil data vouchers:', error);
      }
    };
    if(user) {
        fetchVouchers();
        console.log('User token:', user.token);
      }
  }, [dispatch, user]);

  const countByCategory = (kategori) => {
    if (!vouchers || !vouchers.result) return 0;
    return vouchers.result.filter(
      (voucher) => voucher.kategori === kategori && voucher.status === 1
    ).length;
  };

  return (
    <div className='sidebarHistory'>
      <div className="sidebarHistory-content">
        <ul className="space-y-2 font-medium">
            <li>
                <div className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                    <span>Total vouchers diclaim</span>
                </div>
            </li>
          {/* Ongkir */}
          <li>
            <div
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span> Ongkir: {countByCategory('ongkir')} </span>
            </div>
          </li>

          {/* Cashback */}
          <li>
            <div
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span> Cashback: {countByCategory('cashback')} </span>
            </div>
          </li>

          {/* Pengembalian */}
          <li>
            <div
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span> Pengembalian: {countByCategory('pengembalian')} </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarHistory;
