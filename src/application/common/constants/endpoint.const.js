export const PARAM_KEY = ':param_';

export const EndpointConst = {
  LOGIN: 'api/user/login',
  REGISTER: 'api/user/register',
  RETRIEVE_RESOURCE: '/api/resources',
  CREATE_CONFIGURATION: '/api/configuration/create',
  RETRIEVE_CONFIGURATION: `/api/configuration/${PARAM_KEY}1`,
  ADD_RESOURCE_CONFIGURATION: `/api/configuration/${PARAM_KEY}1/resource`,
  EDIT_RESOURCE_CONFIGURATION: `/api/configuration/${PARAM_KEY}1/${PARAM_KEY}2`,
  DELETE_RESOURCE_CONFIGURATION: `/api/configuration/${PARAM_KEY}1/${PARAM_KEY}2`
}