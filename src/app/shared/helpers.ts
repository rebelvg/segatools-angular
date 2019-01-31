export const convertField = (field: string, arr: []) => {
  if (!arr.length) {
    return { [field]: null, [`${field}Strict`]: null };
  }

  return arr.reduce(
    (acc, item: { value: string; strict: boolean }) =>
      item.strict
        ? { ...acc, [`${field}Strict`]: [...acc[`${field}Strict`], item.value] }
        : { ...acc, [field]: [...acc[field], item.value] },
    { [field]: [], [`${field}Strict`]: [] }
  );
};
