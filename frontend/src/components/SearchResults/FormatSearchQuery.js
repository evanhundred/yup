import stateAbbreviations from "./states.txt";

let statesTextBlob;
export const getStatesArray = () => {
  fetch(stateAbbreviations)
    .then((response) => response.text())
    .then((text) => (statesTextBlob = text));

  let stateAbbrevArray;
  if (statesTextBlob) {
    stateAbbrevArray = statesTextBlob.replace(/\n/g, "\t").split("\t");
  }

  return stateAbbrevArray;
};
