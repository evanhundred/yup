export const starBox = () => {
  const starBoxDivs = [];
  for (let i = 1; i <= 5; i++) {
    starBoxDivs.push(<div key={i} className={`new-star-box-${i}`} />);
  }

  return <>{starBoxDivs.map((div) => div)}</>;
};
