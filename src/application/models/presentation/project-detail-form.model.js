import { ElementPropertyModel } from "./element-property.model";

export class ProjectDetailFormModel {
    constructor() {
      this.projectName = new ElementPropertyModel(
        { name: 'name', value: 'projectName' },
        { name: 'value', value: '' },
        { name: 'required', value: true },
        { name: 'readOnly', value: false },
        { name: 'error', value: null }
      );
      this.projectStart = new ElementPropertyModel(
        { name: 'name', value: 'projectStart' },
        { name: 'value', value: null },
        { name: 'required', value: true },
        { name: 'readOnly', value: false },
        { name: 'error', value: null }
      );
      this.projectEnd = new ElementPropertyModel(
        { name: 'name', value: 'projectEnd' },
        { name: 'value', value: null },
        { name: 'required', value: true },
        { name: 'readOnly', value: false },
        { name: 'error', value: null }
      );
      this.workLocation = new ElementPropertyModel(
        { name: 'name', value: 'workLocation' },
        { name: 'value', value: '' },
        { name: 'required', value: true },
        { name: 'readOnly', value: false },
        { name: 'error', value: null }
      );
      this.documents = new ElementPropertyModel(
        { name: 'name', value: 'documents' },
        { name: 'value', value: [] },
        { name: 'required', value: true },
        { name: 'readOnly', value: false },
        { name: 'error', value: null }
      );
      this.projectDescription = new ElementPropertyModel(
        { name: 'name', value: 'projectDescription' },
        { name: 'value', value: '' },
        { name: 'required', value: true },
        { name: 'readOnly', value: false },
        { name: 'error', value: null },
        { name: 'maxLength', value: 1000 }
      );
    }
  }
  