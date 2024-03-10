import React from "react";
import { Box, Button } from "@mui/material";

export function Footer() {
  const handlerCancel = () => window.history.back();

  return (
    <Box
      display={"flex"}
      width={"100%"}
      justifyContent={"space-between"}
      mt={2}
    >
      <Button variant={"outlined"} size={"large"} onClick={handlerCancel}>
        Voltar
      </Button>
      <Button variant={"outlined"} size={"large"} type={"submit"}>
        Salvar
      </Button>
    </Box>
  );
}
