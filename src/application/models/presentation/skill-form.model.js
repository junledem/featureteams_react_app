import { ElementPropertyModel } from "./element-property.model";

export class SkillFormModel {
    constructor() {
      this.skillCode = new ElementPropertyModel(
        { name: 'name', value: 'skillCode' },
        { name: 'value', value: '' },
        { name: 'required', value: true },
        { name: 'readOnly', value: false },
        { name: 'error', value: null }
      );
      this.skillProficiency = new ElementPropertyModel(
        { name: 'name', value: 'skillProficiency' },
        { name: 'value', value: 0 },
        { name: 'required', value: true },
        { name: 'readOnly', value: false },
        { name: 'error', value: null }
      );
      this.skillSeverity = new ElementPropertyModel(
        { name: 'name', value: 'skillSeverity' },
        { name: 'value', value: 0 },
        { name: 'required', value: true },
        { name: 'readOnly', value: false },
        { name: 'error', value: null }
      );
      this.skillCodeName = new ElementPropertyModel(
        { name: 'name', value: 'skillCodeName' },
        { name: 'value', value: '' },
        { name: 'required', value: true },
        { name: 'readOnly', value: false },
        { name: 'error', value: null }
      );
    }
  }
  