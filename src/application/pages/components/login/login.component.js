import { TextField, Checkbox, Button, FormControlLabel, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { withTranslation } from 'react-i18next';
import './login.component.css';
import SignupComponent from './signup/signup.component';
import '../../../common/css/common.css';
import { TXT_FIELD_STYLE, BTN_THEME_TEAL } from '../../../common/constants/mat-element.const';
import ApplicationContext from '../../../containers/application.context';
import { ElementErrorTypeEnum } from '../../../common/enum/element-error-type.enum';
import { LoginFormModel } from '../../../models/presentation/login-form.model';
import { LoginModel } from '../../../models/provider/login.model';
import AuthService from '../../../services/auth.service';
import { ValidationUtil } from '../../../utilities/validation.util';

class LoginComponent extends React.Component {
  static contextType = ApplicationContext;
  
  constructor(props) {
    super(props);

    this.state = {
      login: new LoginFormModel()
    };
    this.authService = new AuthService();

    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const contextLogin: LoginModel = this.context.provider.login;
    const formLogin = { ...this.state.login };
    formLogin.email.value = contextLogin.email;
    this.setState({
      login: formLogin
    });
  }

  handleLoginClick() {
    const formLogin = { ...this.state.login };
    
    let isValid = ValidationUtil.validate(
      [
        formLogin.email,
        formLogin.password
      ]
    );

    if (isValid) {
      this.authService.validateLogin(this.context.provider.login).then(loginToken => {
        console.log(loginToken);
        const validLogin = loginToken === 'token'
        this.context.authorization.isAuthUser = validLogin;
  
        if (validLogin) {
          formLogin.error = null;
        } else {
          formLogin.error = ElementErrorTypeEnum.INVALID_LOGIN;
        }
        this.setState({
          login: formLogin
        })
  
        if (validLogin) {
          this.props.history.push('/configuration');
        }
      });
    } else {
      this.setState({
        login: formLogin
      })
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const contextLogin = { ...this.context.provider.login };
    contextLogin[target.name] = target.value;
    this.context.provider.login = contextLogin;

    const formLogin = { ...this.state.login };
    formLogin[target.name].value = target.value;

    this.setState({
      login: formLogin
    });
  }

  render() {
    const { t } = this.props;
    const formLogin = { ...this.state.login };

    return (
      <form noValidate autoComplete="off" >{/* autoComplete="off" */}
        <Grid container direction="column" alignItems="center" className="container-login">
          <Grid item sm={ 12 } className="login">
            <Grid container direction="column" justify="center">
              <Grid item sm={ 12 } className="login-header">
                <header>
                  <h1 className="remove-margin">{ t('login.header') }</h1>
                </header>
              </Grid>
              <Grid item sm={ 12 }>
                <Grid container direction="row" justify="center">
                  <Grid item sm={ 5 } span="">
                    <Grid container direction="column" >
                      <Grid item sm={ 12 }>
                        <TextField
                          className="login-field"
                          label={ t('login.textfield.email.label') }
                          inputProps={ {
                            style: TXT_FIELD_STYLE
                          } }
                          name={ formLogin.email.name }
                          onChange={ this.handleInputChange }
                          value={ formLogin.email.value }
                          error={ !!formLogin.email.error }
                          helperText={ formLogin.email.error ?
                            t(`login.textfield.email.helperText.${ formLogin.password.error }`) : '' }
                        />
                      </Grid>
                      <Grid item sm={ 12 }>
                        <TextField
                          className="login-field"
                          type="password"
                          autoComplete="off"
                          label={ t('login.textfield.password.label') }
                          name={ formLogin.password.name }
                          onChange={ this.handleInputChange }
                          value={ formLogin.password.value }
                          error={ !!formLogin.password.error }
                          helperText={ formLogin.password.error ?
                            t(`login.textfield.password.helperText.${ formLogin.password.error }`) : '' }
                        />
                      </Grid>
                      <Grid item sm={ 12 } className="login-show-password">
                        <FormControlLabel
                          control={
                            <Checkbox
                                // checked={state.checkedB}
                                // onChange={handleChange}
                                name={ formLogin.showPassword.name }
                                color="primary"
                            />
                          }
                          label={ t('login.checkbox.showPassword.label') }
                        />
                      </Grid>
                      { formLogin.error ?
                        <Grid item sm={ 12 }>
                          <Alert
                            className=""
                            severity="error">
                            { t('login.helperText.errorLogin') }
                          </Alert>
                      </Grid> : null
                      }
                      <Grid item sm={ 12 }>
                        <Button
                          className="login-button margin-bottom-16"
                          variant="contained"
                          color="primary"
                          onClick={ this.handleLoginClick }>
                          { t('login.button.login.label') }
                        </Button>
                      </Grid>
                      <Grid item sm={ 12 } className="text-align-center">
                        <span className="login-forgot-password">{ t('login.forgotPassword') }</span>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sm={ 1 } className="login-or">
                    <div className="or-design">or</div>
                  </Grid>
                  <Grid item sm={ 5 } className="align-vertical-center">
                    <Grid container direction="column">
                      <Grid item sm={ 12 }>
                        <header className="login-header text-align-center">
                          <h1 className="remove-margin">{ t('login.headerSocial') }</h1>
                        </header>
                      </Grid>
                      <Grid item sm={ 12 }>
                        <Button
                            className="login-button margin-bottom-16"
                            variant="contained"
                            color="primary">
                          { t('login.button.loginLinkedIn.label') }
                        </Button>
                      </Grid>
                      <Grid item sm={ 12 }>
                        <BTN_THEME_TEAL
                          className="login-button"
                          variant="contained"
                          color="primary">
                          { t('login.button.loginXing.label') }
                        </BTN_THEME_TEAL>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <SignupComponent/>
        </Grid>


        {/* <div className="column-full-width-center container">
          
          <div className="row login">
            <div className="column">
              <div className="row login-header">
                <header>
                  <h1 className="remove-margin">{ t('login.loginHeader') }</h1>
                </header>
              </div>
              <div className="row">
                <div className="column-align-center login-details">
                  <TextField
                    className="login-field"
                    label={ t('login.txtFldLoginEmail.label') }
                    inputProps={ {
                      style: TXT_FIELD_STYLE
                    } }
                    name="email"
                    // value= { this.loginData.email }
                    onChange={ this.props.inputOnChange }
                  />
                  <TextField
                      className="login-field"
                      type="password"
                      autoComplete="off"
                      label={ t('login.txtFldLoginPassword.label') }
                  />
                  <div className="login-show-password">
                    <FormControlLabel
                        control={
                          <Checkbox
                              // checked={state.checkedB}
                              // onChange={handleChange}
                              name="showPassword"
                              color="primary"
                          />
                        }
                        label={ t('login.chkBoxLoginShowPassword.label') }
                    />
                  </div>
                  <Button
                      className="login-button margin-bottom-16"
                      variant="contained"
                      color="primary"
                      onClick={ this.loginOnClick }>
                    { t('login.btnLogin.label') }
                  </Button>
                  <span className="login-forgot-password">{ t('login.forgotPassword') }</span>
                </div>
              </div>
            </div>

            <div className="login-or">
              <div className="or-design">or</div>
            </div>

            <div className="column-align-center login-social">
              <div className="row login-header">
                <header className="text-align-center">
                  <h1 className="remove-margin">{ t('login.loginHeaderSocial') }</h1>
                </header>
              </div>
              <div className="row login-social-button-container">
                <div className="column">
                  <Button
                      className="login-button margin-bottom-16"
                      variant="contained"
                      color="primary">
                    { t('login.btnLoginLinkedIn.label') }
                  </Button>
                  
                  <BTN_THEME_TEAL
                      className="login-button"
                      variant="contained"
                      color="primary">
                    { t('login.btnLoginXing.label') }
                  </BTN_THEME_TEAL>
                </div>
              </div>
            </div>
          </div>

          <div className="row signup">
            <div className="column">
              <div className="row login-header">
                <header>
                  <h1 className="remove-margin">{ t('login.signupHeader') }</h1>
                </header>
              </div>
              <div className="row signup-details">
                <div className="column-align-center">
                  <TextField
                      className="login-field"
                      label={ t('login.txtFldFirstName.label') }
                  />
                  <TextField
                      className="login-field"
                      label={ t('login.txtFldLastName.label') }
                  />
                  <TextField
                      className="login-field"
                      label={ t('login.txtFldCompany.label') }
                  />
                  <TextField
                      className="login-field"
                      label={ t('login.txtFldEmail.label') }
                  />
                  <TextField
                      className="login-field"
                      label={ t('login.txtFldPassword.label') }
                  />
                  <TextField
                      className="login-field"
                      label={ t('login.txtFldRetypePassword.label') }
                    />
                  
                  <Button
                      className="login-button margin-top-32"
                      variant="contained"
                      color="primary">
                    { t('login.btnSignup.label') }
                  </Button>
                </div>
              </div>
            </div>

            <div className="login-or">
              <div className="or-design">or</div>
            </div>
            
            <div className="column-align-center login-social">
              <div className="row login-header">
                <header className="text-align-center">
                  <h1 className="remove-margin">{ t('login.loginHeaderSocial') }</h1>
                </header>
              </div>
              <div className="row login-social-button-container">
                <div className="column">
                  <Button
                      className="login-button margin-bottom-16"
                      variant="contained"
                      color="primary">
                    { t('login.btnLoginLinkedIn.label') }
                  </Button>
                  <BTN_THEME_TEAL
                      className="login-button"
                      variant="contained"
                      color="primary">
                    { t('login.btnLoginXing.label') }
                  </BTN_THEME_TEAL>
                </div>
              </div>
            </div>
          </div>

        </div> */}
      </form>
    );
  }
}

export default withTranslation() (LoginComponent);
