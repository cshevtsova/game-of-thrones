export const getNumberFromString = (txt: string) => {
  return txt.match(/\d+/)?.join("");
}