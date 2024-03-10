import React, { useCallback, useEffect } from "react";
import { Form as Unform } from "@unform/web";
import { IaraFormProvider } from "../../IaraFormProvider";
import { useIaraForm, useFieldValidation } from "../../hooks";
import { Body } from "../Body";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { IIaraFormKitProps } from "./types";
import { Box } from "@mui/material";

export function Form<T, K>(props: IIaraFormKitProps<T, K>) {
  return (
    <IaraFormProvider defaultFormConfiguration={props.formConfiguration}>
      <Component {...props} />
    </IaraFormProvider>
  );
}

export function Component<T, K>({
  formConfiguration,
  onSubmit,
  initialData,
}: IIaraFormKitProps<T, K>) {
  const { formRef, setformConfiguration } = useIaraForm();
  const { validateForm } = useFieldValidation();
  const {
    formConfiguration: { custom },
  } = useIaraForm();

  const formSubmit = useCallback(
    async (payload: K) => {
      const payloadValited = await validateForm(
        payload as { [key: string]: string }
      );
      if (!payloadValited) return;

      await onSubmit(payloadValited as K);
    },
    [onSubmit, validateForm]
  );

  useEffect(() => {
    setformConfiguration(formConfiguration);
  }, [formConfiguration, setformConfiguration]);

  return (
    <Unform
      ref={formRef}
      onSubmit={formSubmit}
      initialData={initialData as Record<string, any>}
      placeholder={""}
    >
      <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
        <Box display={"flex"} alignItems={"center"} width={"100%"}>
          <Box
            display={"flex"}
            alignItems={"flex-start"}
            flexDirection={"column"}
            width={"100%"}
            height={"100%"}
          >
            <Box width={"100%"} height={"100%"}>
              <Header />
              <Body />
            </Box>
          </Box>
        </Box>
        {custom && custom.footer ? custom.footer : <Footer />}
      </Box>
    </Unform>
  );
}
