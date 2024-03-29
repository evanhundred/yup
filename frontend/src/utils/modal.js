export const backgroundNavBar = () => {
  const navBar = document.getElementById("nav-bar");
  navBar.classList.add("backgrounded");
};

export const unBackgroundNavBar = () => {
  const navBar = document.getElementById("nav-bar");
  navBar.classList.remove("backgrounded");
};
export const backgroundHeaderBar = () => {
  const navBar = document.getElementById("header-bar");
  navBar.classList.add("backgrounded");
};

export const unBackgroundHeaderBar = () => {
  const navBar = document.getElementById("header-bar");
  navBar.classList.remove("backgrounded");
};

// const html = document.querySelector("html");

// export const handleCloseModal = (e, setShowShareModal) => {
//   e.preventDefault();
//   if (html) html.style.overflow = "auto";
//   setShowShareModal(false);
//   // const navBar = document.getElementById("nav-bar");
//   // navBar.classList.remove("backgrounded");
//   unBackgroundNavBar();
//   // stopListeningForEsc();
//   // const containerDiv = document.querySelector(".share-modal-container");
//   // containerDiv.removeEventListener("keydown", closeOnPressEsc);
// };

export const closeOnPressEsc = (e, handleCloseModal) => {
  if (e.key === "Escape") {
    handleCloseModal(e);
  }
};

export const listenForEsc = () => {
  document.addEventListener("keydown", (e) => closeOnPressEsc(e));
};

export const capitalize = (string) => {
  const capitalized = string.slice(0, 1).toUpperCase().concat(string.slice(1));
  // capitalized[0] = capitalized[0].toUpperCase;
  return capitalized;
};
