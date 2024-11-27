import React, { useMemo } from 'react';
import { useVouchersContext } from '../hooks/useVouchersContext';
import { useAuthContext } from '../hooks/useAuthContext';

const ContentHistory = () => {
  const { vouchers, dispatch } = useVouchersContext();
  const { user } = useAuthContext();

  const remove = async (voucherId) => { 
    if (!user) {
      return;
    }
    dispatch({
      type: 'DELETE_VOUCHER',
      payload: { id: voucherId },
    });

    try {
      const res = await fetch('http://localhost:4040/api/product/vouchers/remove/' + voucherId, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });

      const json = await res.json();
      if (res.ok) {
      } else {
        dispatch({
          type: 'UNDO_DELETE_VOUCHER',
          payload: { id: voucherId, voucher: json },
        });
        console.error('Error deleting voucher:', json);
      }
    } catch (error) {
      dispatch({
        type: 'UNDO_DELETE_VOUCHER',
        payload: { id: voucherId, voucher: { id: voucherId, nama: 'Unknown' } },
      });
      console.error('Network error:', error);
    }
  };

  const claimedVouchers = useMemo(() => {
    return vouchers?.result?.filter(voucher => voucher.status === 1) || [];
  }, [vouchers?.result]);

  return (
    <div className='contentHistory'>
      <div className="contentHistory-detail">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Product Name</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {claimedVouchers.length > 0 ? (
                claimedVouchers.map(voucher => (
                  <tr
                    key={voucher.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {voucher.nama}
                    </th>
                    <td className="px-6 py-4 text-right">
                      <button
                        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        onClick={() => remove(voucher.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No claimed vouchers available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContentHistory;
