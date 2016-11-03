"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var object = require("./object");
var Collection = (function (_super) {
    __extends(Collection, _super);
    function Collection(items, lib, classType) {
        _super.call(this, lib);
        this.items_ = items;
        this.lib = lib;
        this.classType = classType;
    }
    Object.defineProperty(Collection.prototype, "length", {
        get: function () {
            return this.items_.length;
        },
        enumerable: true,
        configurable: true
    });
    Collection.prototype.items = function (index) {
        var handle = this.items_[index];
        return new this.classType(handle, this.lib);
    };
    return Collection;
}(object.BaseObject));
exports.Collection = Collection;
