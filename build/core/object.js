"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseObject = (function () {
    function BaseObject(lib) {
        this.lib = lib || null;
    }
    return BaseObject;
}());
exports.BaseObject = BaseObject;
var HandleObject = (function (_super) {
    __extends(HandleObject, _super);
    function HandleObject(handle, lib) {
        _super.call(this, lib);
        this.handle = handle;
    }
    HandleObject.prototype.getInfo = function () { };
    ;
    return HandleObject;
}(BaseObject));
exports.HandleObject = HandleObject;
