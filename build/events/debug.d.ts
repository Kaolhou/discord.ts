import Main from "../classes/Main";
import Event from "../classes/base/Event";
declare class Debug extends Event<"debug"> {
    exe(client: Main, message: string): Promise<void>;
}
declare const _default: Debug;
export default _default;
