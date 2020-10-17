import { Grid, Stepper, Step, StepLabel, Typography, Box, withStyles } from '@material-ui/core';
import React from 'react';
import { withTranslation } from 'react-i18next';
import './welcome.component.css';
import '../../../../common/css/common.css';
import ApplicationContext from '../../../../containers/application.context';
import { renderHomeSectionHeader, renderHomeSectionSubtitle } from '../../../../common/constants/element-group.const';
import { stepperStyles, TYPOGRAPHY_STYLE, BTN_THEME_GREEN } from '../../../../common/constants/mat-element.const';
import { HowToRegOutlined, PeopleOutline, GroupAddOutlined, DescriptionOutlined, ThumbUpOutlined } from '@material-ui/icons';

class WelcomeComponent extends React.Component {
  static contextType = ApplicationContext;
  
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0
    };

    this.getStepLabelIcon = this.getStepLabelIcon.bind(this);
    this.getStepLabelButton = this.getStepLabelButton.bind(this);
    this.handleMeetingClick = this.handleMeetingClick.bind(this);
  }

  componentWillMount() {
    /* remove this code, will mount might be renamed in the future */
    const { t } = this.props;
    this.setState({
      stepLabelList: [
        t('welcome.stepper.step1.label'),
        t('welcome.stepper.step2.label'),
        t('welcome.stepper.step3.label'),
        t('welcome.stepper.step4.label'),
        t('welcome.stepper.step5.label')
      ],
      stepSubtitleList: [
        t('welcome.stepper.step1.subtitle'),
        t('welcome.stepper.step2.subtitle'),
        t('welcome.stepper.step3.subtitle'),
        t('welcome.stepper.step4.subtitle'),
        t('welcome.stepper.step5.subtitle')
      ]
    });
  }

  componentDidMount() {
    
  }

  handleSignupClick() {
    
  }

  getStepLabelIcon(index: number) {
    switch(index) {
      case 0:
        return <HowToRegOutlined className="step-icon"/>;

      case 1:
        return <PeopleOutline className="step-icon"/>;

      case 2:
        return <GroupAddOutlined className="step-icon"/>

      case 3:
        return <DescriptionOutlined className="step-icon"/>

      case 4:
        return <ThumbUpOutlined className="step-icon"/>;

      default:
        return null;
    }
  }

  handleMeetingClick() {
    const previousStep = this.state.activeStep;
    this.setState({
      activeStep: previousStep + 1
    })
  }

  getStepLabelButton(index: number) {
    const { t } = this.props;

    switch(index) {
      case 0:
        return <Box className="step-label-button">
          <BTN_THEME_GREEN
            variant="contained"
            disabled={ this.state.activeStep !== index }
            color="primary"
            onClick={ this.handleMeetingClick }
            >
            { t('welcome.button.setupMeeting.label') }
          </BTN_THEME_GREEN>
        </Box>;

      case 1:
        return <Box className="step-label-button">
          <BTN_THEME_GREEN
            variant="contained"
            disabled={ this.state.activeStep !== index }
            color="primary"
            onClick={ this.handleMeetingClick }
            >
            { t('welcome.button.configTeam.label') }
          </BTN_THEME_GREEN>
        </Box>;

      case 2:
        return <Box className="step-label-button">
          <BTN_THEME_GREEN
            variant="contained"
            disabled={ this.state.activeStep !== index }
            color="primary"
            onClick={ this.handleMeetingClick }
            >
            { t('welcome.button.register.label') }
          </BTN_THEME_GREEN>
        </Box>;

      default:
        return null;
    }
  }

  render() {
    const { t } = this.props;
    // const formWelcome = { ...this.state.welcome };
    const { classes } = this.props;

    return (
      <Grid container direction="row" justify="center" className="container-welcome">
        <Grid item sm={ 12 } xs={ 12 }>
          {/* <Grid container direction="column" spacing={ 2 } alignItems="center">
            <Grid item>
              
            </Grid>
            <Grid item>
              
            </Grid>
          </Grid> */}
          { renderHomeSectionHeader(t('welcome.header')) }
        </Grid>
        <Grid item sm={ 8 } xs={ 8 }>
          { renderHomeSectionSubtitle(t('welcome.subtitle')) }
        </Grid>
        <Grid item sm={ 12 } xs={ 12 }>
          <Stepper activeStep={ this.state.activeStep } alternativeLabel className="container-step">
            {
              this.state.stepLabelList.map((label, index) => (
              <Step key={ index }>
                <StepLabel classes={ { iconContainer: classes.iconContainer } }>
                  <Typography variant="h6" style={ { ...TYPOGRAPHY_STYLE } }>
                    <Box fontSize={ 20 } lineHeight="28px">
                      { this.getStepLabelIcon(index) }
                      { label }
                    </Box>
                  </Typography>
                  <Typography variant="subtitle2" style={ { ...TYPOGRAPHY_STYLE, marginTop: '24px' } }>
                    <Box >
                    {/* lineHeight="20px" */}
                      { this.state.stepSubtitleList[index] }
                    </Box>
                  </Typography>
                  { this.getStepLabelButton(index) }
                </StepLabel>
              </Step>
              ))
            }
          </Stepper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(stepperStyles)(withTranslation()(WelcomeComponent));
