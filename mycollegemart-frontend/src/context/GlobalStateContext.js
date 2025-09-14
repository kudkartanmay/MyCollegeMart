import { createContext, useReducer, useContext, useMemo, useEffect } from 'react';

// Branch names constant for consistency
export const ENGINEERING_BRANCHES = [
  'All Branches',
  'Computer Engineering',
  'Civil Engineering',
  'Electronics and Telecommunication Engineering',
  'Information Technology',
  'Instrumentation Engineering',
  'Mechanical Engineering',
  'Artificial Intelligence and Data Science',
  'Computer Science and Engineering (Data Science)',
  'Electronics and Telecommunication Engineering (VLSI)'
];

// Add Prime membership related action types
export const actionTypes = {
  // Products
  FETCH_PRODUCTS_START: 'products/fetch/start',
  FETCH_PRODUCTS_SUCCESS: 'products/fetch/success',
  FETCH_PRODUCTS_FAIL: 'products/fetch/fail',
  // Cart
  ADD_TO_CART: 'cart/add',
  REMOVE_FROM_CART: 'cart/remove',
  DECREASE_QUANTITY: 'cart/decrease',
  CLEAR_CART: 'cart/clear',
  UPDATE_CART_ITEM_QUANTITY: 'cart/updateQuantity', // added
  // Wishlist
  TOGGLE_WISHLIST: 'wishlist/toggle',
  ADD_TO_WISHLIST: 'wishlist/add',          // added
  REMOVE_FROM_WISHLIST: 'wishlist/remove',  // added
  // Auth
  SET_USER: 'user/set',
  // Notifications
  ADD_NOTIFICATION: 'notifications/add',
  REMOVE_NOTIFICATION: 'notifications/remove',
  // Wallet
  USE_WALLET_FUNDS: 'wallet/use',
  // Filters
  SET_BRANCH_FILTER: 'filter/setBranch',
  SET_SEMESTER_FILTER: 'filter/setSemester',
  SET_CATEGORY_FILTER: 'filter/setCategory',
  // Prime Membership
  SET_PRIME_MEMBERSHIP: "SET_PRIME_MEMBERSHIP",
  RENEW_PRIME_MEMBERSHIP: "RENEW_PRIME_MEMBERSHIP",
  CANCEL_PRIME_MEMBERSHIP: "CANCEL_PRIME_MEMBERSHIP",
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('collegemartState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load state', err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('collegemartState', serializedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
};

// Initial State
const initialState = {
  products: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  cart: {
    items: {}, // { productId: { ...product, quantity: X } }
  },
  wishlist: [], // array of product IDs
  user: {
    id: 'user-1',
    displayName: 'MyCollegeMart',
    email: 'sample@mycollegemart.com',
    isPrimeMember: false, // Ensure this is false by default
    primeExpiryDate: null,
  },
  notifications: [],
  studentWallet: 10000.00, // Mock student wallet balance
  filters: {
    branch: 'All Branches',
    semester: 'All',
    category: 'All',
    // ...any other existing filters
  },
};

// Reducer
function rootReducer(state, action) {
  switch (action.type) {
    // Product cases
    case actionTypes.FETCH_PRODUCTS_START:
      return { ...state, products: { ...state.products, status: 'loading' } };
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return { ...state, products: { ...state.products, status: 'succeeded', items: action.payload } };
    case actionTypes.FETCH_PRODUCTS_FAIL:
      return { ...state, products: { ...state.products, status: 'failed', error: action.payload } };
    
    // Cart cases
    case actionTypes.ADD_TO_CART: {
      const product = action.payload;
      const existingItem = state.cart.items[product.id];
      const newItems = { ...state.cart.items };

      // Enforce prime-membership max qty = 1
      if (product.id === 'prime-membership') {
        if (existingItem) {
          // keep it at 1 if already present
          newItems[product.id] = { ...existingItem, quantity: 1 };
        } else {
          newItems[product.id] = { ...product, quantity: 1 };
        }
        return { ...state, cart: { items: newItems } };
      }

      if (existingItem) {
        newItems[product.id] = { ...existingItem, quantity: existingItem.quantity + 1 };
      } else {
        newItems[product.id] = { ...product, quantity: 1 };
      }
      return { ...state, cart: { items: newItems } };
    }
    case actionTypes.UPDATE_CART_ITEM_QUANTITY: {
      const { id, quantity } = action.payload;
      const newItems = { ...state.cart.items };
      if (!newItems[id]) return state;

      // Enforce prime-membership max qty = 1
      if (id === 'prime-membership') {
        newItems[id].quantity = 1;
        return { ...state, cart: { items: newItems } };
      }

      if (quantity > 0) {
        newItems[id].quantity = quantity;
      } else {
        delete newItems[id];
      }
      return { ...state, cart: { items: newItems } };
    }
    case actionTypes.DECREASE_QUANTITY: {
      const productId = action.payload;
      const newItems = { ...state.cart.items };
      if (newItems[productId] && newItems[productId].quantity > 1) {
        newItems[productId].quantity -= 1;
      } else {
        delete newItems[productId];
      }
      return { ...state, cart: { items: newItems } };
    }
    case actionTypes.REMOVE_FROM_CART: {
      const productId = action.payload;
      const newItems = { ...state.cart.items };
      delete newItems[productId];
      return { ...state, cart: { items: newItems } };
    }
    case actionTypes.CLEAR_CART: {
      return { ...state, cart: { items: {} } };
    }

    // Wishlist cases
    case actionTypes.TOGGLE_WISHLIST: {
      const productId = action.payload;
      const isInWishlist = state.wishlist.includes(productId);
      const updatedWishlist = isInWishlist
        ? state.wishlist.filter(id => id !== productId)
        : [...state.wishlist, productId];

      const message = isInWishlist ? 'Removed from wishlist' : 'Added to wishlist';
      const newNotification = { id: Date.now(), message, type: 'success' };

      return { 
        ...state, 
        wishlist: updatedWishlist,
        notifications: [...state.notifications, newNotification]
      };
    }

    case actionTypes.ADD_TO_WISHLIST: {
      const productId = action.payload;
      if (state.wishlist.includes(productId)) return state;
      return {
        ...state,
        wishlist: [...state.wishlist, productId],
        notifications: [...state.notifications, { id: Date.now(), message: 'Added to wishlist', type: 'success' }]
      };
    }

    case actionTypes.REMOVE_FROM_WISHLIST: {
      const productId = action.payload;
      if (!state.wishlist.includes(productId)) return state;
      return {
        ...state,
        wishlist: state.wishlist.filter(id => id !== productId),
        notifications: [...state.notifications, { id: Date.now(), message: 'Removed from wishlist', type: 'success' }]
      };
    }

    // Auth cases
    case actionTypes.SET_USER:
      return { ...state, user: action.payload };
    
    // Notification cases
    case actionTypes.ADD_NOTIFICATION:
      return {...state, notifications: [...state.notifications, {id: Date.now(), ...action.payload}]};
    case actionTypes.REMOVE_NOTIFICATION:
      return {...state, notifications: state.notifications.filter(n => n.id !== action.payload)};

    // Wallet cases
    case actionTypes.USE_WALLET_FUNDS:
      const amountToUse = action.payload;
      const newBalance = state.studentWallet - amountToUse;
      return { ...state, studentWallet: newBalance >= 0 ? newBalance : 0 };

    // Filter cases
    case actionTypes.SET_BRANCH_FILTER:
      return { ...state, filters: { ...state.filters, branch: action.payload } };
    case actionTypes.SET_SEMESTER_FILTER:
      return { ...state, filters: { ...state.filters, semester: action.payload } };
    case actionTypes.SET_CATEGORY_FILTER:
      return { ...state, filters: { ...state.filters, category: action.payload } };

    // Prime Membership cases
    case actionTypes.SET_PRIME_MEMBERSHIP:
      return {
        ...state,
        user: {
          ...state.user,
          isPrimeMember: true,
          primeExpiryDate: action.payload // Date object for when membership expires
        }
      };
      
    case actionTypes.RENEW_PRIME_MEMBERSHIP:
      if (!state.user.isPrimeMember) return state;
      
      const newExpiryDate = new Date(state.user.primeExpiryDate);
      newExpiryDate.setFullYear(newExpiryDate.getFullYear() + 1);
      
      return {
        ...state,
        user: {
          ...state.user,
          primeExpiryDate: newExpiryDate.toISOString()
        }
      };
      
    case actionTypes.CANCEL_PRIME_MEMBERSHIP:
      return {
        ...state,
        user: {
          ...state.user,
          isPrimeMember: false,
          primeExpiryDate: null
        }
      };
      
    default:
      return state;
  }
}

// Global state context
const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  // First clear any existing localStorage to start fresh
  useEffect(() => {
    // This will reset the state to ensure user starts without Prime membership
    localStorage.removeItem('collegemartState');
  }, []); // Empty dependency array means this runs once on component mount
  
  const persistedState = loadState();
  const [state, dispatch] = useReducer(
    rootReducer, 
    persistedState || initialState
  );
  
  // Force the user to not be a Prime member when the app starts
  useEffect(() => {
    if (state.user.isPrimeMember === true) {
      dispatch({ type: actionTypes.CANCEL_PRIME_MEMBERSHIP });
    }
  }, [state.user.isPrimeMember]);
  
  // Save state to localStorage whenever it changes
  useEffect(() => {
    saveState(state);
  }, [state]);
  
  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <GlobalStateContext.Provider value={contextValue}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook for accessing state and dispatch
export const useGlobalState = () => useContext(GlobalStateContext);
