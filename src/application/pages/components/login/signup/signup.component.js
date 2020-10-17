import { TextField, Button, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { withTranslation } from 'react-i18next';
import './signup.component.css';
import '../login.component.css';
import { BTN_THEME_TEAL } from '../../../../common/constants/mat-element.const';
import '../../../../common/css/common.css';
import { ElementErrorTypeEnum } from '../../../../common/enum/element-error-type.enum';
import ApplicationContext from '../../../../containers/application.context';
import { SignupFormModel } from '../../../../models/presentation/signup-form.model';
import { SignupModel } from '../../../../models/provider/signup.model';
import AuthService from '../../../../services/auth.service';
import { ValidationUtil } from '../../../../utilities/validation.util';

class SignupComponent extends React.Component {
  static contextType = ApplicationContext;
  
  constructor(props) {
    super(props);

    this.state = {
      signup: new SignupFormModel()
    };
    this.authService = new AuthService();

    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const contextSignup: SignupModel = this.context.provider.signup;
    const formSignup = { ...this.state.signup };
    formSignup.firstName.value = contextSignup.firstName;
    formSignup.lastName.value = contextSignup.lastName;
    formSignup.company.value = contextSignup.company;
    formSignup.email.value = contextSignup.email;

    this.setState({
      signup: formSignup
    });
  }

  handleSignupClick() {
    const formSignup = { ...this.state.signup };
    let isValid = ValidationUtil.validate(
      [
        formSignup.firstName,
        formSignup.lastName,
        formSignup.company,
        formSignup.email,
        formSignup.password,
        formSignup.retypePassword
      ]
    );

    if (isValid) {
      const validPassword = formSignup.password.value === formSignup.retypePassword.value;
      if (validPassword) {
        formSignup.error = null;
      } else {
        formSignup.error = ElementErrorTypeEnum.MISMATCH;
      }
      isValid = validPassword;
    }

    if (isValid) {
      this.context.provider.signup.name = this.context.provider.signup.firstName + ' ' + this.context.provider.signup.lastName;
      this.authService.register(this.context.provider.signup).then(resData => {
        console.log(resData);
      });
    } else {
      this.setState({
        signup: formSignup
      })
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const contextSignup: SignupModel = { ...this.context.provider.signup };
    contextSignup[target.name] = target.value;
    this.context.provider.signup = contextSignup;

    const formSignup = { ...this.state.signup };
    formSignup[target.name].value = target.value;

    this.setState({
      signup: formSignup
    });
  }

  render() {
    const { t } = this.props;
    const formSignup = { ...this.state.signup };
    console.log(formSignup);

    return (
      <Grid item sm={ 12 } className="signup">
        <Grid container direction="column" justify="center" >
          <Grid item sm={ 12 } className="login-header">
            <header>
            <h1 className="remove-margin">{ t('signup.header') }</h1>
            </header>
          </Grid>
          <Grid item sm={ 12 }>
            <Grid container direction="row" justify="center">
              <Grid item sm={ 5 } span="">
                <Grid container direction="column" >
                  <Grid item sm={ 12 }>
                    <TextField
                      className="login-field"
                      label={ t('signup.textfield.firstName.label') }
                      name={ formSignup.firstName.name }
                      value={ formSignup.firstName.value }
                      onChange={ this.handleInputChange }
                      error={ !!formSignup.firstName.error }
                      helperText={ formSignup.firstName.error ?
                        t(`signup.textfield.firstName.helperText.${formSignup.firstName.error}`) : '' }
                    />
                  </Grid>
                  <Grid item sm={ 12 }>
                    <TextField
                      className="login-field"
                      label={ t('signup.textfield.lastName.label') }
                      name={ formSignup.lastName.name }
                      value={ formSignup.lastName.value }
                      onChange={ this.handleInputChange }
                      error={ !!formSignup.lastName.error }
                      helperText={ formSignup.lastName.error ?
                        t(`signup.textfield.lastName.helperText.${formSignup.lastName.error}`) : '' }
                    />
                  </Grid>
                  <Grid item sm={ 12 } className="login-show-password">
                    <TextField
                      className="login-field"
                      label={ t('signup.textfield.company.label') }
                      name={ formSignup.company.name }
                      value={ formSignup.company.value }
                      onChange={ this.handleInputChange }
                      error={ !!formSignup.company.error }
                      helperText={ formSignup.company.error ?
                        t(`signup.textfield.company.helperText.${formSignup.company.error}`) : '' }
                    />
                  </Grid>
                  <Grid item sm={ 12 }>
                    <TextField
                      className="login-field"
                      label={ t('signup.textfield.email.label') }
                      name={ formSignup.email.name }
                      value={ formSignup.email.value }
                      onChange={ this.handleInputChange }
                      error={ !!formSignup.email.error }
                      helperText={ formSignup.email.error ?
                        t(`signup.textfield.email.helperText.${formSignup.email.error}`) : '' }
                    />
                  </Grid>
                  <Grid item sm={ 12 }>
                    <TextField
                      className="login-field"
                      label={ t('signup.textfield.password.label') }
                      type="password"
                      autoComplete="off"
                      name={ formSignup.password.name }
                      value={ formSignup.password.value }
                      onChange={ this.handleInputChange }
                      error={ !!formSignup.password.error }
                      helperText={ formSignup.password.error ?
                        t(`signup.textfield.password.helperText.${formSignup.password.error}`) : '' }
                    />
                  </Grid>
                  <Grid item sm={ 12 }>
                    <TextField
                      className="login-field"
                      label={ t('signup.textfield.retypePassword.label') }
                      type="password"
                      autoComplete="off"
                      name={ formSignup.retypePassword.name }
                      value={ formSignup.retypePassword.value }
                      onChange={ this.handleInputChange }
                      error={ !!formSignup.retypePassword.error }
                      helperText={ formSignup.retypePassword.error ?
                        t(`signup.textfield.retypePassword.helperText.${ formSignup.retypePassword.error }`) : '' }
                    />
                  </Grid>
                  { formSignup.error ?
                    <Grid item sm={ 12 }>
                      <Alert
                        className=""
                        severity="error">
                        { t(`signup.helperText.${ formSignup.error }`) }
                      </Alert>
                  </Grid> : null
                  }
                  <Grid item sm={ 12 } className="margin-bottom-24">
                    <Button
                      className="login-button margin-top-32"
                      variant="contained"
                      color="primary"
                      onClick={ this.handleSignupClick }>
                      { t('signup.button.signup.label') }
                    </Button>
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
                      <h1 className="remove-margin">{ t('signup.headerSocial') }</h1>
                    </header>
                  </Grid>
                  <Grid item sm={ 12 }>
                    <Button
                        className="login-button margin-bottom-16"
                        variant="contained"
                        color="primary">
                      { t('signup.button.signupLinkedIn.label') }
                    </Button>
                  </Grid>
                  <Grid item sm={ 12 }>
                    <BTN_THEME_TEAL
                      className="login-button"
                      variant="contained"
                      color="primary">
                      { t('signup.button.signupXing.label') }
                    </BTN_THEME_TEAL>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withTranslation() (SignupComponent);
