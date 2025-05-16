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
var SentenceDiff = /** @class */ (function (_super) {
    __extends(SentenceDiff, _super);
    function SentenceDiff() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SentenceDiff.prototype.tokenize = function (value) {
        return value.split(/(?<=[.!?])(\s+|$)/);
    };
    return SentenceDiff;
}(Diff));
export var sentenceDiff = new SentenceDiff();
export function diffSentences(oldStr, newStr, options) {
    return sentenceDiff.diff(oldStr, newStr, options);
}
