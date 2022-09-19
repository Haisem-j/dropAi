export const trimOutput = (result: string) => {
  const trimmed: string[] = [];
  result
    .split("\n")
    .filter((i) => i)
    .forEach((item) => {
      let subStr;
      if (Number(item[0])) {
        subStr = 2;
      } else if (item[0] === "-") {
        subStr = 1;
      } else {
        subStr = 0;
      }
      trimmed.push(item.substring(subStr).trim());
    });
  return trimmed;
};
