export class ResourceConfigurationModel {
  constructor() {
    this.resourceId = 0;
    this.resourceTypeCode = '';
    this.resourceTypeCodeName = '';
    this.resourceTypeCodeDesc = '';
    this.resourceGroupCode = '';
    this.resourceGroupCodeName = '';
    this.industries = [];
    this.skills = [];
    this.dailyRateMin = 0;
    this.dailyRateMax = 0;
    this.preSelected = false;
    this.requestedAt = null;
    this.requestorId = '';
    this.configStage = 0;
    this.providerResponses = 0;
  }
}