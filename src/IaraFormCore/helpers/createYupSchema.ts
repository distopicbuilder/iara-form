import { IInputIaraForm } from '../IaraFormProvider/types';
import { iaraSchema } from '../language/yup';

export function createYupSchema(inputs: IInputIaraForm[]): iaraSchema.Schema<unknown | undefined> {
  const schemaObject: { [key: string]: iaraSchema.Schema<unknown | undefined> } = {};

  inputs.forEach(({ serverProperty: serverProperty, validate: yupShape }) => {
    if (!serverProperty) throw new Error('serverProperty is required');

    const propertyKeys = serverProperty.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let currentObj = schemaObject as any;

    for (let i = 0; i < propertyKeys.length; i++) {
      const key = propertyKeys[i];
      if (i === propertyKeys.length - 1) {
        if (yupShape) {
          currentObj[key] = yupShape;
        } else {
          throw new Error(`YupShape is required for serverProperty ${serverProperty}`);
        }
      } else {
        if (!currentObj[key]) {
          currentObj[key] = iaraSchema.object().shape({});
        } else if (!iaraSchema.isSchema(currentObj[key])) {
          currentObj[key] = iaraSchema.object().shape({});
        }
        currentObj = currentObj[key].fields as { [key: string]: unknown };
      }
    }
  });

  return iaraSchema.object().shape(schemaObject);
}
