import * as actionTypes from '../constants/index';

export const setAuthUser = (user) => ({
   type: actionTypes.SET_AUTH_USER,
   user: user
});