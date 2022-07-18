function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function useMediaQuery(obj) {
  var match_media = window.matchMedia(obj.query).matches;

  var _useState = React.useState(match_media),
      state = _useState[0],
      setState = _useState[1];

  React.useEffect(function () {
    window.addEventListener('resize', function () {
      var match_media_effect = window.matchMedia(obj.query).matches;
      setState(match_media_effect);
    });
  });
  return state;
}
function MediaQuery(props) {
  var query_array = [];
  var orientation = props.orientation;
  if (orientation) query_array.push('(orientation: ' + orientation + ')');
  var minWidth = props.minWidth;
  if (minWidth) query_array.push('(min-width: ' + minWidth + 'px)');
  var maxWidth = props.maxWidth;
  if (maxWidth) query_array.push('(max-width: ' + maxWidth + 'px)');
  var minHeight = props.minHeight;
  if (minHeight) query_array.push('(min-height: ' + minHeight + 'px)');
  var maxHeight = props.maxHeight;
  if (maxHeight) query_array.push('(max-height: ' + maxHeight + 'px)');
  var minResolution = props.minResolution;
  if (minResolution) query_array.push('(' + (typeof minResolution === 'string' ? 'min-resolution' : '-webkit-min-device-pixel-ratio') + ': ' + minResolution + ')');
  var maxResolution = props.maxResolution;
  if (maxResolution) query_array.push('(' + (typeof maxResolution === 'string' ? 'max-resolution' : '-webkit-max-device-pixel-ratio') + ': ' + maxResolution + ')');
  var query = query_array.join(' and ');
  var matches = useMediaQuery({
    query: query
  });
  if (typeof props.children == 'function') return React__default.createElement("div", null, props.children(matches));
  if (!matches) return null;
  return React__default.createElement("div", null, props.children);
}

exports.MediaQuery = MediaQuery;
exports.default = useMediaQuery;
//# sourceMappingURL=index.js.map
