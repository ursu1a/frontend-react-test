import {withStyles} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

export const BorderLinearProgress = withStyles({
   root: {
      height: 8,
      backgroundColor: '#ffffff',
      border: '1px solid #1E90FF'
   },
   bar: {
      backgroundColor: '#1E90FF',
   },
})(LinearProgress);