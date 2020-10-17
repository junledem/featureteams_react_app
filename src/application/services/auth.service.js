import { EndpointConst } from '../common/constants/endpoint.const'
import { LoginModel } from '../models/provider/login.model';
import { SignupModel } from '../models/provider/signup.model';

class AuthService {

  async validateLogin(loginModel: LoginModel) {
    console.log(loginModel);
    return fetch(EndpointConst.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginModel)
    })
    .then((res) => {
      console.log(res);
      return res.json();
    })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error(error, ' Login request error.');
        console.log(error);
    });
    // if (userEmail === 'june' && userPass === '1') {
    //   return Promise.resolve('token');
    // }
    // return Promise.resolve('');
  }

  async register(signupModel: SignupModel) {
    console.log(signupModel);
    const signupBody = this.mapSignModeToRequestBody(signupModel);
    console.log(signupBody);
    console.log(JSON.stringify(signupBody));
    return fetch(EndpointConst.REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signupModel)
    })
    .then((res) => {
      console.log(res);
      return res.json();
    })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error(error, ' Register request error.');
        console.log(error);
    });
  }

  /**
   * [Temporary] Will remove first and last Names and retypePassword from the model.
   * @param {*} signupModel 
   */
  mapSignModeToRequestBody(signupModel: SignupModel) {
    const signupBody = Object.assign(signupModel);
    delete signupBody.firstName;
    delete signupBody.lastName;
    delete signupBody.retypePassword;
    
    return signupBody;
  }
}

export default AuthService;