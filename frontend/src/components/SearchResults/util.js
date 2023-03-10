export const getCsvData = async (url) => {
  const res = await fetch(url);
  return res.text();
};
