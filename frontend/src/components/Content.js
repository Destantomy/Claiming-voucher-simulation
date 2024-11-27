import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useVouchersContext } from '../hooks/useVouchersContext';

const Content = ({voucher}) => {
  const { dispatch } = useVouchersContext();
  const { user } = useAuthContext();

  const claim = async () => {
    if(!user) {
      console.log("User not logged in.");
      return;
    }

    const res = await fetch('http://localhost:4040/api/product/vouchers/claim/' + voucher.id, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.token}`,
      }
    })

    const json = await res.json();
    console.log('API Response:', json);

    if(res.ok) {
      dispatch({
        type: 'UPDATE_VOUCHER',
        payload: { ...voucher, status: 1 },
      });
    } else {
      console.error('API error:', res.status, json.message || 'Unknown error');
    }
  }

  return (
    <div className='content'>
      
      <div className='content-detail'>
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 custom-voucher">
          <p>Voucher: {voucher.nama}</p>
          <img src={voucher.foto} alt="foto.png" className='voucher-img' />
          <p>Kategori: {voucher.kategori}</p>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={claim}>Claim</button>
        </div>
      </div>
    </div>
  )
}

export default Content
