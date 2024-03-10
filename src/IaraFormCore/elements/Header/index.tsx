import React from "react";
import { Box, Tab, Tabs } from "@mui/material";

import { useIaraForm } from "../../hooks/useContext";

export function Header() {
  const { setSection: setStep, section: step, formConfiguration } = useIaraForm();

  if (formConfiguration.section.length == 1) return; 
  return (
    <Tabs
      variant={"scrollable"}
      scrollButtons="auto"
      onChange={(_, newValue) => {
        setStep(newValue);
      }}
      component={Box}
      value={step}
    >
      {formConfiguration.section.map((tab, index) => (
        <Tab
          key={`tab-${tab.title}${index}`}
          label={`${tab.title}`}
          value={`iaraform-section-${index}`}
        />
      ))}
    </Tabs>
  );
}
