import { useCallback } from "react";

import { useIaraForm } from "./useContext";

export function useShowTabError() {
  const { setSection, formConfiguration } = useIaraForm();

  const showTabError = useCallback(
    (errors: { [key: string]: string }) => {
      const errorTabIndex = (formConfiguration.section || []).findIndex((tab) =>
        (tab.fields || []).some((field) => {
          return Object.keys(errors).some((e) => e == field.serverProperty);
        })
      );

      if (errorTabIndex === -1) return;

      setSection(`iaraform-section-${errorTabIndex}`);
    },
    [formConfiguration.section, setSection]
  );

  return showTabError;
}
