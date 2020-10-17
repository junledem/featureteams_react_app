import { ElementPropertyModel } from "./element-property.model";

export class FeedbackFormModel {
    constructor() {
      this.supportRequest = new ElementPropertyModel(
        { name: 'name', value: 'supportRequest' },
        { name: 'value', value: false },
        { name: 'options', value: [] },
        { name: 'required', value: true },
        { name: 'readOnly', value: false },
        { name: 'error', value: null }
      );
    }
  }
  