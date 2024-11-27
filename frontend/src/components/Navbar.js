import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isHome = location.pathname === '/';
  const buttonLabel = isHome ? 'History' : 'Home';
  const buttonLink = isHome ? '/history' : '/';

  return (
    <div className='navbar'>
      <div className='navbar-content'>
        <div className="navbar-content-logo">
            <img src="https://www.pngall.com/wp-content/uploads/12/Voucher-Coupon-Card-PNG-File.png" alt="logo.png" />
        </div>
        <div className="navbar-content-title">
            <h1>Claim Voucher Simulation</h1>
        </div>
        <div className="navbar-content-history">
            <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'> <Link to={buttonLink}>{buttonLabel}</Link></button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
