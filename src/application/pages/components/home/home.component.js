import { Button, Grid, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import { withTranslation, Trans } from 'react-i18next';
import './home.component.css';
import '../../../common/css/common.css';
import { BTN_THEME_GREEN } from '../../../common/constants/mat-element.const';
import ApplicationContext from '../../../containers/application.context';
import { SignupFormModel } from '../../../models/presentation/signup-form.model';
import AuthService from '../../../services/auth.service';
import MenuIcon from '@material-ui/icons/Menu';
import MeetingComponent from './meeting/meeting.component';
import TeamComponent from './team/team.component';
import WelcomeComponent from './welcome/welcome.component';
import ApplicationService from '../../../services/application.service';
import { ApplicationMapperUtil } from '../../../utilities/application-mapper.util';
import ProgressComponent from '../../../common/components/progress/progress.component';
import { RouteConst } from '../../../common/constants/route.const';

class HomeComponent extends React.Component {
  static contextType = ApplicationContext;
  
  constructor(props) {
    super(props);

    this.state = {
      signup: new SignupFormModel(),
      isLoading: false
    };
    this.authService = new AuthService();
    this.applicationService = new ApplicationService(true);

    this.handleLoginPageClick = this.handleLoginPageClick.bind(this);
  }

  async componentDidMount() {
    await this.getAllResources();
  }

  async getAllResources() {
    this.setState({
      isLoading: true
    });
    await this.applicationService.retrieveAllResources()
    .then( async resources => {
      if (resources) {
        this.context.presentation.allResourcesTeam = await ApplicationMapperUtil.mapTeamToForm(resources);
      }
    })
    .finally(async () => {
      await this.setState({
        isLoading: false
      });
    });
  }

  handleLoginPageClick() {
    this.props.history.push(RouteConst.LOGIN);
  }

  render() {
    const { t } = this.props;

    return (
      <form noValidate >{/* autoComplete="off" */}
        <div className="container-background">
          <ProgressComponent isLoading={ this.state.isLoading } progress={ 100 }/>
          {/* flex-nowrap - should be added because <br/> in translation creates a weird long vertical space that extends the height of this container */}
          <Grid container direction="column" className="container-home flex-nowrap">
            <Grid item>
              {/* , boxShadow: 'none' */}
              <AppBar position="static" className="app-bar">
                <Toolbar>
                  <Grid container direction="row" spacing={ 3 } className="home-navigation" >
                    <Grid item sm={ 2 } xs={ 2 } className="align-vertical-center">
                      <Typography variant="h5" >
                        { t('home.companyTitle') }
                      </Typography>
                    </Grid>
                    <Grid item sm={ 10 } xs={ 10 }>
                      <Grid container direcion="row" justify="flex-end" alignItems="center" spacing={ 3 } >
                        <Grid item>
                          <Button style={ navButtonStyle } color="inherit">{ t('home.button.home.label') }</Button>
                        </Grid>
                        <Grid item>
                          <Button style={ navButtonStyle } color="inherit">{ t('home.button.config.label') }</Button>
                        </Grid>
                        <Grid item>
                          <Button style={ navButtonStyle } color="inherit">{ t('home.button.service.label') }</Button>
                        </Grid>
                        <Grid item>
                          <Button style={ navButtonStyle } color="inherit">{ t('home.button.dashboard.label') }</Button>
                        </Grid>
                        <Grid item>
                          <Button style={ navButtonStyle } color="inherit" onClick={ this.handleLoginPageClick }>{ t('home.button.login.label') }</Button>
                        </Grid>
                        <Grid item>
                          <IconButton edge="start"  color="inherit" aria-label="menu" style={ { fontSize: '10px' } } >
                            <MenuIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Toolbar>
              </AppBar>
            </Grid>
            <Grid item>
              <Grid container direction="row">
                <Grid item sm={ 6 } xs={ 6 } className="container-home-header">
                  <Grid container direction="column">
                    <Grid item className="home-header">
                      <Typography variant="h3">
                        <Trans i18nKey="home.header">
                          Professional<br/><strong>Feature Teams</strong> from<br/>renowned IT Suppliers
                        </Trans>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">
                        <Trans i18nKey="home.subtitle">
                          Two or more people are <strong>always better</strong> than one solving<br/>problems, finishing off difficult tasks and increasing<br/>producitivty. With us you get easy access to <strong>professional<br/>feature teams</strong> from top-tier IT Suppliers.
                        </Trans>
                      </Typography>
                    </Grid>
                    <Grid item className="home-config-button">
                      <BTN_THEME_GREEN
                        variant="contained"
                        color="primary"
                        onClick={ this.handleSignupClick }>
                        { t('home.button.configTeam.label') }
                      </BTN_THEME_GREEN>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sm={ 6 } xs={ 6 }>
                  
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <WelcomeComponent/>
        <MeetingComponent/>
        <TeamComponent history={ this.props.history }/>
      </form>
    );
  }
}

const navButtonStyle = {
  fontSize: '14px',
  textTransform: 'none',
  fontWeight: 'bold'
};

export default withTranslation() (HomeComponent);