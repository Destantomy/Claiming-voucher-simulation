import { VouchersContext } from '../context/VoucherContext';
import { useContext } from 'react';

export const useVouchersContext = () => {
    const context = useContext(VouchersContext);
    if(!context) {
        throw Error('useVouchersContext must be used inside VouchersContextProvider');
    }
    return context;
}