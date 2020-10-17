export class ResourceModel {
  constructor() {
    this._id = '';
    this.resourceTypeCode = '';
    this.resourceTypeCodeName = '';
    this.resourceTypeCodeDesc = '';
    this.resourceGroupCode = '';
    this.rescourceGroupCodeName = '';
    this.industries = [];
    this.skills = [];
    this.dailyRateMin = 0;
    this.dailyRateMax = 0;
    this.preSelected = false;
    this.resourceId = 0;
  }
}
  