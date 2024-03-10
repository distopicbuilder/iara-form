import { ReactElement } from "react";
import { FormHandles } from "@unform/core/typings/types";
import { HTMLProps } from "react";
import { iaraSchema } from "../language/yup";

export interface IIaraFormKitContext<T, K> {
  formRef: React.RefObject<FormHandles>;
  formConfiguration: IFormConfiguration<T, K>;
  setformConfiguration: React.Dispatch<
    React.SetStateAction<IFormConfiguration<T, K>>
  >;
  section: string;
  setSection: React.Dispatch<React.SetStateAction<string>>;
  schemaObject: iaraSchema.Schema<unknown | undefined>;
}
export interface IFormConfiguration<T, K> {
  section: ISection<T, K>[];
  elements: IElementFunctions;
  custom?: ICustom;
}
export interface ICustom {
  // header?: () => ReactElement;
  // body?: () => ReactElement;
  footer?: React.JSX.Element;
}
export interface IElementFunctions {
  [key: string]: (props: IInputIaraForm) => ReactElement;
}
export interface ISection<T, k> {
  title: string;
  fields?: IDefaultInput<T, k>[];
}
export interface IDefaultInput<T, K>
  extends Omit<HTMLProps<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >, "serverProperty"> {
  label: string;
  serverProperty: PathOf<K>;
  inputField: keyof T;
  md?: number;
  validate?: iaraSchema.Schema<unknown | undefined>;
}
export interface IInputIaraForm
  extends Omit<IDefaultInput<unknown, unknown>, "yupSape" | "md"> {}

type PathOf<T> = T extends object
  ? {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [K in keyof T]: T[K] extends (...args: any[]) => any
        ? string
        : K | `${K & string}.${PathOf<T[K]> & string}`;
    }[keyof T]
  : string;

