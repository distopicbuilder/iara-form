import { IFormConfiguration } from "../../IaraFormProvider/types";

export interface IIaraFormKitProps<T, K> {
  formConfiguration: IFormConfiguration<T, K>;
  onSubmit: (((dados: K) => Promise<void>) & K) | ((e: K) => void);
  initialData?: K | undefined;
}