import { useField } from '@unform/core';
import { useFieldValidation } from './useFieldValidation';

export function useIaraFormField(serverProperty: string) {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(serverProperty);
  const { validateField } = useFieldValidation();
  const handleValidate = () => validateField(fieldName);
  
  return { fieldName, registerField, defaultValue, error, clearError, handleValidate };
}
