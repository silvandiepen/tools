export const removeTag = (input: string, tag: string): string => {
  const regex = new RegExp(`/<{tag}(.*)>(.*)<\/${tag}>/gi`);
  return input.replace(regex, "");
};

export const getStringFromTag = (
  input: string,
  tag: string
): string | string[] => {
  const regex = new RegExp(`/<${tag}(.*?)>(.+?)<\/${tag}>/gi`);
  const matches = regex.exec(input);
  if (!matches) return "";
  if (matches.length == 1) return matches[0];
  else return matches[matches.length - 1];
};
