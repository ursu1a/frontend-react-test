import React from 'react';
import {checkDateValidError, checkDateOld18Error, checkEmail} from "../utils/validation";


describe('check email validation', () => {
   it('email is invalid', () => {
      expect(checkEmail("aaa")).toBeFalsy();
   });

   it('email is invalid', () => {
      expect(checkEmail("aaa@bbb.cc")).toBeTruthy();
   });
});

describe('check date validation', () => {
   it('check date is valid', () => {
      expect(checkDateValidError({year: 2012, month: 8, day: 1})).toBeFalsy();
   });

   it('check date is invalid', () => {
      expect(checkDateValidError({year: 2002, month: 2, day: 32})).toEqual('Date is invalid');
   });

   it('check birth date is old 18', () => {
      expect(checkDateOld18Error({year: 2000, month: 2, day: 3})).toBeFalsy();
   });

   it('check birth date is young 18', () => {
      expect(checkDateOld18Error({year: 2005, month: 2, day: 3})).toBeTruthy();
   });
});