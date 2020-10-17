import { ElementPropertyModel } from "../models/presentation/element-property.model";

export class FormUtil {
  static clearElementValue(element: ElementPropertyModel) {
    if (Array.isArray(element.value)) {
      element.value = [];
    } else {
      element.value = '';
    }
  }
}