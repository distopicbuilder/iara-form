import { createContext, useContext } from 'react';
import { IIaraFormKitContext } from '../IaraFormProvider/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const IaraFormContext = createContext({} as IIaraFormKitContext<any, any>);

export const useIaraForm = () => {
  const context = useContext(IaraFormContext);
  if (!context) {
    throw new Error('use useIaraFormKit inner IaraFormKitContext');
  }
  return context;
};
