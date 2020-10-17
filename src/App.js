import React from 'react';
import { Router } from 'react-router-dom';
// import { withTranslation } from 'react-i18next'; //, Trans
// import LoginComponent from './application/pages/components/login/login.component';
// import TeamComponent from './application/team/team.component';
import './App.css';
import  ApplicationContext from './application/containers/application.context';
import Routes from './application/pages/routes/routes';
import ApplicationService from './application/services/application.service';
import history from './application/services/history.service';
// import { ObjectUtil } from './application/utility/ObjectUtil';

class App extends React.Component {
  static contextType = ApplicationContext;

  constructor(props) {
    super(props);

    // this.state = {
    //   value: 'ch'
    // }

    this.handleInputChange = this.handleInputChange.bind(this);

    this.applicationService = new ApplicationService();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    //this.getResources();
  }

  getResources() {
    this.applicationService.retrieveResource().then(resources => {
      this.setState({ resources: resources })
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const loginData = { ...this.state.login };
    loginData.email = target.value;
    
    this.setState({
      login: loginData
    });

  }

  render() {
    //history.push('/login');
    console.log(this.context);

    return (
      // <ApplicationContext.Provider value={ this.context }>
        <Router history={ history }>
          <Routes />
        </Router>
      // </ApplicationContext.Provider>
    );
    
    // return ObjectUtil.isEmpty(this.state, ['login']) ?
    //   (
    //     <div className="App">
    //       Loading...
    //     </div>
    //   ) :
    //   (
    //     <div className="App">
    //       <LoginComponent loginData={ this.state.login } inputOnChange={ this.handleInputChange } />
          
    //       {/* <TeamComponent/> */}

    //       {/* <div>{ this.renderRadioButtons() }</div> */}
          
    //       {/* <div>
    //         <Trans>paragraph</Trans>
    //       </div>
    //       <div>{t('author.title')}</div>
    //       <div><Trans>author.title</Trans></div>
    //       <div>{t('paragraph')}</div> */}
    //     </div>
    //   );
  }
  
}

// export default withTranslation() (App);
export default App;
