import React, { useCallback }  from 'react';
import { Box, Grid } from '@mui/material';
import { removeUnUnsedProperty } from '../../helpers';
import { useIaraForm } from '../../hooks';

export function Body() {
  const { section: value, formConfiguration } = useIaraForm();

  const getElement = useCallback(
    (type: string) =>
      formConfiguration.elements[type] ??
      (() => {
        throw new Error(`Element key '${type}' not found`);
      }),
    [formConfiguration.elements],
  );

  return (
    <>
      {formConfiguration.section.map((tab, index) => (
        <Box
          component={'div'}
          key={`tab-${tab.title}${index}`}
          style={{
            display: `iaraform-section-${index}` == value ? 'block' : 'none',
          }}
        >
          <Grid container spacing={1}>
            {tab.fields?.map((input, indexChilds) => (
              <Grid
                key={`grid-childs-${index}-${indexChilds}`}
                xs={12}
                sm={input?.md ?? 12}
                md={input?.md ?? 12}
                item
              >
                {getElement(input.inputField.toString())(removeUnUnsedProperty(input))}
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </>
  );
}
