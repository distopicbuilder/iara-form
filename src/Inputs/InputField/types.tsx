import { StandardTextFieldProps } from '@mui/material';

export interface IFormItemInput extends StandardTextFieldProps {
  label: string;
  placeholder: string;
  property: string;
  currency?: boolean;
}
