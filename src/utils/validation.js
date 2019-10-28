import moment from 'moment';

export const checkEmail = email => {
   return (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email.trim()));
};

export const checkDateValidError = ({year, month, day}) => {
   if (year && month && day) {
      let date = moment([Number(year), Number(month)-1, Number(day)]);
      if (!date.isValid()) {
         return 'Date is invalid';
      }
   }
   return null;
};

export const checkDateOld18Error = ({year, month, day}) => {
   if (year && month && day) {
      let date = moment([Number(year), Number(month)-1, Number(day)]);
      if (moment().diff(date, 'years') < 18) {
         return "The user must be 18 year old or more";
      }
   }
   return null;
};