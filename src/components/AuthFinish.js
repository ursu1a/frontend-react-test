import React, {Component} from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export default class AuthFinish extends Component {
   onButtonClick = () => {
      console.log(JSON.stringify(this.props.user));
   };

   render() {
      return (
         <div className="auth-finish">
            <div>
               <CheckCircleIcon className="finish-icon" color="inherit" />
            </div>
            <div>
               <Button className="finish-btn" variant="outlined" onClick={this.onButtonClick}>
                  <span className="label">Go to Dashboard</span>
                  <ArrowForwardIcon fontSize="inherit"/>
               </Button>
            </div>
         </div>
      )
   }
}