// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getCompositeProperty(obj: any, prop: string): unknown {
  if (!obj == null || obj == undefined || Array.isArray(obj)) return obj;
  const i = prop.indexOf('.');
  if (i > -1) return getCompositeProperty(obj[prop.substring(0, i)], prop.substring(i + 1));
  return obj[prop];
}
