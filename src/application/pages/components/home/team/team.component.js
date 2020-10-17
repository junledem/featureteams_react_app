import { Box, Button, IconButton, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import React from 'react';
import { withTranslation, Trans } from 'react-i18next';
import './team.component.css';
import { TYPOGRAPHY_STYLE, BTN_THEME_GREEN, STANDARD_COLOR_SKY_BLUE } from '../../../../common/constants/mat-element.const';
import '../../../../common/css/common.css';
import ApplicationContext from '../../../../containers/application.context';
import ApplicationService from '../../../../services/application.service';
import { TeamFormModel } from '../../../../models/presentation/team-form.model';
import { ApplicationMapperUtil } from '../../../../utilities/application-mapper.util';
import ResourceComponent from './resource/resource.component';
import { ResourceGroupEnum } from '../../../../common/enum/resource-group.enum';
import { ResourceFormModel } from '../../../../models/presentation/resource-form.model';
import { AddCircle } from '@material-ui/icons';
import { renderHomeSectionHeader, renderHomeSectionSubtitle, SnackbarRequestStatus } from '../../../../common/constants/element-group.const';
import SaveResourceComponent from './resource/save/save-resource.component';
import { ValidationUtil } from '../../../../utilities/validation.util';
import ProgressComponent from '../../../../common/components/progress/progress.component';
import { ObjectUtil } from '../../../../utilities/object.util';
import { ConfigurationModel } from '../../../../models/provider/configuration.model';
import { CreateConfigurationResponseModel } from '../../../../models/provider/create-configuration-response.model';
import { HttpStatusModel } from '../../../../models/http-status.model';
import { AppRequestStatus } from '../../../../common/constants/app-request.const';
import { PageSaveStateEnum } from '../../../../common/enum/page-save-state.enum';
import { RouteConst } from '../../../../common/constants/route.const';

class TeamsComponent extends React.Component {
  static contextType = ApplicationContext;
  
  constructor(props) {
    super(props);

    this.state = {
      team: new TeamFormModel(),
      openModalSaveResource: false,
      currentResource: new ResourceFormModel(),
      currentResourceSaveSate: null,
      isLoading: false,
      isLoadingSaveResource: false,
      openSnackbar: false,
      requestStatus: new HttpStatusModel()
    };
    this.applicationService = new ApplicationService(true);

    this.renderResourceGroupHeader = this.renderResourceGroupHeader.bind(this);
    this.renderResourceList = this.renderResourceList.bind(this);
    this.handleOpenModalAddResource = this.handleOpenModalAddResource.bind(this);
    this.handleOpenModalEditResource = this.handleOpenModalEditResource.bind(this);
    this.handleCloseModalSaveResource = this.handleCloseModalSaveResource.bind(this);
    this.handleSaveResource = this.handleSaveResource.bind(this);
    this.saveResourceRequest = this.saveResourceRequest.bind(this);
    this.processUpdateResourceList = this.processUpdateResourceList.bind(this);
    // this.updateResourceList = this.updateResourceList.bind(this);
    this.setResource = this.setResource.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    this.removeResourceFromConfig = this.removeResourceFromConfig.bind(this);
    this.getSaveStateTranslateKey = this.getSaveStateTranslateKey.bind(this);
    this.handleSendRequestClick = this.handleSendRequestClick.bind(this);
  }

  componentDidMount() {
    this.loadConfiguration();
  }

  async loadConfiguration() {
    await this.setState({
      isLoading: true
    });
    await this.applicationService.createConfiguration()
    .then(async (resCreateConfig: ConfigurationModel) => {
      this.context.provider.configId = await resCreateConfig.configId;
      this.retrieveResourcesByConfig(resCreateConfig.configId);
    });
  }

  async retrieveResourcesByConfig(configId: string) {
    await this.applicationService.retrieveResourcesByConfig(configId).then(async resConfig => {
      if (!ObjectUtil.isEmpty(await resConfig)) {
        const configData: CreateConfigurationResponseModel = await resConfig[0];
        await this.setState({
          team: ApplicationMapperUtil.mapTeamToForm(configData.resources)
        });
      }
    })
    .finally(async () => {
      await this.setState({
        isLoading: false
      });
    });
  }

  handleOpenModalAddResource(event) {
    /*
    Alternatively you can use event.currentTarget.getAttribute('data-group')
     */
    const resourceGroup = event.currentTarget.dataset.group;
    const newResource = new ResourceFormModel();
    newResource.resourceGroupCode.value = resourceGroup;
    this.setState({
      openModalSaveResource: true,
      currentResource: newResource,
      currentResourceSaveSate: PageSaveStateEnum.NEW
    })
  }

  handleOpenModalEditResource(event) {
    this.setState({
      openModalSaveResource: true,
      currentResourceSaveSate: PageSaveStateEnum.EDIT
    });
  }

  handleCloseModalSaveResource() {
    this.setState({
      openModalSaveResource: false
    });
  }

  setResource(resource: ResourceFormModel) {
    this.setState({
      currentResource: resource
    });
  }

  async handleSaveResource() {
    const currentResource = this.state.currentResource;
    let isValid = await ValidationUtil.validate(
      [
        currentResource.resourceTypeCode,
        currentResource.resourceTypeCodeDesc,
        currentResource.skills
      ]
    );

    this.setState({
      currentResource: currentResource
    });

    if (isValid) {
      await this.setState({
        isLoadingSaveResource: true
      });

      this.saveResourceRequest()
        .then(async (resData) => {
        })
        .finally(async () => {
          const requestStatus = await this.applicationService.getRequestStatus();
          if (await requestStatus.code === AppRequestStatus.SUCCESS) {
            await this.processUpdateResourceList();
            await this.handleCloseModalSaveResource();
          }
          await this.setState({
            isLoadingSaveResource: false,
            requestStatus: requestStatus,
            openSnackbar: true
          });
        });
    }
  }

  saveResourceRequest() {
    return this.state.currentResourceSaveSate === PageSaveStateEnum.NEW ?
      this.applicationService.addResourceToConfiguration(this.context.provider.configId, this.state.currentResource) :
      this.applicationService.editResourceToConfiguration(this.context.provider.configId, this.state.currentResource);
  }

  processUpdateResourceList() {
    this.retrieveResourcesByConfig(this.context.provider.configId);
    // const team = this.state.team;
    // switch(this.state.currentResource.resourceGroupCode.value) {
    //   case ResourceGroupEnum.BA:
    //     team.resourceGroupBA.resources.value = this.updateResourceList(team.resourceGroupBA.resources.value);
    //   break;
    //   case ResourceGroupEnum.DEV:
    //     team.resourceGroupDev.resources.value = this.updateResourceList(team.resourceGroupDev.resources.value);
    //     break;
    //   case ResourceGroupEnum.TEST:
    //     team.resourceGroupTest.resources.value = this.updateResourceList(team.resourceGroupTest.resources.value);
    //     break;
    //   case ResourceGroupEnum.SPECIALIST:
    //     team.resourceGroupSpecialist.resources.value = this.updateResourceList(team.resourceGroupSpecialist.resources.value);
    //     break;
    //   default:
    //     break;
    // }
    
    // this.setState({
    //   team: team
    // });
  }

  // updateResourceList(resources: ResourceFormModel[]): ResourceFormModel {
  //   if (this.state.currentResourceSaveSate === PageSaveStateEnum.NEW) {
  //     resources = [...resources, this.state.currentResource];
  //   } else {
  //     resources = resources.map((resource: ResourceFormModel) => {
  //       if (resource.resourceId === this.state.currentResource.resourceId) {
  //         resource = this.state.currentResource;
  //       }
  //       return resource;
  //     });
  //   }
  //   return resources;
  // }

  async removeResourceFromConfig(callbackRemoveResource) {
    await this.setState({
      isLoadingSaveResource: true,
      currentResourceSaveSate: PageSaveStateEnum.DELETE
    });

    this.applicationService.removeResourceFromConfiguration(this.context.provider.configId, this.state.currentResource.resourceId)
      .then(async (resData) => {
      })
      .finally(async () => {
        const requestStatus = await this.applicationService.getRequestStatus();
        if (await requestStatus.code === AppRequestStatus.SUCCESS) {
          if (await typeof(callbackRemoveResource) === 'function') {
            await callbackRemoveResource();
          }
          await this.retrieveResourcesByConfig(this.context.provider.configId);
        }
        await this.setState({
          isLoadingSaveResource: false,
          requestStatus: requestStatus,
          openSnackbar: true
        });
      });
  }

  handleSnackbarClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      openSnackbar: false
    });
  }

  renderResourceGroupHeader(header: string) {
    return (
      <Grid item sm={ 3 } xs={ 3 } className="text-align-center">
        <Typography variant="h5" style={ { ...TYPOGRAPHY_STYLE } }>
          <Box>
            { header }
          </Box>
        </Typography>
      </Grid>
    )
  }

  renderResourceList(resources: ResourceFormModel[], resourceGroup: ResourceGroupEnum) {
    return (
      <Grid item sm={ 3 } xs={ 3 }>
        <Grid container direction="column">
          {
            resources.map((resource, index) =>
              <Grid item key={ index }>
                <ResourceComponent resource={ resource }
                    onEditResource={ this.handleOpenModalEditResource }
                    setResource={ this.setResource }
                    isLoadingSaveResource={ this.state.isLoadingSaveResource }
                    onRemoveResource={ this.removeResourceFromConfig } />
              </Grid>
            )
          }
        <Grid item className="align-horizontal-center">
          <IconButton className="resource-add-button" data-group={ resourceGroup } onClick={ this.handleOpenModalAddResource }>
            <AddCircle fontSize="inherit" style={ { color: STANDARD_COLOR_SKY_BLUE } }/>
          </IconButton>
        </Grid>
        </Grid>
      </Grid>
    )
  }

  getSaveStateTranslateKey(): string {
    if (this.state.currentResourceSaveSate === PageSaveStateEnum.NEW) {
      return 'addResourceToConfig';
    }
    if (this.state.currentResourceSaveSate === PageSaveStateEnum.EDIT) {
      return 'editResourceFromConfig';
    }
    if (this.state.currentResourceSaveSate === PageSaveStateEnum.DELETE) {
      return 'removeResourceFromConfig';
    }
  }

  handleSendRequestClick() {
    this.props.history.push(RouteConst.CONFIGURATION);
  }

  render() {
    const { t } = this.props;
    const formTeam = { ...this.state.team };
    const transAddResourceMessage = this.state.requestStatus.code ?
      t(`apiRequest.message.${ this.state.requestStatus.code }.${ this.getSaveStateTranslateKey() }`) : '';
    console.log(this.state);

    return (
      <Grid container direction="column" className="container-team flex-nowrap">
        <Grid item className="text-align-center team-header">
          <ProgressComponent isLoading={ this.state.isLoading } progress={ 100 }/>
          <SnackbarRequestStatus
              severity={ this.state.requestStatus.code }
              msg={ transAddResourceMessage }
              open={ this.state.openSnackbar }
              handleClose={ this.handleSnackbarClose } />
          { renderHomeSectionHeader(t('team.header')) }
        </Grid>
        <Grid item className="resource-group">
          <Grid container direction="row" spacing={ 3 }>
            { this.renderResourceGroupHeader(t(`team.resourceGroup.${ formTeam.resourceGroupBA.resourceGroupCode.value }`)) }
            { this.renderResourceGroupHeader(t(`team.resourceGroup.${ formTeam.resourceGroupDev.resourceGroupCode.value }`)) }
            { this.renderResourceGroupHeader(t(`team.resourceGroup.${ formTeam.resourceGroupTest.resourceGroupCode.value }`)) }
            { this.renderResourceGroupHeader(t(`team.resourceGroup.${ ResourceGroupEnum.SPECIALIST }`)) }
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={ 3 }>
            { this.renderResourceList(formTeam.resourceGroupBA.resources.value, ResourceGroupEnum.BA) }
            { this.renderResourceList(formTeam.resourceGroupDev.resources.value, ResourceGroupEnum.DEV) }
            { this.renderResourceList(formTeam.resourceGroupTest.resources.value, ResourceGroupEnum.TEST) }
            { this.renderResourceList(formTeam.resourceGroupSpecialist.resources.value, ResourceGroupEnum.SPECIALIST) }
          </Grid>
          <Dialog open={ this.state.openModalSaveResource }
              onClose={ this.handleCloseModalSaveResource }
              aria-labelledby="form-dialog-title"
              fullWidth={ true }
              maxWidth="lg"
              disableBackdropClick
              disableEscapeKeyDown
              // titleStyle={ { textAlign: "center" } }
              >
            <DialogTitle id="form-dialog-title" className="resource-dialog-title">
              { t(`team.resourceGroup.${ this.state.currentResource.resourceGroupCode.value }`) }
            </DialogTitle>
            <DialogContent>
              {/* <DialogContentText>
                Dialog content text
              </DialogContentText> */}
              <SaveResourceComponent
                  resource={ this.state.currentResource }
                  setResource={ this.setResource }
                  isLoadingSaveResource={ this.state.isLoadingSaveResource }
              />
            </DialogContent>
            <DialogActions className="dialog-action">
              <Button
                  onClick={ this.handleCloseModalSaveResource }
                  >
                { t('team.button.cancelSaveResource.label') }
              </Button>
              <BTN_THEME_GREEN
                  variant="contained"
                  color="primary"
                  onClick={ this.handleSaveResource }
                  >
                { this.state.currentResourceSaveSate === PageSaveStateEnum.NEW ? t('team.button.addResoure.label') : t('team.button.saveResoure.label') }
              </BTN_THEME_GREEN>
            </DialogActions>
          </Dialog>
        </Grid>
        <Grid item className="container-request">
          <Grid container direction="row" spacing={ 2 } justify="center">
            <Grid item sm={ 8 } xs={ 8 }>
              { renderHomeSectionSubtitle(
                <Trans i18nKey="team.sendRequestHeader">
                  <strong>Send Request</strong> <br/>No strings attached
                </Trans>
                , false)
              }
            </Grid>
            <Grid item sm={ 8 } xs={ 8 } className="align-horizontal-center">
              <BTN_THEME_GREEN
                  variant="contained"
                  color="primary"
                  onClick={ this.handleSendRequestClick }>
                  { t('team.button.sendRequest.label') }
              </BTN_THEME_GREEN>
            </Grid>
            <Grid item sm={ 8 } xs={ 8 } className="align-horizontal-center">
            <Typography variant="caption" display="block" style={ { ...TYPOGRAPHY_STYLE } }>
              <Box>
                { t('team.averageDailyRate') }
              </Box>
            </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withTranslation()(TeamsComponent);
