import React from 'react';
import * as actionTypes from '../constants/index';
import {auth} from '../reducers/auth';

it('should set a user to store', () => {
   const user={
      email: "test@mail.com",
      password: "mypass",
      date_of_birth: 950306400,
      gender: "male",
      how_hear_about_us: "other"
   };

   const state={
      user: null
   };
   const newState=auth(state, {
      type: actionTypes.SET_AUTH_USER,
      user: user
   });

   expect(newState).toEqual({user});
});