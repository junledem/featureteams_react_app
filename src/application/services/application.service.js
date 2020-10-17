import { EndpointConst } from '../common/constants/endpoint.const';
import jsonResources from '../mocks/resources.json';
import jsonResourcesByConfig from '../mocks/resource-config.json';
import { HttpUtil } from '../utilities/http.util';
import { CreateConfigurationResponseModel } from '../models/provider/create-configuration-response.model';
import { ResourceFormModel } from '../models/presentation/resource-form.model';
import { ApplicationMapperUtil } from '../utilities/application-mapper.util';
import { HttpStatusModel } from '../models/http-status.model';
import { AppRequestStatus } from '../common/constants/app-request.const';

class ApplicationService {
  constructor(isMock: boolean = false) {
    this.requestStatus = new HttpStatusModel();
    console.log(isMock);
    this.isMock = isMock;
  }

  async timerResponse(data, ms: number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data)
      }, ms);
    })
    .catch((error) => {
      console.error('Error timerResponse ', error);
    });
  }

  async createConfiguration() {
    this.requestStatus = new HttpStatusModel();

    console.log(this.isMock);
    if (this.isMock) {
      const newConfigRes = new CreateConfigurationResponseModel();
      newConfigRes.configId = '5f09a67faa604c00316e51d9';
      return this.timerResponse(newConfigRes, 1000);
    }

    return await fetch(EndpointConst.CREATE_CONFIGURATION, {
      method: 'POST',
    })
    .then((res) => {
      return res.json();
    })
      .then((data) => {
        this.requestStatus.code = AppRequestStatus.SUCCESS;
        return data;
      })
      .catch((error) => {
        this.requestStatus.code = AppRequestStatus.ERROR;
        console.error('Error createConfiguration request ', error);
      });
  }

  async retrieveResourcesByConfig(configId: string) {
    this.requestStatus = new HttpStatusModel();

    if (this.isMock) {
      return await Promise.resolve(jsonResourcesByConfig.map(resource => resource)).then((dataResource) => {
        return this.timerResponse(dataResource, 2000);
      });
    }

    const url = await HttpUtil.getApi(EndpointConst.RETRIEVE_CONFIGURATION, configId);
    return await fetch(url, {
      method: 'GET',
    })
    .then((res) => {
      return res.json();
    })
      .then((data) => {
        this.requestStatus.code = AppRequestStatus.SUCCESS;
        return data;
      })
      .catch((error) => {
        this.requestStatus.code = AppRequestStatus.ERROR;
        console.error('Error retrieveConfiguration request ', error);
    });
  }

  async retrieveAllResources(): Promise<ResourceModel[]> {
    this.requestStatus = new HttpStatusModel();

    if (this.isMock) {
      return await Promise.resolve(jsonResources.map(resource => resource)).then((dataResource) => {
        return this.timerResponse(dataResource, 4000);
      });
    }

    return fetch(EndpointConst.RETRIEVE_RESOURCE, {
      method: 'GET',
    })
    .then((res) => {
      return res.json();
    })
      .then((data) => {
        this.requestStatus.code = AppRequestStatus.SUCCESS;
        return data;
      })
      .catch((error) => {
        this.requestStatus.code = AppRequestStatus.ERROR;
        console.error('Error retrieveResource request ', error);
    });
  }
  
  async addResourceToConfiguration(configId: string, formResource: ResourceFormModel) {
    this.requestStatus = new HttpStatusModel();
    const url = await HttpUtil.getApi(EndpointConst.ADD_RESOURCE_CONFIGURATION, configId);
    const resource = await ApplicationMapperUtil.mapResourceToProvider(formResource);
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resource)
    })
    .then((res) => {
      return res.json();
    })
      .then((data) => {
        this.requestStatus.code = AppRequestStatus.SUCCESS;
        return data;
      })
      .catch((error) => {
        this.requestStatus.code = AppRequestStatus.ERROR;
        console.error('Error addResourceToConfiguration request ', error);
    });
  }

  async editResourceToConfiguration(configId: string, formResource: ResourceFormModel) {
    this.requestStatus = new HttpStatusModel();
    const url = await HttpUtil.getApi(EndpointConst.EDIT_RESOURCE_CONFIGURATION, configId, formResource.resourceId);
    const resource = await ApplicationMapperUtil.mapResourceToProvider(formResource);
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resource)
    })
    .then((res) => {
      return res.json();
    })
      .then((data) => {
        this.requestStatus.code = AppRequestStatus.SUCCESS;
        return data;
      })
      .catch((error) => {
        this.requestStatus.code = AppRequestStatus.ERROR;
        console.error('Error addResourceToConfiguration request ', error);
    });
  }

  async removeResourceFromConfiguration(configId: string, resourceId: number) {
    this.requestStatus = new HttpStatusModel();
    const url = await HttpUtil.getApi(EndpointConst.DELETE_RESOURCE_CONFIGURATION, configId, resourceId);
    return await fetch(url, {
      method: 'DELETE',
    })
    .then((res) => {
      return res.json();
    })
      .then((data) => {
        this.requestStatus.code = AppRequestStatus.SUCCESS;
        return data;
      })
      .catch((error) => {
        this.requestStatus.code = AppRequestStatus.ERROR;
        console.error('Error removeResourceFromConfiguration request ', error);
    });
  }

  getRequestStatus(): HttpStatusModel {
    return this.requestStatus;
  }
}

export default ApplicationService;