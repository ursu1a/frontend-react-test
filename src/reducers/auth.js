import * as actionTypes from '../constants/index';

const initialState={
   user: null
};

export const auth = (state=initialState, action) => {
   switch (action.type) {
      case actionTypes.SET_AUTH_USER:
         return {
            ...state,
            user: action.user
         };

      default:
         return state;
   }
};