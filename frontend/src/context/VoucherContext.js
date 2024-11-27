import { createContext, useReducer } from "react";

export const VouchersContext = createContext();

export const VouchersReducer = (state, action) => {
    switch (action.type) {
      case 'SET_VOUCHERS':
        return {
          vouchers: {
            result: Array.isArray(action.payload?.result) ? action.payload.result : [],
          },
        };
      case 'CREATE_VOUCHER':
        return {
          vouchers: {
            result: [action.payload, ...state.vouchers.result],
          },
        };
      case 'UPDATE_VOUCHER':
        return {
          vouchers: {
            result: state.vouchers.result.map((voucher) =>
              voucher.id === action.payload.id
                ? { ...voucher, ...action.payload }
                : voucher
            ),
          },
        };
      case 'DELETE_VOUCHER':
        return {
          vouchers: {
            result: state.vouchers.result.filter((v) => v.id !== action.payload.id),
          },
        };
      default:
        return state;
    }
  };
  

export const VouchersContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(VouchersReducer, {
        vouchers: { result: [] },
    })

    return (
        <VouchersContext.Provider value={{...state, dispatch}}>
            {children}
        </VouchersContext.Provider>
    )
}