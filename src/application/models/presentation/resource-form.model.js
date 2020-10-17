import { ElementPropertyModel } from './element-property.model';

export class ResourceFormModel {
  constructor() {
    this.resourceId = null;
    this.resourceTypeCode = new ElementPropertyModel(
        { name: 'name', value: 'resourceTypeCode' },
        { name: 'value', value: '' },
        { name: 'required', value: true },
        { name: 'readOnly', value: false },
        { name: 'error', value: null },
        { name: 'options', value: [] }
      );
    this.resourceTypeCodeName = new ElementPropertyModel(
        { name: 'name', value: 'resourceTypeCodeName' },
        { name: 'value', value: '' },
        { name: 'required', value: false },
        { name: 'readOnly', value: false },
        { name: 'error', value: null }
      );
    this.resourceTypeCodeDesc = new ElementPropertyModel(
        { name: 'name', value: 'resourceTypeCodeDesc' },
        { name: 'value', value: '' },
        { name: 'required', value: true },
        { name: 'readOnly', value: false },
        { name: 'error', value: null }
    );
    this.resourceGroupCode = new ElementPropertyModel(
        { name: 'name', value: 'resourceGroupCode' },
        { name: 'value', value: '' },
        { name: 'required', value: true },
        { name: 'readOnly', value: false },
        { name: 'error', value: null }
      );
    this.resourceGroupCodeName = new ElementPropertyModel(
        { name: 'name', value: 'resourceGroupCodeName' },
        { name: 'value', value: '' },
        { name: 'required', value: false },
        { name: 'readOnly', value: false },
        { name: 'error', value: null }
      );
    this.dailyRateMin = new ElementPropertyModel(
        { name: 'name', value: 'dailyRateMin' },
        { name: 'value', value: 900 },
        { name: 'required', value: true },
        { name: 'readOnly', value: false },
        { name: 'error', value: null }
      );
    this.dailyRateMax = new ElementPropertyModel(
        { name: 'name', value: 'dailyRateMax' },
        { name: 'value', value: 1200 },
        { name: 'required', value: true },
        { name: 'readOnly', value: false },
        { name: 'error', value: null }
      );
    this.preSelected = new ElementPropertyModel(
        { name: 'name', value: 'preSelected' },
        { name: 'value', value: false },
        { name: 'required', value: true },
        { name: 'readOnly', value: false },
        { name: 'error', value: null }
      );
    this.industries = new ElementPropertyModel(
        { name: 'name', value: 'industries' },
        { name: 'value', value: [] },
        { name: 'required', value: false },
        { name: 'readOnly', value: false },
        { name: 'error', value: null },
        { name: 'options', value: [] }
      );
    this.skills = new ElementPropertyModel(
        { name: 'name', value: 'skills' },
        { name: 'value', value: [] },
        { name: 'required', value: true },
        { name: 'readOnly', value: false },
        { name: 'error', value: null },
        { name: 'options', value: [] }
      );
    this.error = null;
  }
  
}