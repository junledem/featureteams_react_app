import { Model } from 'react-axiom';
import { ResponsibilityFormModel } from './responsibility-form.model'
import { RoleTypeEnum } from '../../common/constants/role-type.enum';

export class RoleFormModel extends Model {
  static defaultState() {
    return {
      roleId: null,
      roleType: RoleTypeEnum,
      roleName: 'testName',
      responsibilities: [new ResponsibilityFormModel()],
      isReviewed: false
            
    }
  }

  setRoleType(roleType) {
    this.state.roleType = roleType;
  }

  getRoleType() {
    return this.state.roleType;
  }
  
  setRoleName(roleName) {
    this.state.roleName = roleName;
  }

  getRoleName() {
    return this.state.roleName;
  }

  setResponsibilities(responsibilities) {
    this.state.responsibilities = responsibilities
  }

  getResponsibilities() {
    return this.state.responsibilities;
  }

  setIsReviewed(isReviewed) {
    this.state.isReviewed = isReviewed;
  }

  getIsReviewed() {
    return this.state.isReviewed;
  }
}