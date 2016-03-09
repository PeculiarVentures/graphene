"use strict";
var Timer = (function () {
    function Timer() {
        this.beginAt = null;
        this.endAt = null;
        this.time = 0;
    }
    Timer.prototype.start = function () {
        if (!this.beginAt)
            this.beginAt = new Date();
    };
    ;
    Timer.prototype.stop = function () {
        if (this.beginAt && !this.endAt) {
            this.endAt = new Date();
            this.time = this.endAt.getTime() - this.beginAt.getTime();
        }
    };
    ;
    return Timer;
}());
exports.Timer = Timer;
