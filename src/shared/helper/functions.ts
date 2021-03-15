export const cleanUndefined = (obj: any): any => {
  Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key]);
  return obj;
};

export const teste = 1;
