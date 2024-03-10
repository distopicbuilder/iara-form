import { useCallback } from 'react';

import { useIaraForm } from './useContext';
import { useShowTabError } from './useShowTabError';
import { iaraSchema } from '../language/yup';

export function useFieldValidation() {
  const { formRef, schemaObject, formConfiguration } = useIaraForm();
  const { section: tabs } = formConfiguration;
  const showTabError = useShowTabError();

  const validateField = useCallback(
    async (fieldName: string) => {
      if (!fieldName || !schemaObject) return;
      try {
        await schemaObject.validateSyncAt(fieldName, formRef.current?.getData());
      } catch (error) {
        if (error instanceof iaraSchema.ValidationError) {
          formRef.current?.setFieldError(fieldName, error.message);
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }
    },
    [formRef, schemaObject],
  );

  const validateForm = useCallback(
    async (payload: { [key: string]: string }) => {
      if (!schemaObject) {
        console.error('SchemaObject not found:');
        return;
      }

      const propertys: string[] = [];
      const validationErrors: { [key: string]: string } = {};

      tabs.forEach((t) => t.fields?.forEach((c) => propertys.push(c.serverProperty)));

      propertys.forEach(async (p) => {
        try {
          payload[p] = await schemaObject.validateSyncAt(p, payload);
        } catch (error) {
          if (error instanceof iaraSchema.ValidationError) {
            validationErrors[p] = error.message;
          } else {
            console.error('An unexpected error occurred:', error);
          }
        }
      });
      
      const hasErrors = Object.keys(validationErrors).length > 0;

      if (hasErrors) {
        formRef.current?.setErrors(validationErrors);
        showTabError(validationErrors);
        return;
      }

      return payload;
    },
    [formRef, schemaObject, showTabError, tabs],
  );

  const setError = useCallback(
    async (fieldName: string, error: string) => {
      if (!fieldName || !schemaObject) return;
      formRef.current?.setFieldError(fieldName, error);
    },
    [formRef, schemaObject],
  );

  return { validateField, validateForm, setError };
}
