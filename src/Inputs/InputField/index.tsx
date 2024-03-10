import React, { useEffect, useRef } from "react";

import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { IInputIaraForm, useIaraFormField } from "../../IaraFormCore";

export function InputField({
  label,
  serverProperty: serverProperty,
  required,
  ...props
}: IInputIaraForm) {
  const {
    fieldName,
    registerField,
    defaultValue,
    error,
    handleValidate,
    clearError,
  } = useIaraFormField(serverProperty);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, newValue) => {
        ref.current.value = newValue;
      },
      clearValue: (ref) => {
        ref.current.value = "";
      },
    });
  }, [registerField, fieldName]);

  return (
    <FormControl fullWidth>
      <Typography variant={"subtitle1"} pb={1} pt={2} component={"div"} textAlign={'left'}>
        {label}
        {required ? "*" : null}:
      </Typography>
      <TextField
        error={!!error}
        helperText={error}
        onKeyDown={() => (error ? clearError() : undefined)}
        variant="outlined"
        onBlur={handleValidate}
        inputProps={{ id: fieldName, ...props }}
        inputRef={inputRef}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
}
