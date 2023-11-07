import "./index.css";
// import ReactCSSTransitionGroup from 'react-transition-group';

const Loading = () => {
  const periodAnimation = () => {
    //   const periodArray = [];
    //   let count = 1;
    //   let limit = 9;
    //   while (count <= limit) {
    //     periodArray.push(".");
    //     count += 1;
    //   }
    //   count = 1;
    //   const pushPeriods = () => {
    //     while (count < limit) {
    //       count += 1;
    //       return periodArray.pop();
    //     }
    //   }
    // setTimeout();
    // const getPeriods = () => {
    //   const limit = 9;
    //   let count = 1;
    //   const periodsArray = [];
    //   const putPeriod = () => {
    //     if (periodsArray.length <= limit) {
    //       periodsArray.push(".");
    //     } else {
    //       return [];
    //     }
    //     return periodsArray;
    //   }
    //   setInterval(putPeriod, 1000)
    //   return periodsArray;
    //   // while (count <= limit) {
    //   //   periodsArray.push(".");
    //   //   count += 1;
    //   // }
    //   // console.log(periodsArray);
    // };
    // return <span>{periodArray.map((char) => char)}</span>;
  };
  const periodsLimit = 9;
  const getPeriods = () => {
    let count = 1;
    let max = periodsLimit;
    const periodsArray = [];
    while (count <= max) {
      const periodComponent = <span class={`period period-${count}`}>.</span>;
      periodsArray.push(periodComponent);
      count += 1;
    }
    return periodsArray;
  };

  const stylePeriods = () => {
    const periods = document.querySelectorAll("#loading-container span.period");
    let count = periods.length;
    while (count > 0) {
      count += 1;
    }
  };

  const loadingAnimation = () => {
    return (
      <>
        <div
          className="loader"
          onAnimationStart={(e) => console.log("onAnimationStart")}
          onAnimationIteration={(e) => console.log("onAnimationIteration")}
          onAnimationEnd={(e) => console.log("onAnimationEnd")}
        ></div>
      </>
    );
  };

  return (
    <div id="loading-container">
      {/* {loadingAnimation()} */}
      <div className="loader" />
    </div>
  );
};

export default Loading;
