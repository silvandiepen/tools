export const repeat = (num: number = 1, value: any) => {
  let values = [];
  for (let i = 0; i < num; i++) {
    values.push(value);
  }
  return values.join("");
};
