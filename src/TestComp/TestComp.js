import React from 'react';
import './TestComp.css';
import { Button } from '@material-ui/core';
import { Check, Error } from '@material-ui/icons';
import { RoleFormModel } from '../models/presentation/role-form-model'
import { ResponsibilityFormModel } from '../models/presentation/responsibility-form.model';

class TestComp extends React.Component {
  constructor() {
    super();
    this.state = { role: new RoleFormModel() };
    this.state.role.setRoleName("Junior Business Analyst ss");
    this.state.role.setIsReviewed(false);
    let responsibilies = [];
    let responsibility1 = new ResponsibilityFormModel();
    responsibility1.setResponsibilityDesc("Up to 2 years experience");
    responsibilies.push(responsibility1);
    let responsibility2 = new ResponsibilityFormModel();
    responsibility2.setResponsibilityDesc("Experienced in Business Analysis");
    responsibilies.push(responsibility2);
    
    this.state.role.setResponsibilities(responsibilies);
    this.state.responsibilityList = this.state.role.getResponsibilities().map((responsibility) =>
      <li key={ responsibility.getResponsibilityDesc() }> { responsibility.getResponsibilityDesc() } </li>
    );

    console.log(this.state.role);
  }
  render() {
    console.log(this.state.role);
    return (
      <form>
        <div className="role-form">
          <header className="role-header">
            <h1>{ this.state.role.getRoleName() }</h1>
          </header>
          <div>
            <div>
              <ul> { this.state.responsibilityList }
                {/* <li> Up to 2 years experience </li>
                <li> Experienced in Business Analysis </li> */}
              </ul>
            </div>
          </div>
          <div className="role-review-det">
            {
              this.state.role.getIsReviewed() ?
              <Check fontSize="small" className="icon-reviewed"></Check> :
              <Error fontSize="small" className="icon-not-reviewed"></Error>
            }
            <div>
              Not yet reviewed
            </div>
          </div>
          <div className="role-footer">
            <div>
              <Button variant="contained" color="primary" onClick={handleClick}>Click button</Button>
            </div>
            <div>
              <Button variant="contained" color="primary" onClick={handleClick}>Click button</Button>
            </div>
          </div>
        </div>
      </form>
    );
  }
  renderButton() {

  }
}
  
function handleClick() {
  console.log(this.state.role);
  alert("test click " + this.state.role.getRoleName());
}

export default TestComp;
