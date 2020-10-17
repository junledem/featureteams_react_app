import { Grid, Stepper, Step, StepLabel, Typography, Box, Paper, withStyles, Tabs } from '@material-ui/core';//Tab, 
import React from 'react';
import { withTranslation } from 'react-i18next';
import './configuration.component.css';
import '../../../common/css/common.css';
import ApplicationContext from '../../../containers/application.context';
import { ProjectDetailFormModel } from '../../../models/presentation/project-detail-form.model';
import AuthService from '../../../services/auth.service';
import ApplicationService from '../../../services/application.service';
import ProgressComponent from '../../../common/components/progress/progress.component';
import { TYPOGRAPHY_STYLE, BTN_THEME_GREEN } from '../../../common/constants/mat-element.const';//tabProps
import { TabPanel } from '../../../common/constants/element-group.const';
import ProjectDetailComponent from './project-detail/project-detail.component';
import FeedbackComponent from './feedback/feedback.component';
import { FeedbackFormModel } from '../../../models/presentation/feedback-form.model';

class ConfigurationComponent extends React.Component {
  static contextType = ApplicationContext;
  
  constructor(props) {
    super(props);

    this.state = {
      stepLabelList: [],
      tabValue: 0,
      projectDetail: new ProjectDetailFormModel(),
      feedback: new FeedbackFormModel(),
      isLoading: false
    };
    this.authService = new AuthService();
    this.applicationService = new ApplicationService(true);

    this.updateProjectDetail = this.updateProjectDetail.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  componentWillMount() {
    const { t } = this.props;
    const supportRequestOptions = t('configuration.radioGroupBox.supportRequest.options', { returnObjects: true });
    const feedback = new FeedbackFormModel();
    feedback.supportRequest.options = supportRequestOptions;
    this.setState({
      stepLabelList: [
        t('configuration.stepper.step1.label'),
        t('configuration.stepper.step2.label'),
        t('configuration.stepper.step3.label')
      ],
      feedback: feedback
    });
    

  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  updateProjectDetail(projectDetail: ProjectDetailFormModel) {
    this.setState({
      projectDetail: projectDetail
    });
  }

  handleBackClick() {
    let tabValue = this.state.tabValue;
    if (tabValue > 0) {
      tabValue -= 1;
      this.setState({
        tabValue: tabValue
      });
    }
  }

  handleNextClick() {
    let tabValue = this.state.tabValue;
    if (tabValue < 2) {
      tabValue += 1;
      this.setState({
        tabValue: tabValue
      });
    }
  }

  render() {
    const { t, classes } = this.props;

    return (
      <form noValidate autoComplete="off" >
        <ProgressComponent isLoading={ this.state.isLoading } progress={ 100 }/>
        {/* flex-nowrap - should be added because <br/> in translation creates a weird long vertical space that extends the height of this container */}
        <Grid container direction="column" alignItems="center" spacing={ 2 } className="container-configuration flex-nowrap">
          <Grid item sm={ 12 } xs={ 12 } className="config-stepper">
            <Stepper activeStep={ this.state.tabValue } alternativeLabel style={ { backgroundColor: '#f0f2f5' } }>
              {
                this.state.stepLabelList.map((label, index) => (
                <Step key={ index }>
                  <StepLabel >
                    <Typography variant="h6" style={ { ...TYPOGRAPHY_STYLE } }>
                      <Box fontSize={ 20 } lineHeight="28px">
                        { label }
                      </Box>
                    </Typography>
                  </StepLabel>
                </Step>
                ))
              }
            </Stepper>
          </Grid>
          <Grid item sm={ 10 } xs={ 10 }>
            <Paper className={ classes.tabContainer }>
              <Tabs value={ this.state.tabValue }
                  onChange={ this.handleTabChange }
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  centered
                  className={ classes.tabGroup }>
                {/* <Tab label="Tab 1" { ...tabProps(0) } className={ classes.tabLabel } />
                <Tab label="Tab 2" { ...tabProps(1) } className={ classes.tabLabel } /> */}
              </Tabs>
              <TabPanel value={ this.state.tabValue } index={ 0 }>
                <ProjectDetailComponent projectDetail={ this.state.projectDetail } updateProjectDetail={ this.updateProjectDetail }/>
              </TabPanel>
              <TabPanel value={ this.state.tabValue } index={ 1 }>
                <FeedbackComponent feedback={ this.state.feedback }></FeedbackComponent>
              </TabPanel>
            </Paper>
          </Grid>
          <Grid item sm={ 10 } xs={ 10 } className="config-button-container">
            <Paper className={ classes.tabContainer }>
              <Grid container direction="row" justify="center" className="config-button-grid">
                <Grid item sm={ 6 } xs={ 6 } >
                  <BTN_THEME_GREEN
                      className="config-button"
                      variant="contained"
                      color="primary"
                      onClick={ this.handleBackClick }>
                      { t('configuration.button.back.label') }
                  </BTN_THEME_GREEN>
                </Grid>
                <Grid item sm={ 6 } xs={ 6 } className="align-horizontal-right">
                  <BTN_THEME_GREEN
                      className="config-button"
                      variant="contained"
                      color="primary"
                      onClick={ this.handleNextClick }>
                      { t('configuration.button.next.label') }
                  </BTN_THEME_GREEN>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </form>
    );
  }
}

const useStyles = theme => ({
  root: {

  },
  tabContainer: {
    flexGrow: 1,
    // padding: '16px 40px 16px 40px'
  },
  tabGroup: {
    minHeight: 0
  },
  tabLabel: {
    fontSize: '18px'
  },
  textField: {
    width: '100%',
    marginBottom: '8px'
  }
});

export default withStyles(useStyles)(withTranslation()(ConfigurationComponent));