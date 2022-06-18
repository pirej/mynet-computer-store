import { useContext, createContext, useReducer } from 'react';
// import { productReducer } from '../reducer/productReducer';

export const ProductContext = createContext();

const initialState = {
  data: {
    id: '',
  },
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case 'PRODUCT_DATA_FOR_CART':
      return { ...state, testID: action.payload };
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const getProducts = data => {
    dispatch({ type: 'PRODUCT_DATA_FOR_CART', payload: data });
  };

  return (
    <ProductContext.Provider value={{ ...state, getProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  return useContext(ProductContext);
};
