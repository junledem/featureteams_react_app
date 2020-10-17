import { Model } from 'react-axiom';

export class ResponsibilityFormModel extends Model {
  static defaultState() {
    return {
      responsibilityId: null,
      responsibilityDesc: ''
    }
  }

  setResponsibilityDesc(responsibilityDesc) {
    this.state.responsibilityDesc = responsibilityDesc;
  }

  getResponsibilityDesc() {
    return this.state.responsibilityDesc;
  }
}