var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import Diff from './base.js';
var CssDiff = /** @class */ (function (_super) {
    __extends(CssDiff, _super);
    function CssDiff() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CssDiff.prototype.tokenize = function (value) {
        return value.split(/([{}:;,]|\s+)/);
    };
    return CssDiff;
}(Diff));
export var cssDiff = new CssDiff();
export function diffCss(oldStr, newStr, options) {
    return cssDiff.diff(oldStr, newStr, options);
}
