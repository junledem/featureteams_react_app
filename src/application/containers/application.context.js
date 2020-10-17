import React, { useContext } from 'react';
import { ApplicationContextModel } from '../models/application-context.model';

const ApplicationContext = React.createContext(new ApplicationContextModel());

export function useApplicationContext() {
  return useContext(ApplicationContext);
}

export default ApplicationContext;