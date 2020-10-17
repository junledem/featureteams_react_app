import { ElementPropertyModel } from './element-property.model';

export class SignupFormModel {
  constructor() {
    this.firstName = new ElementPropertyModel(
      { name: 'name', value: 'firstName' },
      { name: 'value', value: '' },
      { name: 'required', value: true },
      { name: 'readOnly', value: false },
      { name: 'error', value: null }
    );
    this.lastName = new ElementPropertyModel(
      { name: 'name', value: 'lastName' },
      { name: 'value', value: '' },
      { name: 'required', value: true },
      { name: 'readOnly', value: false },
      { name: 'error', value: null }
    );
    this.company = new ElementPropertyModel(
      { name: 'name', value: 'company' },
      { name: 'value', value: '' },
      { name: 'required', value: true },
      { name: 'readOnly', value: false },
      { name: 'error', value: null }
    );
    this.email = new ElementPropertyModel(
      { name: 'name', value: 'email' },
      { name: 'value', value: '' },
      { name: 'required', value: true },
      { name: 'readOnly', value: false },
      { name: 'error', value: null }
    );
    this.password = new ElementPropertyModel(
      { name: 'name', value: 'password' },
      { name: 'value', value: '' },
      { name: 'required', value: true },
      { name: 'readOnly', value: false },
      { name: 'error', value: null }
    );
    this.retypePassword = new ElementPropertyModel(
      { name: 'name', value: 'retypePassword' },
      { name: 'value', value: '' },
      { name: 'required', value: true },
      { name: 'readOnly', value: false },
      { name: 'error', value: null }
    );
    this.error = null;
  }
}