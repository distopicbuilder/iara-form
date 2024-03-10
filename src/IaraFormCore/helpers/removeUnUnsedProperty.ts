import { IDefaultInput, IInputIaraForm } from "../IaraFormProvider/types";

export function removeUnUnsedProperty(params: IDefaultInput<unknown, unknown>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { md, validate: yupShape, inputField, ...props } = params;
  return props as IInputIaraForm;
}
