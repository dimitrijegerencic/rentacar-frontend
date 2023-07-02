import { createStore } from 'redux';
import {message} from "antd";

// Initial state
const initialState = {
    loggedUser: {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        isAdmin: '',
        state_id: '',
        city_id: ''
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                loggedUser: action.payload
            };
        default:
            return state;
    }
};

// Save state to session storage with expiration time
function saveStateToSessionStorage(state, expirationTimeInMinutes) {
    try {
        const expirationTime = Date.now() + expirationTimeInMinutes * 60 * 1000; // Convert minutes to milliseconds
        const serializedState = JSON.stringify({ state, expirationTime });
        sessionStorage.setItem('reduxState', serializedState);
    } catch (error) {
        message.error(error)
    }
}

// Load state from session storage
function loadStateFromSessionStorage() {
    try {
        const serializedState = sessionStorage.getItem('reduxState');
        if (serializedState === null) {
            return undefined;
        }

        const { state, expirationTime } = JSON.parse(serializedState);

        if (expirationTime && Date.now() > expirationTime) {
            sessionStorage.removeItem('reduxState'); // Remove expired data
            return undefined;
        }

        return state;
    } catch (error) {
        return undefined;
    }
}

// Create the store
const store = createStore(reducer, loadStateFromSessionStorage());

store.subscribe(() => {
    const currentState = store.getState();
    saveStateToSessionStorage(currentState, 120); // Set expiration time to 60 minutes
});

export default store;
