import { useContext, createContext, useReducer } from 'react';
// import { productReducer } from '../reducer/productReducer';

export const ProductContext = createContext();

const initialState = {
  cart: [],
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const { id, title, stock, price, discount, mainImgSrc } = action.payload;
      return { ...state, cart: [...state.cart, action.payload] };
    //---------------
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const addToCart = (id, title, stock, price, discount, mainImgSrc) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { id, title, stock, price, discount, mainImgSrc },
    });
  };

  return (
    <ProductContext.Provider value={{ ...state, addToCart }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  return useContext(ProductContext);
};
