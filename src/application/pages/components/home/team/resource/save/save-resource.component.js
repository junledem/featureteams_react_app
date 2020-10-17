import { Grid, Typography, Box, FormControl, RadioGroup, FormControlLabel, Radio, TextField, Avatar, Chip, FormHelperText, Checkbox } from '@material-ui/core';
//Button
import { Label, CancelOutlined, LabelImportant } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import { withTranslation } from 'react-i18next';
import './save-resource.component.css';
import '../../../../../../common/css/common.css';
import ApplicationContext from '../../../../../../containers/application.context';
import { ObjectUtil } from '../../../../../../utilities/object.util';
import { ElementOptionModel } from '../../../../../../models/presentation/element-option.model';
import { renderSkillHeader } from '../../../../../../common/constants/element-group.const';
import { RATING_SKILL, STANDARD_COLOR_SKY_BLUE } from '../../../../../../common/constants/mat-element.const';
import { SkillFormModel } from '../../../../../../models/presentation/skill-form.model';
import ProgressComponent from '../../../../../../common/components/progress/progress.component';
import { ResourceGroupEnum } from '../../../../../../common/enum/resource-group.enum';
import { ResourceFormModel } from '../../../../../../models/presentation/resource-form.model';

const ELEMENT = {
  SKILL: {
    RATING_NAME: 'rating-skill_',
    CODE_NAME: 'chip-skill_',
    PRIORITY_BUTTON: 'btn-make-priority_',
    PRIORITY_CHECKBOX: 'chkbox-make-priority_'
  }
};

// const skillPrioButtonStyle = {
//   fontSize: '10px',
//   fontWeight: 'bold',
//   textTransform: 'none',
//   marginLeft: '16px'
// };

class SaveResourceComponent extends React.Component {
  static contextType = ApplicationContext;
  
