// import { loadMessage, getMessages } from "../../store/messages";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";

import "./index.css";

// import githubLogo from "../../assets/images/github.png";
// import githubLogoBlack from "../../assets/images/github-black.png";
// import linkedinLogo from "../../assets/images/linkedin.png";
// import linkedinLogoBlack from "../../assets/images/linkedin-black.png";

const Loading = () => {
  // const messages = useSelector(getMessages);
  // const restyleNavBar = () => {
  //   // const itemsToStyle
  //   const imageItems = ["github", "linkedin"];
  //   imageItems.forEach((item) => {
  //     const image = document.querySelector(`#nav-bar #${item} img`);
  //     if (image) image.src = `../../assets/images/${item}-black.png`;
  //   });

  //   // const navBar = document.getElementById("nav-bar");
  //   // if (navBar) navBar.style.color = "black";
  // };

  // restyleNavBar();

  // const styleNavBar = () => {
  //   const githubImage = document.querySelector(`#nav-bar #github img`);
  //   githubImage.onload = () => {
  //     githubImage.src = githubLogoBlack;
  //   };
  //   console.log(githubImage);
  //   const linkedinImage = document.querySelector("#nav-bar #linkedin img");
  //   linkedinImage.src = linkedinLogoBlack;
  //   const logo = document.querySelector("#nav-bar #logo");
  //   console.log(logo);
  //   logo.style.color = "black";
  //   const star = document.querySelector("#nav-bar #logo span.star");
  //   star.style.color = "red";
  // };

  // useEffect(() => {
  //   styleNavBar();
  // }, []);
  // styleNavBar();

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (messages && !messages.indexLoaded && messages.isLoading) {
  //     const message = { isLoading: true };
  //     dispatch(loadMessage(message));
  //   }
  // }, [dispatch, messages]);

  return (
    <div id="loading-container">
      {/* {loadingAnimation()} */}
      <div className="loader" />
    </div>
  );
};

export default Loading;
