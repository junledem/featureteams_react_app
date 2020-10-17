import { ElementPropertyModel } from './element-property.model';
import { ResourceGroupEnum } from '../../common/enum/resource-group.enum';

export class ResourceGroupFormModel {
  constructor(code: ResourceGroupEnum) {
    this.resourceGroupCode = new ElementPropertyModel(
        { name: 'name', value: 'resourceGroupCode' },
        { name: 'value', value: code },
        { name: 'required', value: true },
        { name: 'readOnly', value: false },
        { name: 'error', value: null }
      );
    this.resources = new ElementPropertyModel(
      { name: 'name', value: 'resources' },
      { name: 'value', value: [] },
      { name: 'required', value: false },
      { name: 'readOnly', value: false },
      { name: 'error', value: null }
    );
    this.error = null;
  }
  
}