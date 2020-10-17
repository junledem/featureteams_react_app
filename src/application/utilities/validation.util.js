import { ElementErrorTypeEnum } from '../common/enum/element-error-type.enum';
import { ElementPropertyModel } from '../models/presentation/element-property.model';

export class ValidationUtil {
  static validate(elements: ElementPropertyModel[]): boolean {
    let isValid = true;
    elements.forEach((element) => {
      if (element.required) {
        let validValue = true;
        if (Array.isArray(element.value)) {
          validValue = element.value.length > 0;
        } else {
          validValue = element.value.trim() !== '';
        }
        this.validateElement(validValue, element, ElementErrorTypeEnum.REQUIRED);
        if (isValid) {
          isValid = validValue;
        }
      }
    });

    return isValid;
  }

  static validateElement(isValid: boolean, element: ElementPropertyModel, errorType: ElementErrorTypeEnum) {
    if (isValid) {
      element.error = null;
    } else {
      element.error = errorType;
    }
  }
}