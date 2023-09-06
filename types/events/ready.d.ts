import Main from "../classes/Main";
import Event from "../classes/base/Event";
declare class Ready extends Event<"ready"> {
    exe(client: Main): void | Promise<void>;
}
declare const _default: Ready;
export default _default;
