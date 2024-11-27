import React, { useEffect } from 'react';
import { useVouchersContext } from '../hooks/useVouchersContext';
import { useAuthContext } from '../hooks/useAuthContext';

import Navbar from '../components/Navbar';
import ContentHistory from '../components/ContentHistory';
import SidebarHistory from '../components/SidebarHistory';

const History = () => {
  const { dispatch } = useVouchersContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchVouchers = async () => {
      const res = await fetch('http://localhost:4040/api/product/vouchers', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await res.json();
      if(res.ok) {
        dispatch({type: 'SET_VOUCHERS', payload: json});
      } else {
        console.error('API Error:', res.status, json);
      }
    }
    if(user && user.token) {
      fetchVouchers();
    }
  }, [dispatch, user]);

  return (
    <div className='history'>
      <Navbar />
        <div className="history-detail">
          <div className="history-content">
            <ContentHistory />
          </div>
          <div className="history-sidebar">
            <SidebarHistory />
          </div>
        </div>
    </div>
  )
}

export default History
