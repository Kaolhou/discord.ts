export default class Event {
    constructor(event, once = false) {
        this.once = once;
        this.eventName = event;
    }
    async exe(client, ...args) {
        throw new Error("Not Implemented");
    }
}
