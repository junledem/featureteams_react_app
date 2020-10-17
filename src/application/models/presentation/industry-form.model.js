import { ElementPropertyModel } from "./element-property.model";

export class IndustryFormModel {
    constructor() {
      this.industryCodeName = new ElementPropertyModel(
        { name: 'name', value: 'industryCodeName' },
        { name: 'value', value: '' },
        { name: 'required', value: true },
        { name: 'readOnly', value: false },
        { name: 'error', value: null }
      );
    }
  }