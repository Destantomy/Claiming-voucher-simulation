import { useAuthContext } from './useAuthContext';
import { useVouchersContext } from './useVouchersContext';

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: vouchersDispatch } = useVouchersContext();
  
    const logout = () => {
      // Hapus user dari localStorage
      localStorage.removeItem('user');
  
      // Reset state auth dan vouchers
      dispatch({ type: 'LOGOUT' });
      vouchersDispatch({
        type: 'SET_VOUCHERS',
        payload: { result: [] }, // Set vouchers ke array kosong dengan struktur konsisten
      });
    };
  
    return { logout };
  };
  