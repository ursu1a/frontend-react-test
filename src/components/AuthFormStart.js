import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import TextField from '@material-ui/core/TextField';
import {NextButon} from "./NextButton";
import {checkEmail} from "../utils/validation";

const validate = values => {
   const errors = {};
   if (!values.email) {
      errors.email = 'Email required'
   } else if (!checkEmail(values.email)) {
      errors.email = 'Invalid email address'
   }

   if (!values.password) {
      errors.password = 'Password required';
   } else if (values.password.length < 6) {
      errors.password = 'Password should be minimum 6 characters long';
   }

   if (values.passwordConfirm) {
      if (values.password !== values.passwordConfirm) {
         errors.passwordConfirm = 'Passwords did not match';
      }
   } else {
      errors.passwordConfirm = 'Password confirm required';
   }

   return errors;
};

const renderField = ({
   input,
   label,
   type,
   meta: { touched, invalid, error }
}) => (
   <TextField
      type={type}
      label={(touched && error) ? error : label}
      fullWidth
      error={touched && invalid}
      {...input}
   />
);

class AuthFormStart extends Component {

   continue = e => {
      e.preventDefault();
      this.props.nextStep();
   };

   render() {
      const {pristine, submitting, invalid} = this.props;
      return (
         <form className="auth-form" autoComplete="off">
            <div className="form-row">
            <Field
               name="email"
               type="text"
               component={renderField}
               label="Email"
            />
            </div>
            <div className="form-row">
            <Field
               name="password"
               type="password"
               component={renderField}
               label="Password"
            />
            </div>
            <div className="form-row">
            <Field
               name="passwordConfirm"
               type="password"
               component={renderField}
               label="Password Confirm"
            />
            </div>
            <div className="form-row navigation">
               <span></span>
               <NextButon disabled={submitting || invalid || (pristine && invalid)} onClick={this.continue} />
            </div>
         </form>
      );
   }
};

export default reduxForm({
   form: 'authFormStart',
   validate
})(AuthFormStart);