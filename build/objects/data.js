"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var storage_1 = require("./storage");
var Data = (function (_super) {
    __extends(Data, _super);
    function Data() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Data.prototype, "application", {
        get: function () {
            return this.get("application");
        },
        set: function (v) {
            this.set("application", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data.prototype, "objectId", {
        get: function () {
            return this.get("objectId");
        },
        set: function (v) {
            this.set("objectId", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Data.prototype, "value", {
        get: function () {
            return this.get("value");
        },
        set: function (v) {
            this.set("value", v);
        },
        enumerable: true,
        configurable: true
    });
    return Data;
}(storage_1.Storage));
exports.Data = Data;
