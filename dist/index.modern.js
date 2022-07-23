import React, { useState, useEffect } from 'react';

function useMediaQuery(obj) {
  var _useState = useState(function () {
    return window.matchMedia(obj.query).matches;
  }),
      state = _useState[0],
      setState = _useState[1];

  useEffect(function () {
    var mql = window.matchMedia(obj.query);

    function handler(e) {
      setState(e.matches);
    }

    mql.addEventListener('change', handler);
    return function () {
      mql.removeEventListener('change', handler);
    };
  }, [obj.query]);
  return state;
}
function MediaQuery(props) {
  function getCondition(key, value) {
    switch (key) {
      case 'orientation':
        return "(orientation: " + value + ")";

      case 'minWidth':
        return "(min-width: " + value + "px)";

      case 'maxWidth':
        return "(max-width: " + value + "px)";

      case 'minHeight':
        return "(min-height: " + value + "px)";

      case 'maxHeight':
        return "(max-height: " + value + "px)";

      case 'minResolution':
        return "(min-resolution: " + (typeof value === 'string' ? value : value + 'dppx') + ")";

      case 'maxResolution':
        return "(max-resolution: " + (typeof value === 'string' ? value : value + 'dppx') + ")";

      default:
        throw new Error('props not found');
    }
  }

  var query = Object.entries(props).filter(function (_ref) {
    var key = _ref[0];
    return key !== 'children';
  }).map(function (_ref2) {
    var key = _ref2[0],
        value = _ref2[1];
    return "" + getCondition(key, value);
  }).join(' and ');
  var matches = useMediaQuery({
    query: query
  });
  if (typeof props.children == 'function') return React.createElement("div", null, props.children(matches));
  if (!matches) return null;
  return React.createElement("div", null, props.children);
}

export default useMediaQuery;
export { MediaQuery };
//# sourceMappingURL=index.modern.js.map
