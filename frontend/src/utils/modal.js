export const backgroundNavBar = () => {
  const navBar = document.getElementById("nav-bar");
  navBar.classList.add("backgrounded");
};

export const unBackgroundNavBar = () => {
  const navBar = document.getElementById("nav-bar");
  navBar.classList.remove("backgrounded");
};
