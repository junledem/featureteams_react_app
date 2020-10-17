import { ResourceGroupFormModel } from "./resource-group-form.model";
import { ResourceGroupEnum } from "../../common/enum/resource-group.enum";

export class TeamFormModel {
  constructor() {
    this.resourceGroupBA = new ResourceGroupFormModel(ResourceGroupEnum.BA);
    this.resourceGroupDev = new ResourceGroupFormModel(ResourceGroupEnum.DEV);
    this.resourceGroupTest = new ResourceGroupFormModel(ResourceGroupEnum.TEST);
    this.resourceGroupSpecialist = new ResourceGroupFormModel(ResourceGroupEnum.SPECIALIST);
    this.error = null;
  }
}