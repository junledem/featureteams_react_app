import { ElementPropertyModel } from './element-property.model';

export class LoginFormModel {
  constructor() {
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
    this.showPassword = new ElementPropertyModel(
      { name: 'name', value: 'showPassword' },
      { name: 'value', value: '' },
      { name: 'required', value: false },
      { name: 'readOnly', value: false },
      { name: 'error', value: null }
    );
    this.error = null;
  }
  
}