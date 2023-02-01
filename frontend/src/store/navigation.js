export const RENDER_INDEX_NAV = "RENDER_INDEX_NAV";
export const RENDER_BUSINESS_NAV = "RENDER_BUSINESS_NAV";

export const renderIndexNav = () => {
  return {
    type: RENDER_INDEX_NAV
  };
};

export const renderBusinessNav = () => {
  return {
    type: RENDER_BUSINESS_NAV
  };
};

const NavigationReducer = (preloadedState = {}, action) => {
  switch (action.type) {
    case RENDER_INDEX_NAV:
      return {
        navType: "index"
      };
    case RENDER_BUSINESS_NAV:
      return {
        navType: "business"
      };
    default:
      return preloadedState;
  }
};

export default NavigationReducer;