  constructor(props) {
    super(props);

    this.state = {
      selectedSkillOptions: [],
      allResourcesByGroup: []
    };

    this.getTranslatedValue = this.getTranslatedValue.bind(this);
    this.getAllResourcesByGroup = this.getAllResourcesByGroup.bind(this);
    this.getResourceTypeOption = this.getResourceTypeOption.bind(this);
    this.handleResourceTypeChange = this.handleResourceTypeChange.bind(this);
    this.getSkillOption = this.getSkillOption.bind(this);
    this.handleSkillChange = this.handleSkillChange.bind(this);
    this.handleSkillDelete = this.handleSkillDelete.bind(this);
    this.handleSkillProficiencyChange = this.handleSkillProficiencyChange.bind(this);
    this.handleMakeSkillPriorityClick = this.handleMakeSkillPriorityClick.bind(this);
    this.handleSkillPriorityChange = this.handleSkillPriorityChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  getTranslatedValue(key: sting): string {
    return this.props.t(key);
  }

  async componentDidMount() {
    await this.getAllResourcesByGroup();
    const formResource: ResourceFormModel = this.props.resource;
    formResource.resourceTypeCode.options = ObjectUtil.sortBy(this.getResourceTypeOption(), 'label');;
    formResource.skills.options = ObjectUtil.sortBy(this.getSkillOption(), 'label');
    const selectedSkillOptions = formResource.skills.value.map((skillValue) => {
      return formResource.skills.options.find(skillOption => skillOption.value === skillValue.skillCode.value);
    });

    this.setState({
      selectedSkillOptions: selectedSkillOptions
    })
    this.props.setResource(formResource);
  }

  async getAllResourcesByGroup() {
    const allResourcesTeam: TeamFormModel = this.context.presentation.allResourcesTeam;

    let resources = [];
    switch(this.props.resource.resourceGroupCode.value) {
      case ResourceGroupEnum.BA:
        resources = allResourcesTeam.resourceGroupBA.resources.value;
        break;
      case ResourceGroupEnum.DEV:
        resources = allResourcesTeam.resourceGroupDev.resources.value;
        break;
      case ResourceGroupEnum.TEST:
        resources = allResourcesTeam.resourceGroupTest.resources.value;
        break;
      case ResourceGroupEnum.SPECIALIST:
        resources = allResourcesTeam.resourceGroupSpecialist.resources.value;
        break;
      default:
        break;
    };

    await this.setState({
      allResourcesByGroup: resources
    });
  }

  getResourceTypeOption(): ElementOptionModel[] {
    let resources = [];
    resources = ObjectUtil.removeDuplicate(this.state.allResourcesByGroup, 'resourceTypeCode');
    resources = resources.map((resource) =>
      new ElementOptionModel(resource.resourceTypeCode.value, this.getTranslatedValue(`team.resourceType.${ resource.resourceTypeCode.value }`)));
      //new ElementOptionModel(resource.resourceTypeCode.value, t(`team.resourceType.${ resource.resourceTypeCode.value }`)));

    return resources;
  }

  getSkillOption(): ElementOptionModel[] {
    let skills = [];
    if (this.state.allResourcesByGroup) {
      this.state.allResourcesByGroup.forEach((resource) => {
        skills = [
          ...skills,
          ...resource.skills.value.map(skill => new ElementOptionModel(skill.skillCode.value, skill.skillCode.value)) || []
        ];
      });
      skills = ObjectUtil.removeDuplicate(skills, 'value');
    }
    return skills;
  }

  handleResourceTypeChange(event) {
    const formResource = this.props.resource;
    formResource.resourceTypeCode.value = event.target.value;
    formResource.resourceTypeCode.error = null;

    this.props.setResource(formResource);
  }

  handleSkillChange(event, skillOptionValues: ElementOptionModel[]) {
    const formResource = this.props.resource;
    formResource.skills.value = skillOptionValues.map((optionValue, index) => {
      const skill = new SkillFormModel();
      const selectedSkill = formResource.skills.value.find(selectedSkill => selectedSkill.skillCode.value === optionValue.value);
      const selectedSkillProf = selectedSkill ? selectedSkill.skillProficiency.value : 0 ;
      skill.skillCode.value = optionValue.value;
      skill.skillCodeName.value = optionValue.label;
      skill.skillProficiency.value = selectedSkillProf;
      // skill.skillSeverity.value = index + 1;
      return skill;
    });

    this.props.setResource(formResource);
    this.setState({
      selectedSkillOptions: skillOptionValues
    });

    this.props.setResource(formResource);
  }

  handleSkillDelete(event) {
    const skillCode = event.currentTarget.dataset.code;
    const selectedSkillOptions = this.state.selectedSkillOptions.filter(skillOption => skillOption.value !== skillCode);
    // let priority = 1;
    const formResource = this.props.resource;
    formResource.skills.value = formResource.skills.value.filter(selectedSkill => {
      // if (selectedSkill.skillCode.value !== skillCode) {
      //   selectedSkill.skillSeverity.value = priority;
      //   priority++;
      // }
      return selectedSkill.skillCode.value !== skillCode;
    });

    this.props.setResource(formResource);
    this.setState({
      selectedSkillOptions: selectedSkillOptions
    });
  }

  handleSkillProficiencyChange(event, newVal) {
    const elemProfName = event.target.name;
    const index = parseInt(elemProfName.substr(elemProfName.length - 1, 1));
    const formResource = this.props.resource;
    formResource.skills.value[index].skillProficiency.value = newVal;

    this.props.setResource(formResource);
  }

  getPriorityColor(priority: number): string {
    switch(priority) {
      case 1:
        return '#1ca450';
      case 2:
        return '#84d538';
      case 3:
        return '#ded741';
      case 4:
        return '#f9b32f';
      case 5:
        return '#f57919';
      default:
        return 'inherit';
    }
  }

  handleMakeSkillPriorityClick(event) {
    const skillCode = event.currentTarget.dataset.code;
    let priority = 2;
    let prioritySkill = new SkillFormModel();
    const formResource = this.props.resource;
    formResource.skills.value = formResource.skills.value.filter(selectedSkill => {
      if (selectedSkill.skillCode.value !== skillCode) {
        selectedSkill.skillSeverity.value = priority;
        priority++;
      } else {
        prioritySkill = selectedSkill;
      }
      return selectedSkill.skillCode.value !== skillCode;
    });
    prioritySkill.skillSeverity.value = 1;
    formResource.skills.value = [ prioritySkill, ...formResource.skills.value ];

    this.props.setResource(formResource);
  }

  handleSkillPriorityChange(event, value) {
    const target = event.target;
    const indexPosition = target.name.lastIndexOf('_') + 1;
    const skillIndex = target.name.substring(indexPosition);
    const formResource = this.props.resource;
    formResource.skills.value[skillIndex].skillSeverity.value = value ? 1 : 0;

    this.props.setResource(formResource);
  }

  handleInputChange(event) {
    const target = event.target;
    const formResource = this.props.resource;
    formResource[target.name].value = target.value;

    this.props.setResource(formResource);
  }

  render() {
    const { t } = this.props;
    const formResource = this.props.resource;

    return (
      <form>
        <Grid container direction="row" className="container-save-resource">
          <Grid item sm={ 12 } xs={ 12 } className="grid-item">
          <ProgressComponent isLoading={ this.props.isLoadingSaveResource } progress={ 100 }/>
            <FormControl component="fieldset" className="container-resource-type">
              {/* <FormLabel component="legend">BA</FormLabel> */}
              <RadioGroup row
                  name="resourceGroup"
                  value={ formResource.resourceTypeCode.value }
                  onChange={ this.handleResourceTypeChange }>
                <Grid container direction="row">
                  {
                    formResource.resourceTypeCode.options.map((option, index) =>
                      <Grid item key={ index } sm={ 6 } xs={ 6 }>
                        <FormControlLabel value={ option.value }
                            control={ <Radio color="primary"
                            style={ { color: STANDARD_COLOR_SKY_BLUE } } /> }
                            label={ option.label } />
                      </Grid>
                    )
                  }
                </Grid>
              </RadioGroup>
              <FormHelperText className="helper-text">
                { !!formResource.resourceTypeCode.error ?
                  t(`team.radio.resourceType.helperText.${ formResource.resourceTypeCode.error }`) : '' }
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item sm={ 12 } xs={ 12 } className="grid-item">
            <Typography variant="subtitle1" style={ { fontWeight: 'bold' } }>
              <Box>
                { t('team.roleDescription') }
              </Box>
            </Typography>
            <TextField className="resource-field"
                variant="outlined"
                name={ formResource.resourceTypeCodeDesc.name }
                value={ formResource.resourceTypeCodeDesc.value }
                disabled={ !!!formResource.resourceTypeCode.value }
                placeholder={ formResource.resourceTypeCode.value ? '' : t('team.textfield.roleDesc.placeHolder') }
                onChange={ this.handleInputChange }
                error={ !!formResource.resourceTypeCodeDesc.error }
                helperText={ formResource.resourceTypeCodeDesc.error ?
                  t(`team.textfield.roleDesc.helperText.${ formResource.resourceTypeCodeDesc.error }`) : '' }
            />
          </Grid>
          <Grid item sm={ 12 } xs={ 12 }>
            <Autocomplete
                multiple
                value={ this.state.selectedSkillOptions }
                options={ formResource.skills.options }
                getOptionLabel={ (option) => option.label }
                id="skill-options"
                filterSelectedOptions
                renderInput={ (params) =>
                  <TextField { ...params }
                      placeholder={ t('team.textfield.skillValues.placeHolder') }
                      margin="normal" >
                  </TextField>
                }
                onChange={ this.handleSkillChange }
                renderTags={ () => null }
                disableClearable
            />
            <FormHelperText className="helper-text">
                { !!formResource.skills.error ?
                  t(`team.textfield.skillValues.helperText.${ formResource.skills.error }`) : '' }
              </FormHelperText>
          </Grid>
          <Grid item  sm={ 4 } xs={ 4 }>
            {
              renderSkillHeader(t('team.skillHeaders.name'))
            }
          </Grid>
          <Grid item  sm={ 4 } xs={ 4 }>
            {
              renderSkillHeader(t('team.skillHeaders.proficiency'))
            }
          </Grid>
          <Grid item  sm={ 4 } xs={ 4 }>
            {
              renderSkillHeader(t('team.skillHeaders.priority'))
            }
          </Grid>
          <Grid item sm={ 12 } xs={ 12 }>
            <Grid container direction="row" alignItems="center">
              {
                formResource.skills.value.map((skill, index) =>
                  <React.Fragment key={ index }>
                    <Grid item sm={ 4 } xs={ 4 } className="item-skill">
                      <Chip
                          id={ `${ ELEMENT.SKILL.CODE_NAME }${ index }` }
                          variant="outlined"
                          color="primary"
                          size="small"
                          // style={ { backgroundColor: STANDARD_COLOR_SKY_BLUE } }
                          avatar={ <Avatar>S</Avatar> }
                          label={ skill.skillCodeName.value }
                          onDelete={ this.handleSkillDelete }
                          deleteIcon={
                            <CancelOutlined data-code={ skill.skillCode.value }
                                // style={ { color: STANDARD_COLOR_SKY_BLUE } }
                                onClick={ this.handleSkillDelete } />
                          }
                      />
                    </Grid>
                    <Grid item sm={ 4 } xs={ 4 } className="item-skill">
                      <RATING_SKILL
                          name={ `${ ELEMENT.SKILL.RATING_NAME }${ index }` }
                          icon={ <Label fontSize="inherit" /> }
                          // defaultValue={ skill.skillProficiency.value }
                          value={ skill.skillProficiency.value }
                          onChange={ this.handleSkillProficiencyChange }
                      />
                    </Grid>
                    <Grid item sm={ 4 } xs={ 4 } className="align-vertical-center item-skill">
                      <LabelImportant style={ { color: this.getPriorityColor(skill.skillSeverity.value) } } />
                      {/* <Button variant="outlined"
                          name={ `${ ELEMENT.SKILL.PRIORITY_BUTTON }${ index }` }
                          data-code={ skill.skillCode.value } 
                          size="small" color="primary"
                          style={ { ...skillPrioButtonStyle } }
                          onClick={ this.handleMakeSkillPriorityClick }
                          className={ index === 0 ? 'hide-button' : '' } >
                        { t('team.button.makeSkillPriority.label') }
                      </Button> */}
                      <Checkbox
                          name={ `${ ELEMENT.SKILL.PRIORITY_CHECKBOX }${ index }` }
                          checked={ skill.skillSeverity.value === 1 ? true : false }
                          onChange={ this.handleSkillPriorityChange }
                          color="primary"
                      />
                    </Grid>
                  </React.Fragment>
                )
              }
            </Grid>
          </Grid>
          
        </Grid>
      </form>
    );
  }
}

export default withTranslation() (SaveResourceComponent);
