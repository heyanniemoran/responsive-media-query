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
  var query_array = [];

  function add(field, value, suffix) {
    if (value) query_array.push("(" + field + ": " + value + suffix + ")");
  }

  add('orientation', props.orientation);
  add('min-width', props.minWidth, 'px');
  add('max-width', props.maxWidth, 'px');
  add('min-height', props.minHeight, 'px');
  add('max-height', props.maxHeight, 'px');
  add('min-resolution', typeof props.minResolution === 'string' ? props.minResolution : props.minResolution + 'dppx');
  add('max-resolution', typeof props.maxResolution === 'string' ? props.maxResolution : props.maxResolution + 'dppx');
  var query = query_array.join(' and ');
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
