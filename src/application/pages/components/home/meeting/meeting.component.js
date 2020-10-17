import { Grid, withStyles, Paper, Tabs, Tab, TextField } from '@material-ui/core';
import React from 'react';
import { withTranslation } from 'react-i18next';
import './meeting.component.css';
import '../../../../common/css/common.css';
import ApplicationContext from '../../../../containers/application.context';
import { renderHomeSectionHeader, renderHomeSectionSubtitle, Scheduler, TabPanel } from '../../../../common/constants/element-group.const';
import { tabProps } from '../../../../common/constants/mat-element.const';

class MeetingComponent extends React.Component {
  static contextType = ApplicationContext;
  
  constructor(props) {
    super(props);

    this.state = {
      tabValue: 0,
      meeting: {
        checkBoxLabel_0: false,
        checkBoxLabel_1: false
      }
    };

    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleSchedulerChange = this.handleSchedulerChange.bind(this);
  }

  componentDidMount() {
    
  }

  handleTabChange(event, newValue) {
    this.setState({
      tabValue: newValue
    });
  }

  handleSchedulerChange(event, newValue) {
    const { meeting } = this.state;
    meeting[event.target.name] = newValue;
    this.setState({
      meeting: meeting
    });
  }

  render() {
    const { t } = this.props;
    const { classes } = this.props;
    // const formMeeting = this.state.meeting;

    return (
      <Grid container direction="row" justify="center" className="container-welcome">
        <Grid item sm={ 12 } xs={ 12 }>
          { renderHomeSectionHeader(t('meeting.header')) }  
        </Grid>
        <Grid item sm={ 8 } xs={ 8 }>
          { renderHomeSectionSubtitle(t('meeting.subtitle')) }
        </Grid>
        <Grid item sm={ 8 } xs={ 8 }>
          <Paper className={ classes.tabContainer }>
            <Tabs value={ this.state.tabValue }
                onChange={ this.handleTabChange }
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                centered
                className={ classes.tabGroup }>
              <Tab label={ t('meeting.button.setupMeeting.label') } { ...tabProps(0) } className={ classes.tabLabel } />
              <Tab label={ t('meeting.button.sendMessage.label') } { ...tabProps(1) } className={ classes.tabLabel } />
            </Tabs>
            <TabPanel value={ this.state.tabValue } index={ 0 }>
              <Grid container direction="row">
                <Grid item sm={ 12 } xs={ 12 }>
                  <TextField
                    label={ t('meeting.textfield.name.label') }
                    // name={ formMeeting.password.name }
                    // value={ formMeeting.password.value }
                    // onChange={ this.handleInputChange }
                    // error={ !!formMeeting.password.error }
                    // helperText={ formMeeting.password.error ?
                    //   t(`meeting.textfield.name.helperText.${formMeeting.password.error}`) : '' }
                    className={ classes.textField } />
                </Grid>
                <Grid item sm={ 12 } xs={ 12 }>
                  <TextField
                    label={ t('meeting.textfield.company.label') }
                    // name={ formMeeting.password.name }
                    // value={ formMeeting.password.value }
                    // onChange={ this.handleInputChange }
                    // error={ !!formMeeting.password.error }
                    // helperText={ formMeeting.password.error ?
                    //   t(`meeting.textfield.company.helperText.${formMeeting.company.error}`) : '' }
                    className={ classes.textField } />
                </Grid>
                <Grid item sm={ 12 } xs={ 12 }>
                  <TextField
                    label={ t('meeting.textfield.email.label') }
                    // name={ formMeeting.password.name }
                    // value={ formMeeting.password.value }
                    // onChange={ this.handleInputChange }
                    // error={ !!formMeeting.password.error }
                    // helperText={ formMeeting.password.error ?
                    //   t(`meeting.textfield.email.helperText.${formMeeting.email.error}`) : '' }
                    className={ classes.textField } />
                </Grid>
                <Grid item sm={ 12 } xs={ 12 }>
                  <TextField
                    label={ t('meeting.textfield.telephone.label') }
                    // name={ formMeeting.password.name }
                    // value={ formMeeting.password.value }
                    // onChange={ this.handleInputChange }
                    // error={ !!formMeeting.password.error }
                    // helperText={ formMeeting.password.error ?
                    //   t(`meeting.textfield.telephone.helperText.${formMeeting.telephone.error}`) : '' }
                    className={ classes.textField } />
                </Grid>
                <Grid item sm={ 12 } xs={ 12 } style={ { marginTop: '24px' } }>
                  <Scheduler index={ 0 } label="Test scheduler label"
                      selected={ this.state.meeting.checkBoxLabel_0 }
                      onScheduleChange={ this.handleSchedulerChange }>
                  </Scheduler>
                  <Scheduler index={ 1 } label="Test scheduler label"
                      selected={ this.state.meeting.checkBoxLabel_1 }
                      onScheduleChange={ this.handleSchedulerChange }>
                  </Scheduler>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={ this.state.tabValue } index={ 1 }>
              Tab 2 content
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const useStyles = theme => ({
  root: {

  },
  tabContainer: {
    flexGrow: 1,
    marginTop: '40px',
    padding: '16px 40px 16px 40px'
  },
  tabGroup: {
    marginBottom: '16px'
  },
  tabLabel: {
    fontSize: '18px'
  },
  textField: {
    width: '100%',
    marginBottom: '8px'
  }
});

export default withStyles(useStyles)(withTranslation()(MeetingComponent));
