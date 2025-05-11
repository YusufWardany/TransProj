import { configureStore } from '@reduxjs/toolkit';

// Example auth reducer (replace with your real reducer)
const initialAuthState = { userInfo: null };
function authReducer(state = initialAuthState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, userInfo: action.payload };
    case 'LOGOUT':
      return { ...state, userInfo: null };
    default:
      return state;
  }
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    // add other reducers here
  },
});

export default store;