import React, { useState, useEffect } from 'react';

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

const _excluded = ["children"];
function useMediaQuery(obj) {
  const [state, setState] = useState(() => window.matchMedia(obj.query).matches);
  useEffect(() => {
    const mql = window.matchMedia(obj.query);

    function handler(e) {
      setState(e.matches);
    }

    mql.addEventListener('change', handler);
    return () => {
      mql.removeEventListener('change', handler);
    };
  }, [obj.query]);
  return state;
}
function MediaQuery(_ref) {
  let {
    children
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  const query = Object.entries(props).map(([key, value]) => {
    const condition = key.split('').map((letter, idx) => {
      return letter === letter.toUpperCase() ? idx === 0 ? letter.toLowerCase() : '-' + letter.toLowerCase() : letter;
    }).join('');

    switch (condition) {
      case 'orientation':
        return '(' + condition + ': ' + value + ')';

      case 'min-resolution':
      case 'max-resolution':
        return '(' + condition + ': ' + (typeof value === 'string' ? value : value + 'dppx') + ')';

      default:
        return '(' + condition + ': ' + value + 'px)';
    }
  }).join(' and ');
  const matches = useMediaQuery({
    query: query
  });
  if (typeof children === 'function') return React.createElement("div", null, children(matches));
  if (!matches) return null;
  return React.createElement("div", null, children);
}

export { MediaQuery, useMediaQuery as default };
//# sourceMappingURL=index.modern.mjs.map
