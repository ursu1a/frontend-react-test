import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export const NextButon = ({disabled, onClick}) => (
   <IconButton disabled={disabled} className="nav-btn" onClick={onClick}>
      <span className="label">Next</span>
      <ArrowForwardIcon fontSize="inherit" />
   </IconButton>
);