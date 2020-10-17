export class ElementPropertyModel {
  constructor(...elements) {
    this.name = '';
    this.value = '';
    this.required = false;
    this.readOnly = false;
    this.regExp = '';
    this.error = null;
    this.options = [];
    this.maxLength = null;

    elements.forEach((elem) => {
      this[elem.name] = elem.value
    });
  }
}