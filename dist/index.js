"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.MediaQuery = void 0;
var react_1 = __importStar(require("react"));
function useMediaQuery(obj) {
    var _a = (0, react_1.useState)(function () { return window.matchMedia(obj.query).matches; }), state = _a[0], setState = _a[1];
    (0, react_1.useEffect)(function () {
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
exports["default"] = useMediaQuery;
function MediaQuery(props) {
    var query_array = [];
    function add(field, value, suffix) {
        if (value)
            query_array.push("(".concat(field, ": ").concat(value).concat(suffix, ")"));
    }
    add('orientation', props.orientation);
    add('min-width', props.minWidth, 'px');
    add('max-width', props.maxWidth, 'px');
    add('min-height', props.minHeight, 'px');
    add('max-height', props.maxHeight, 'px');
    add('min-resolution', typeof props.minResolution === 'string' ? props.minResolution : props.minResolution + 'dppx');
    add('max-resolution', typeof props.maxResolution === 'string' ? props.maxResolution : props.maxResolution + 'dppx');
    var query = query_array.join(' and ');
    var matches = useMediaQuery({ query: query });
    if (typeof props.children == 'function')
        return react_1["default"].createElement("div", null, props.children(matches));
    if (!matches)
        return null;
    return react_1["default"].createElement("div", null, props.children);
}
exports.MediaQuery = MediaQuery;
//# sourceMappingURL=index.js.map