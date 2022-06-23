import { useContext, createContext, useReducer, useEffect } from 'react';
// import { productReducer } from '../reducer/productReducer';

export const ProductContext = createContext();

const getLocalStorage = () => {
  if (typeof window !== 'undefined') {
    let cart = localStorage.getItem('cart');

    if (cart) {
      return JSON.parse(localStorage.getItem('cart'));
    } else {
      return [];
    }
  }
};

const initialState = {
  cart: getLocalStorage(),
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const { id, title, stock, price, discount, mainImgSrc, numItems } =
        action.payload;
      //----------
      const findItem = state.cart.find(item => item.id === id);

      if (findItem) {
        const tempCart = state.cart.map(cartItem => {
          if (cartItem.id === id) {
            let moreNumItems = findItem.numItems + 1;
            if (moreNumItems > cartItem.stock) {
              moreNumItems = cartItem.stock;
            }

            return { ...cartItem, numItems: moreNumItems };
          } else {
            return cartItem;
          }
        });

        return { ...state, cart: tempCart };
      } else {
        return { ...state, cart: [...state.cart, action.payload] };
      }
    //---------------
    case 'REMOVE_CART_ITEM': {
      const tempCart = state.cart.filter(item => item.id !== action.payload);
      return { ...state, cart: tempCart };
    }
    //---------------
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const addToCart = (
    id,
    title,
    stock,
    price,
    discount,
    mainImgSrc,
    numItems
  ) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { id, title, stock, price, discount, mainImgSrc, numItems },
    });
  };

  // remove item from cart
  const removeItem = id => {
    dispatch({ type: 'REMOVE_CART_ITEM', payload: id });
  };
  //--------------------

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <ProductContext.Provider value={{ ...state, addToCart, removeItem }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  return useContext(ProductContext);
};
