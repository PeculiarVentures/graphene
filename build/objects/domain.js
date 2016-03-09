"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var storage_1 = require("./storage");
var DomainParameters = (function (_super) {
    __extends(DomainParameters, _super);
    function DomainParameters() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(DomainParameters.prototype, "keyType", {
        get: function () {
            return this.get("keyType");
        },
        set: function (v) {
            this.set("keyType", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DomainParameters.prototype, "local", {
        get: function () {
            return this.get("local");
        },
        set: function (v) {
            this.set("local", v);
        },
        enumerable: true,
        configurable: true
    });
    return DomainParameters;
}(storage_1.Storage));
exports.DomainParameters = DomainParameters;
