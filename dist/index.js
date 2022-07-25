function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

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

var _excluded = ["children"];
function useMediaQuery(obj) {
  var _useState = React.useState(function () {
    return window.matchMedia(obj.query).matches;
  }),
      state = _useState[0],
      setState = _useState[1];

  React.useEffect(function () {
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
function MediaQuery(_ref) {
  var children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  var query = Object.entries(props).map(function (_ref2) {
    var key = _ref2[0],
        value = _ref2[1];
    var condition = key.split('').map(function (letter, idx) {
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
  var matches = useMediaQuery({
    query: query
  });
  if (typeof children === 'function') return React__default.createElement("div", null, children(matches));
  if (!matches) return null;
  return React__default.createElement("div", null, children);
}

exports.MediaQuery = MediaQuery;
exports.default = useMediaQuery;
//# sourceMappingURL=index.js.map
