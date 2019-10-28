import React from 'react';
import IconButton from '@material-ui/core/IconButton';

export const PrevButton = ({disabled, onClick}) => (
   <IconButton className="nav-btn" onClick={onClick}>
      <span className="label">Back</span>
   </IconButton>
);