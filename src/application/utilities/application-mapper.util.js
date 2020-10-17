import { TeamFormModel } from '../models/presentation/team-form.model';
import { ResourceModel } from '../models/provider/resource.model';
import { ResourceGroupEnum } from '../common/enum/resource-group.enum';
import { ResourceFormModel } from '../models/presentation/resource-form.model';
import { IndustryModel } from '../models/provider/industry.model';
import { IndustryFormModel } from '../models/presentation/industry-form.model';
import { SkillModel } from '../models/provider/skill.model';
import { SkillFormModel } from '../models/presentation/skill-form.model';
import { ResourceConfigurationModel } from '../models/provider/resource-configuration.model';

export class ApplicationMapperUtil {
  static mapTeamToForm(resources: ResourceModel[]): TeamFormModel {
    const formTeam = new TeamFormModel();
    formTeam.resourceGroupBA.resources.value = this.mapResourceToForm(resources, ResourceGroupEnum.BA);
    formTeam.resourceGroupDev.resources.value = this.mapResourceToForm(resources, ResourceGroupEnum.DEV);
    formTeam.resourceGroupTest.resources.value = this.mapResourceToForm(resources, ResourceGroupEnum.TEST);
    formTeam.resourceGroupSpecialist.resources.value = this.mapResourceToForm(resources, ResourceGroupEnum.SPECIALIST);
    return formTeam;
  }

  static mapResourceToForm(resources: ResourceModel[], resourceGroup: ResourceGroupEnum): ResourceFormModel[] {
    return resources.map((resource) => {
      if (resource.resourceGroupCode === resourceGroup) { // && resource.preSelected
        const formResource = new ResourceFormModel();
        formResource.resourceId = resource.resourceId;
        formResource.resourceTypeCode.value = resource.resourceTypeCode;
        formResource.resourceTypeCodeName.value = resource.resourceTypeCodeName;
        formResource.resourceTypeCodeDesc.value = resource.resourceTypeCodeDesc;
        formResource.resourceGroupCode.value = resource.resourceGroupCode;
        formResource.resourceGroupCodeName.value = resource.resourceGroupCodeName;
        formResource.dailyRateMin.value = resource.dailyRateMin;
        formResource.dailyRateMax.value = resource.dailyRateMax;
        formResource.preSelected.value = resource.preSelected;
        formResource.industries.value = this.mapIndustryToForm(resource.industries);
        formResource.skills.value = this.mapSkillToForm(resource.skills);
        return formResource;
      } else {
          return null;
      }
    }).filter(resource => resource !== null);
  }

  static mapIndustryToForm(industries: IndustryModel[]): IndustryFormModel[] {
    return industries.map((industry) => {
      const formIndustry = new IndustryFormModel();
      formIndustry.industryCodeName.value = industry.industryCodeName;
      return formIndustry;
    }).filter((industry) => {
      return industry.industryCodeName.value;
    }) || [];
  }

  static mapSkillToForm(skills: SkillModel[]): SkillFormModel[] {
    return skills.map((skill) => {
      const formSkill = new SkillFormModel();
      formSkill.skillCode.value = skill.skillCode;
      formSkill.skillProficiency.value = skill.skillProficiency;
      formSkill.skillSeverity.value = skill.skillSeverity;
      formSkill.skillCodeName.value = skill.skillCodeName;
      return formSkill;
    }).filter((skill) => {
      return skill.skillCode.value;
    }) || [];
  }

  static mapResourceToProvider(formResource: ResourceFormModel): ResourceConfigurationModel {
    const resource = new ResourceConfigurationModel();
    resource.resourceTypeCode = formResource.resourceTypeCode.value;
    resource.resourceTypeCodeName = formResource.resourceTypeCodeName.value;
    resource.resourceTypeCodeDesc = formResource.resourceTypeCodeDesc.value;
    resource.resourceGroupCode = formResource.resourceGroupCode.value;
    resource.resourceGroupCodeName = formResource.resourceGroupCodeName.value;
    resource.industries = this.mapIndustryToProvider(formResource.industries.value);
    resource.skills = this.mapSkillToProvider(formResource.skills.value);
    resource.dailyRateMin = formResource.dailyRateMin.value;
    resource.dailyRateMax = formResource.dailyRateMax.value;
    resource.preSelected = formResource.preSelected.value;
    return resource;
  }

  static mapIndustryToProvider(formIndustries: IndustryFormModel[]): IndustryModel[] {
    return formIndustries.map((formIndustry) => {
      const industry = new IndustryModel();
      industry.industryCodeName = formIndustry.industryCodeName.value;
      return industry;
    }).filter((industry) => {
      return industry.industryCodeName;
    }) || [];
  }

  static mapSkillToProvider(formSkills: SkillFormModel[]): SkillModel[] {
    return formSkills.map((formSkill) => {
      const skill = new SkillModel();
      skill.skillCode = formSkill.skillCode.value;
      skill.skillProficiency = formSkill.skillProficiency.value;
      skill.skillSeverity = formSkill.skillSeverity.value;
      skill.skillCodeName = formSkill.skillCodeName.value;
      return skill;
    }).filter((skill) => {
      return skill.skillCode;
    }) || [];
  }
}