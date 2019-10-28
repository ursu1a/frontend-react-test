import React, {Component} from 'react';
import {Field, Fields, reduxForm} from 'redux-form';
import ChoiceGroup from "./ChoiceGroup";
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import {PrevButton} from "./PrevButton";
import {NextButon} from "./NextButton";
import {checkDateValidError, checkDateOld18Error} from "../utils/validation";

const validate = ({birthDate}) => {
   const errors = {
      birthDate: {}
   };
   if (birthDate) {
      if (!birthDate.day) {
         errors.birthDate["day"] = "required";
      } else if (isNaN(birthDate.day) || (birthDate.day < 1 || birthDate.day > 31)) {
         errors.birthDate["day"] = "error";
      }

      if (!birthDate.month) {
         errors.birthDate["month"] = "required";
      } else if (isNaN(birthDate.month) || (birthDate.month < 1 || birthDate.month > 12)) {
         errors.birthDate["month"] = "error";
      }

      if (!birthDate.year && (birthDate.day && birthDate.month)) {
         errors.birthDate["year"] = "required";
      } else if (isNaN(birthDate.year) || (birthDate.year < 1900 || birthDate.year > moment().year())) {
         errors.birthDate["year"] = "error";
      }
   }
   return errors;
};

class renderDateInputs extends Component {
   render() {
      const {birthDate: {day, month, year}, label} = this.props;
      let error =
         checkDateValidError({year: year.input.value, month: month.input.value, day: day.input.value}) ||
         checkDateOld18Error({year: year.input.value, month: month.input.value, day: day.input.value}) || "";

      return (
         <>
            <label className={error ? "error" : ""}>{label}</label>
            <div className="date-inputs">
               {error && <div className="error">{error}</div>}
               <div className="date-inputs-wrapper">
                  <TextField
                     className="date-input-field"
                     variant="outlined"
                     placeholder="DD"
                     fullWidth
                     error={!!(day && day.meta.touched && day.meta.error)}
                     {...day.input}
                  />
                  <TextField
                     className="date-input-field"
                     variant="outlined"
                     placeholder="MM"
                     fullWidth
                     error={!!(month && month.meta.touched && month.meta.error)}
                     {...month.input}
                  />
                  <TextField
                     className="date-input-field"
                     variant="outlined"
                     placeholder="YYYY"
                     fullWidth
                     error={!!(year && year.meta.touched && year.meta.error)}
                     {...year.input}
                  />
               </div>
            </div>
         </>
      )
   }
}

class RenderSelectField extends Component {
   render() {
      const {input, name, children} = this.props;

      return (
         <Select
            className="select-input-field"
            native
            {...input}
            inputProps={{
               name: name
            }}
         >
            {children}
         </Select>
      )
   }
}

class AuthFormDetails extends Component {
   continue = e => {
      e.preventDefault();
      this.props.nextStep();
   };

   back = e => {
      e.preventDefault();
      this.props.prevStep();
   };

   render() {
      const {pristine, submitting, invalid, canGoNext, gender, checkDateValidError, checkDateOld18Error, onGenderChange} = this.props;
      return (
         <form className="auth-form" autoComplete="off">
            <div className="form-row">
               <Fields
                  names={['birthDate.day', 'birthDate.month', 'birthDate.year']}
                  component={renderDateInputs}
                  label="Date of birth"
                  checkDateValidError={checkDateValidError}
                  checkDateOld18Error={checkDateOld18Error}
               />
            </div>
            <div className="form-row">
               <label>Gender</label>
               <ChoiceGroup items={[
                  {title: "Male", value: "male"},
                  {title: "Female", value: "female"},
                  {title: "Unspecified", value: "unspecified"}
               ]}
                            defaultValue={gender}
                            onSelect={onGenderChange}
               />
            </div>
            <div className="form-row">
               <label>Where did you hear about us?</label>
               <Field name="source"
                      component={RenderSelectField}>
                  <option value="other"></option>
                  <option value="Search Engine">Search Engine</option>
                  <option value="Newspaper/magazine article">Newspaper/magazine article</option>
                  <option value="Recommendation from Friends or Family">Recommendation from Friends or Family</option>
               </Field>
            </div>
            <div className="form-row navigation">
               <PrevButton onClick={this.back} />
               <NextButon disabled={submitting || invalid || (pristine && invalid) || !canGoNext} onClick={this.continue} />
            </div>
         </form>
      );
   }
}

export default reduxForm({
   form: 'authFormDetails',
   validate
})(AuthFormDetails);