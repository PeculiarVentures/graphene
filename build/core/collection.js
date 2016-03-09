"use strict";
var Collection = (function () {
    function Collection(items, lib, classType) {
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
}());
exports.Collection = Collection;
