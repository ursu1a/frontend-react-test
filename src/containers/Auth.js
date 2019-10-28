import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import {setAuthUser} from "../actions/auth";
import AuthFormStart from '../components/AuthFormStart';
import AuthFormDetails from "../components/AuthFormDetails";
import AuthFinish from "../components/AuthFinish";
import {BorderLinearProgress} from "../components/BorderLinearProgress";
import {checkDateValidError, checkDateOld18Error} from "../utils/validation";

class Auth extends Component {
   state = {
      step: 1,
      email: '',
      password: '',
      passwordConfirm: '',
      birthDate: {day: '', month: '', year: ''},
      gender: 'male',
      source: ''
   };

   nextStep = () => {
      const {step} = this.state;
      this.setState({
         step: step + 1
      }, () => {
         if (this.isLastStep()) {
            this.saveUserInfo();
         }
      });
   };

   prevStep = () => {
      const {step} = this.state;
      this.setState({
         step: step - 1
      });
   };

   handleChange = values => {
      this.setState({
         ...this.state,
         ...values
      });
   };

   isLastStep() {
      return this.state.step === 3;
   }

   saveUserInfo = () => {
      const {email, password, birthDate: {year, month, day}, gender, source}=this.state;
      const {setAuthUser}=this.props;
      let date=moment([Number(year), Number(month)-1, Number(day)]);
      let dateFormatted=date.unix();

      setAuthUser({
         email: email.trim(),
         password: password.trim(),
         date_of_birth: dateFormatted,
         gender: gender,
         how_hear_about_us: source
      })
   };

   render() {
      const {step, email, password, passwordConfirm, birthDate, gender, source}=this.state;
      const {user}=this.props;
      let progress=(step/3)*100;
      let header='Signup';
      let content=null;

      switch(step) {
         case 1:
            content =
               <AuthFormStart
                  initialValues={{email, password, passwordConfirm}}
                  nextStep={this.nextStep}
                  onChange={this.handleChange}
               />;
               break;

         case 2:
            content =
               <AuthFormDetails
                  initialValues={{birthDate, source}}
                  gender={gender}
                  nextStep={this.nextStep}
                  prevStep={this.prevStep}
                  canGoNext={!checkDateValidError(birthDate) && !checkDateOld18Error(birthDate)}
                  onChange={this.handleChange}
                  onGenderChange={gender => {this.setState({gender: gender})}}
               />;
               break;

         case 3:
            header='Thank you!';
            content =
               <AuthFinish
                  user={{user_data: user}}
               />;
               break;

         default:
            break;
      }

      return (
         <>
            <header className="auth-header">
               <h1 className="heading">{header}</h1>
               <BorderLinearProgress
                  variant="determinate"
                  value={progress}
               />
            </header>
            <main className="auth-content">
               {content}
            </main>
         </>
      )
   }
}

const mapStateToProps = state => ({
   user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
   setAuthUser: bindActionCreators(setAuthUser, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
