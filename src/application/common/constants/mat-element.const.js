import { Button, withStyles, makeStyles } from '@material-ui/core';
import { teal, green } from '@material-ui/core/colors';
import Rating from '@material-ui/lab/Rating';

export const TXT_FIELD_STYLE = {
  fontSize: 16
};

export const TYPOGRAPHY_STYLE = {
  wordBreak: 'break-word',
};

export const STANDARD_COLOR_SKY_BLUE = '#2196f3';
export const DATE_FORMAT = 'MM/dd/yyyy';

export const BTN_THEME_TEAL = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[500],
    '&:hover': {
      backgroundColor: teal[700],
    },
  },
})) (Button);

export const BTN_THEME_GREEN = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  label: {
    color: 'white'
  }
})) (Button);

export const welcomeStepStyles = makeStyles({
  // root: {
  //   color: '#eaeaf0',
  //   display: 'flex',
  //   height: 22,
  //   alignItems: 'center',
  // },
  // active: {
  //   color: '#784af4',
  // },
  circle: {
    width: 24,
    height: 24,
    // borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  // completed: {
  //   color: '#784af4',
  //   zIndex: 1,
  //   fontSize: 18,
  // },
});

export const stepperStyles = theme => ({
  root: {
    backgroundColor: '#f0f2f5'
  },
  iconContainer: {
    transform: 'scale(1.4)'
  }
});

export const RATING_SKILL = withStyles((theme) => ({
  iconFilled: {
    color: STANDARD_COLOR_SKY_BLUE,
  },
  iconHover: {
    color: '#0088f7',
  }
})) (Rating);

export const httpProgressStyles = theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  root: {
    position: 'relative',
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  top: {
    color: '#1a90ff',
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
  circle: {
    strokeLinecap: 'round',
  },
});

export function tabProps(index) {
  return {
    id: `simple-tab-${ index }`,
    'aria-controls': `simple-tabpanel-${ index }`,
  };
}