var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var object_1 = require("../object");
var Storage = (function (_super) {
    __extends(Storage, _super);
    function Storage() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Storage.prototype, "token", {
        get: function () {
            return this.get("token");
        },
        set: function (v) {
            this.set("token", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Storage.prototype, "private", {
        get: function () {
            return this.get("private");
        },
        set: function (v) {
            this.set("private", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Storage.prototype, "modifiable", {
        get: function () {
            return this.get("modifiable");
        },
        set: function (v) {
            this.set("modifiable", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Storage.prototype, "label", {
        get: function () {
            return this.get("label");
        },
        set: function (v) {
            this.set("label", v);
        },
        enumerable: true,
        configurable: true
    });
    return Storage;
})(object_1.SessionObject);
exports.Storage = Storage;
