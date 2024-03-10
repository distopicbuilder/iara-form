import React, { ReactElement, useMemo, useRef, useState } from 'react';

import { FormHandles } from '@unform/core';
import { createYupSchema } from '../helpers';
import { IaraFormContext } from '../hooks/useContext';
import { iaraSchema } from '../language/yup';
import { IFormConfiguration, IInputIaraForm } from './types';

export const IaraFormProvider = <T, K>({
  children,
  defaultFormConfiguration,
}: {
  children: ReactElement;
  defaultFormConfiguration: IFormConfiguration<T, K>;
}) => {
  const formRef = useRef<FormHandles>(null);
  const [formConfiguration, setformConfiguration] = useState<
    IFormConfiguration<T, K>
  >(defaultFormConfiguration);
  const [section, setSection] = useState<string>('iaraform-section-0');

  const schemaObject: iaraSchema.Schema<unknown | undefined> = useMemo(() => {
    const inputs: IInputIaraForm[] = [];
    formConfiguration.section.forEach(t =>
      t.fields?.forEach(i => inputs.push((i as unknown) as IInputIaraForm))
    );
    return createYupSchema(inputs);
  }, [formConfiguration.section]);

  return (
    <IaraFormContext.Provider
      value={{
        formRef,
        formConfiguration,
        section,
        schemaObject,
        setformConfiguration,
        setSection,
      }}
    >
      {children}
    </IaraFormContext.Provider>
  );
};
