import React from 'react';
// import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Typography, Box, Checkbox, Snackbar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { TYPOGRAPHY_STYLE, welcomeStepStyles } from './mat-element.const';
import '../css/common.css';
import { ObjectUtil } from '../../utilities/object.util';
import '../../pages/components/home/welcome/welcome.component.css';

export const renderHomeSectionHeader = (header: string) => (
  <Typography variant="h4" style={ { ...TYPOGRAPHY_STYLE, textAlign: 'center', transform: 'scaleY(1.2)' } }>
    <Box letterSpacing={ 8 } fontFamily="Verdana, Geneva, sans-serif" >
        { header }
    </Box>
  </Typography>
);

/* Alternatively, this can be done as well
  export var render = function() {
    return (
        // Some other JSX
    );
  };
 */

export const renderHomeSectionSubtitle = (subtitle: string, withUnderline: boolean = true) => (
  <Typography variant="h6" style={ { ...TYPOGRAPHY_STYLE, textAlign: 'center', marginTop: '20px' } }>
    <Box fontSize={ 21 } lineHeight="28px">
      { subtitle }
    </Box>
    {
      withUnderline ? <div className="welcome-subtitle-underline"></div> : null
    }
  </Typography>
);

export const WelcomeStepIcon = function(props) {
  const classes = welcomeStepStyles();
  // const { active, completed } = props;

  return (
    <div
      // className={clsx(classes.root, {
      //   [classes.active]: active,
      // })}
    >
      {/* {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />} */}
      <div className={ classes.circle } />
    </div>
  );
}

WelcomeStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

Scheduler.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
};

export function Scheduler(props) {
  const { children, label, selected, index, onScheduleChange, ...other } = props;
  return (
    <Typography key={ index }
        id={ `scheduler-${ index }` }
        component="div"
        // active={ selected.toString() }
        className={ selected ? 'scheduler scheduler-selected' : 'scheduler' }
        { ...other }>
      <Box className="scheduler-content">
        <span className="scheduler-label">
          { label }
        </span>
        <Checkbox className="scheduler-checkbox"
            checked={ selected }
            onChange={ onScheduleChange }
            name={ `checkBoxLabel_${ index }` }
            color="primary"
        />
      </Box>
      { !ObjectUtil.isEmpty(children) && <Box p = { 3 }>{ children }</Box> }
    </Typography>
  );
}

export const renderSkillHeader = (header: string) => (
  <Typography variant="subtitle1" style={ { ...TYPOGRAPHY_STYLE } }>
    <Box fontWeight="bold" >
      { header }
    </Box>
  </Typography>
);

export function SnackbarRequestStatus(props) {
  const { severity, msg, open, handleClose } = props;
  return (
    <Snackbar open={ open } autoHideDuration={ 5000 } onClose={ handleClose }>
      <MuiAlert elevation={ 6 } variant="filled" severity={ severity } onClose={ handleClose } >
        { msg }
      </MuiAlert>
    </Snackbar>
  );
}

export function ConfirmDialog(props) {
  const { open, handleClose, title, content } = props;
  const btnAction: DialogAction = props.btnAction;
  const btnCancel: DialogAction = props.btnCancel;
  return (
    <Box justifyContent="center">
      <Dialog
          open={ open }
          onClose={ handleClose }
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description" >
        {
          title ?
            <DialogTitle id="alert-dialog-title">
              { title }
            </DialogTitle> : null
        }
        {
          content ? 
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
              { content }
            </DialogContentText>
            </DialogContent> : null
        }
        <DialogActions>
          {
            btnCancel ?
              <Button onClick={ btnCancel.onClick } color="primary">
                { btnCancel.label }
            </Button> : null
          }
          {
            btnAction ?
              <Button onClick={ btnAction.onClick } color="primary" autoFocus>
                { btnAction.label }
              </Button> : null
          }
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
        component="div"
        role="tabpanel"
        hidden={ value !== index }
        id={ `simple-tabpanel-${ index }` }
        aria-labelledby={ `simple-tab-${index}` }
        { ...other } >
      { value === index && <Box p = { 3 }>{ children }</Box> }
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export interface DialogAction {
  label: string;
  onClick: null;
}

export const renderPageHeader = (header: string, subtitle: string = '') => (
  <React.Fragment>
    <Typography variant="h5" style={ { ...TYPOGRAPHY_STYLE, marginTop: '20px' } }>
      <Box>
        { header }
      </Box>
    </Typography>
    {
      subtitle ?
        <Typography variant="subtitle2" style={ { ...TYPOGRAPHY_STYLE, marginTop: '16px', marginBottom: '40px' } }>
        <Box>
          { subtitle }
        </Box>
      </Typography> : null
    }
  </React.Fragment>
);

