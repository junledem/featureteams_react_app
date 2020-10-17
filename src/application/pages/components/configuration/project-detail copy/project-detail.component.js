import { Grid, TextField, Box } from '@material-ui/core';
import React from 'react';
import { withTranslation } from 'react-i18next';
import './project-detail.component.css';
import '../configuration.component.css';
import '../../../../common/css/common.css';
import ApplicationContext from '../../../../containers/application.context';
import { renderPageHeader } from '../../../../common/constants/element-group.const';
import { DATE_FORMAT } from '../../../../common/constants/mat-element.const';
import DatePicker from '../../../../common/mat-elements/date-picker/date-picker';
import { ProjectDetailFormModel } from '../../../../models/presentation/project-detail-form.model';
import FileUploadComponent from '../../../../common/mat-elements/file-upload/file-upload.component';

class ProjectDetailComponent extends React.Component {
  static contextType = ApplicationContext;
  
  constructor(props) {
    super(props);

    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleTextFieldChange(event) {
    const target = event.target;
    const projectDetail: ProjectDetailFormModel = this.props.projectDetail;
    projectDetail[target.name].value = target.value;

    this.props.updateProjectDetail(projectDetail);
  }

  handleStartDateChange(date: DateIOType, value: string) {
    const projectDetail: ProjectDetailFormModel = this.props.projectDetail;
    projectDetail.projectStart.value = value;
    this.props.updateProjectDetail(projectDetail);
  }

  handleEndDateChange(date: DateIOType, value: string) {
    const projectDetail: ProjectDetailFormModel = this.props.projectDetail;
    projectDetail.projectEnd.value = value;
    this.props.updateProjectDetail(projectDetail);
  }

  render() {
    const { t } = this.props;
    const projectDetail: ProjectDetailFormModel = this.props.projectDetail;
    console.log(projectDetail);

    return (
      <Grid container direction="row" spacing={ 3 } justify="center">
        <Grid item sm={ 11 } xs={ 11 }>
          { renderPageHeader(t('configuration.projectDetailHeader'), t('configuration.projectDetailSubHeader')) }
        </Grid>
        <Grid item sm={ 11 } xs={ 11 }>
          <TextField className="textfield"
              name={ projectDetail.projectName.name }
              label={ t('configuration.textfield.projectName.label') }
              InputLabelProps={ {
                shrink: true,
              } }
              value={ projectDetail.projectName.value }
              placeholder={ t('configuration.textfield.projectName.placeHolder') }
              onChange={ this.handleTextFieldChange }
              error={ !!projectDetail.projectName.error }
              helperText={ projectDetail.projectName.error ?
                t(`configuration.textfield.projectName.helperText.${ projectDetail.projectName.error }`) : '' }
          />
        </Grid>
        <Grid item sm={ 11 } xs={ 11 }>
          <Grid container direction="row" spacing={ 2 }>
            <Grid item sm={ 6 } xs={ 6 }>
              <DatePicker
                  fullWidth
                  id={ projectDetail.projectStart.name }
                  label={ t('configuration.textfield.projectStart.label') }
                  InputLabelProps={ {
                    shrink: true,
                  } }
                  placeholder={ t('configuration.textfield.projectStart.placeHolder') }
                  format={ DATE_FORMAT }
                  selectedDate={ projectDetail.projectStart.value }
                  onDateChange={ this.handleStartDateChange }
              />
            </Grid>
            <Grid item sm={ 6 } xs={ 6 }>
              <DatePicker
                  fullWidth
                  id={ projectDetail.projectEnd.name }
                  label={ t('configuration.textfield.projectEnd.label') }
                  InputLabelProps={ {
                    shrink: true,
                  } }
                  placeholder={ t('configuration.textfield.projectEnd.placeHolder') }
                  format={ DATE_FORMAT }
                  selectedDate={ projectDetail.projectEnd.value }
                  onDateChange={ this.handleEndDateChange }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={ 11 } xs={ 11 }>
          <TextField className="textfield"
              name={ projectDetail.workLocation.name }
              label={ t('configuration.textfield.workLocation.label') }
              InputLabelProps={ {
                shrink: true,
              } }
              value={ projectDetail.workLocation.value }
              placeholder={ t('configuration.textfield.workLocation.placeHolder') }
              onChange={ this.handleTextFieldChange }
              error={ !!projectDetail.workLocation.error }
              helperText={ projectDetail.workLocation.error ?
                t(`configuration.textfield.workLocation.helperText.${ projectDetail.workLocation.error }`) : '' }
          />
        </Grid>
        <Grid item sm={ 11 } xs={ 11 }>
          <FileUploadComponent>

          </FileUploadComponent>
        </Grid>
        <Grid item sm={ 11 } xs={ 11 }>
          <Box className="container-description">
            <TextField className="textfield description-field"
                multiline
                variant="outlined"
                name={ projectDetail.projectDescription.name }
                label={ t('configuration.textfield.projectDescription.label') }
                InputLabelProps={ {
                  shrink: true,
                } }
                value={ projectDetail.projectDescription.value }
                rows={ 7 }
                inputProps={ { maxLength: projectDetail.projectDescription.maxLength } }
                placeholder={ t('configuration.textfield.projectDescription.placeHolder') }
                onChange={ this.handleTextFieldChange }
                error={ !!projectDetail.projectDescription.error }
                helperText={ projectDetail.projectDescription.error ?
                  t(`configuration.textfield.projectDescription.helperText.${ projectDetail.projectDescription.error }`)
                    : `${ projectDetail.projectDescription.value.length }/${ projectDetail.projectDescription.maxLength }` }
            />
          </Box>
        </Grid>
      </Grid>
    );
  }
}

export default withTranslation() (ProjectDetailComponent);