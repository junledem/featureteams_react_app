import React from 'react';
import './progress.component.css';
import '../../css/common.css';
import { CircularProgress, withStyles, Backdrop } from '@material-ui/core';
import { httpProgressStyles } from '../../constants/mat-element.const';

class ProgressComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      type: null,
      progress: 0
    }

    this.renderHttpProgress = this.renderHttpProgress.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      isLoading: this.props.isLoading,
      type: this.props.type,
      progress: this.props.progress
    });
  }

  renderHttpProgress() {
    const { classes } = this.props;
    return (
      // onClick={handleClose}
      <Backdrop className={ classes.backdrop } open={ this.props.isLoading } >
        <div className={classes.root}>
          <CircularProgress
              variant="determinate"
              className={ classes.bottom }
              size={ 40 }
              thickness={ 4 }
              value={ 100 }/>
          <CircularProgress
              variant="indeterminate"
              disableShrink
              className={ classes.top }
              classes={ {
                circle: classes.circle,
              } }
              size={ 40 }
              thickness={ 4 }
              // {...props}
            />
        </div>
      </Backdrop>
      
    )
  }

  render() {
    return (
      <div className="container-progress">
        { this.renderHttpProgress() }
      </div>
    );
  }
}

export default withStyles(httpProgressStyles)(ProgressComponent);
