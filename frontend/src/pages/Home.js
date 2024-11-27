import { useEffect, useState } from 'react';
import { useVouchersContext } from '../hooks/useVouchersContext';
import { useAuthContext } from '../hooks/useAuthContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';

const Home = () => {
  const { vouchers, dispatch } = useVouchersContext();
  const { user } = useAuthContext();
  const [selectedCategory, setSelectedCategory] = useState(null);

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
    if(user) {
      fetchVouchers();
    }
  }, [dispatch, user]);

  const filteredVouchers = vouchers?.result?.filter((voucher) => {
    return (
      voucher.status === 0 &&
      (selectedCategory === null || voucher.kategori === selectedCategory)
    );
  }) || [];

  return (
    <div className='home'>
        <Navbar/>
        <div className='home-content'>
          <div className="home-content-sidebar">
            <Sidebar setSelectedCategory={setSelectedCategory}/>
          </div>
          <div className="home-content-vouchers">
          {filteredVouchers.length > 0 ? (
            filteredVouchers.map((voucher) => (
              <Content key={voucher.id} voucher={voucher} />
            ))
          ) : (
            <p className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 no-message">
              No voucher left
            </p>
          )}
          </div>
        </div>
    </div>
  )
}

export default Home
