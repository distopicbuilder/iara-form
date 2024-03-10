import { useEffect, useState } from "react";
import { useIaraForm } from "./useContext";

export function useWatch(serverProperty: string) {
  const { formRef } = useIaraForm();
  const getActualValue = () =>
    formRef.current ? formRef.current.getFieldValue(serverProperty) : null;

  const [value, setValue] = useState(getActualValue());

  useEffect(() => {
    const interval = setInterval(() => {
      if (!formRef.current)
        throw new Error("Form not found! Please, verify context");

      var current = getActualValue();
      if (value == current) return;

      setValue(formRef.current.getFieldValue(serverProperty));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return value;
}
