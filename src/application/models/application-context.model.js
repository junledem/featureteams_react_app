import { AuthModel } from './auth.model';
import { LoginModel } from './provider/login.model';
import { SignupModel } from './provider/signup.model'
import { ProgressModel } from './progress.model';
import { TeamFormModel } from './presentation/team-form.model';

export class ApplicationContextModel {
  authorization = new AuthModel();
  provider = {
    login: new LoginModel(),
    signup: new SignupModel(),
    configId: ''
  };
  presentation = {
    allResourcesTeam: new TeamFormModel(),
  }
  progress = new ProgressModel();
}