/**
 * Class Timer.
 */
export class Timer {
    beginAt: Date = null;
    endAt: Date = null;
    time = 0;

    /**
     * Starts timer
     */
    start() {
        if (!this.beginAt)
            this.beginAt = new Date();
    };

    /**
     * Stops timer
     */
    stop() {
        if (this.beginAt && !this.endAt) {
            this.endAt = new Date();
            this.time = this.endAt.getTime() - this.beginAt.getTime();
        }
    };

}