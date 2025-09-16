import React, { createContext, useReducer, useContext, useEffect } from 'react';

// Define the types of actions that can modify the state.
export const actionTypes = {
    SET_USER: 'SET_USER',
    LOGOUT: 'LOGOUT',
    // ... other actions like ADD_TO_CART etc.
};

// The default state of the application on first load.
const initialState = {
    user: null,
    isLoggedIn: false,
    cart: null, // Start with null to prevent errors on initial render
    notifications: [], // Ensure this is always an array
    theme: localStorage.getItem('theme') || 'light'
};

// The reducer is a pure function that takes the current state and an action, and returns the new state.
const globalStateReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            // When a user logs in, update the user object and isLoggedIn flag.
            return {
                ...state,
                user: action.payload,
                isLoggedIn: !!action.payload, // Becomes true if payload is a user, false if null
            };
        case actionTypes.LOGOUT:
            // When a user logs out, clear their data.
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return {
                ...state,
                user: null,
                isLoggedIn: false,
            };
        default:
            return state;
    }
};

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(globalStateReducer, initialState);

    // ✅ CRITICAL FIX: This effect runs once when the application component mounts.
    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        // Check if user data exists from a previous session.
        if (token && user) {
            try {
                // If it exists, parse the user data and dispatch it to the global state.
                // This "rehydrates" the session and keeps the user logged in across page refreshes.
                const parsedUser = JSON.parse(user);
                dispatch({ type: actionTypes.SET_USER, payload: parsedUser });
            } catch (error) {
                console.error("Failed to parse user from localStorage", error);
                // If the stored user data is corrupted, log the user out.
                dispatch({ type: actionTypes.LOGOUT });
            }
        }
    }, []); // The empty dependency array [] ensures this runs only once.

    return (
        <GlobalStateContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

// A custom hook to make it easier to access the state from any component.
export const useGlobalState = () => useContext(GlobalStateContext);