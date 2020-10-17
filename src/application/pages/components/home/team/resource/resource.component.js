import { Grid, Typography, Paper, Box, Button } from '@material-ui/core';
import { ChevronRight, PersonOutline } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import { withTranslation } from 'react-i18next';
import './resource.component.css';
import { TYPOGRAPHY_STYLE } from '../../../../../common/constants/mat-element.const';
import '../../../../../common/css/common.css';
import ApplicationContext from '../../../../../containers/application.context';
import { ResourceFormModel } from '../../../../../models/presentation/resource-form.model';
import { SkillFormModel } from '../../../../../models/presentation/skill-form.model';
import { ConfirmDialog } from '../../../../../common/constants/element-group.const';

class ResourceComponent extends React.Component {
  static contextType = ApplicationContext;
  
  constructor(props) {
    super(props);

    this.state = {
      openRemoveResourceDialog: false
    };

    this.renderSkillList = this.renderSkillList.bind(this);
    this.handleRemoveResource = this.handleRemoveResource.bind(this);
    this.handleRemoveResourceDialogConfirm = this.handleRemoveResourceDialogConfirm.bind(this);
    this.handleRemoveResourceDialogClose = this.handleRemoveResourceDialogClose.bind(this);
    this.handleEditResource = this.handleEditResource.bind(this);
  }

  componentDidMount() {
    // Add
  }

  renderSkillList(skills: SkillFormModel[]) {
    return (
      <Grid item>        
        {
          skills.map((skill, index) =>
            index <= 2 ?
            <Grid key={ index } container direction="row" style={ { paddingLeft: '4px' } }>
              <Grid item sm={ 1 } xs={ 1 }>
                <ChevronRight style={ { fontSize: '16px' } } />
              </Grid>
              <Grid item sm={ 11 } xs={ 11 }>
                <Typography variant="subtitle2" noWrap={ false } style={ { ...TYPOGRAPHY_STYLE } }>
                  <Box>
                    { skill.skillCodeName.value }
                  </Box>
                </Typography>
              </Grid>
            </Grid> : null
          ).filter(skill => skill !== null)
        }
      </Grid>
    )
  }

  handleRemoveResource() {
    this.setState({
      openRemoveResourceDialog: true
    });
  }

  handleRemoveResourceDialogConfirm() {
    const resource = JSON.parse(JSON.stringify(this.props.resource));
    this.props.setResource(resource);
    this.props.onRemoveResource(this.handleRemoveResourceDialogClose);
  }

  handleRemoveResourceDialogClose() {
    this.setState({
      openRemoveResourceDialog: false
    });
  }

  handleEditResource() {
    /* Create a new/deep copy of the edited resource */
    const resource = JSON.parse(JSON.stringify(this.props.resource));
    this.props.setResource(resource);
    this.props.onEditResource();
  }

  render() {
    const { t } = this.props;
    const formResource: ResourceFormModel = { ...this.props.resource };
    
    return (
      <Paper elevation={ 3 }>
        <Grid container direction="column" className="container-resource">
          <Grid item>
            <Grid container direction="column" className="resource-details">
              <Grid item>
                <Grid container direction="row">
                  <Grid item sm={ 9 } xs={ 7 }>
                    <Typography variant="h6" className="resource-header" style={ { ...TYPOGRAPHY_STYLE } }>
                      <Box fontSize={ 18 } fontWeight="fontWeightBold" >
                        { t(`team.resourceType.${ formResource.resourceTypeCode.value }`) }
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item sm={ 3 } xs={ 5 }>
                    <div className="resource-design">
                      Design
                      <div className="resource-design-secondary"></div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className="margin-bottom-16">
                <Typography variant="subtitle2" style={ { ...TYPOGRAPHY_STYLE, color: '#179f93' } }>
                  { t('team.profileCompleted') }
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2" style={ { ...TYPOGRAPHY_STYLE } }>
                  { t('team.topSkills') }
                </Typography>
              </Grid>
              { this.renderSkillList(formResource.skills.value) }
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="row" className="container-resource-button">
              <Grid item sm={ 6 } xs={ 6 } className="resource-button-remove">
                <Button style={ navButtonStyle }
                    color="inherit"
                    startIcon={ <PersonOutline /> }
                    onClick={ this.handleRemoveResource }>
                  { t('team.button.removeResource.label') }
                </Button>
              </Grid>
              <Grid item sm={ 6 } xs={ 6 } className="resource-button-edit">
                <Button style={ navButtonStyle }
                    color="inherit"
                    startIcon={ <EditIcon /> }
                    onClick={ this.handleEditResource }>
                  { t('team.button.editResource.label') }
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <ConfirmDialog
            open={ this.state.openRemoveResourceDialog }
            handleClose={ this.handleRemoveResourceDialogClose }
            title={ t('team.removeResourceDialogTitle') }
            content=""
            btnAction={ { label: t('team.button.confirmRemoveResource.label'), onClick: this.handleRemoveResourceDialogConfirm } }
            btnCancel={ { label: t('team.button.cancelRemoveResource.label'), onClick: this.handleRemoveResourceDialogClose } }>
        </ConfirmDialog>
      </Paper>
    );
  }
}

const navButtonStyle = {
  fontSize: '16px',
  color: '#66c9f6',
  fontWeight: 'bold',
  textTransform: 'none',
  width: '100%'
};

export default withTranslation() (ResourceComponent);
