import { DEBUG } from "cc/env";
import { ConfigManager } from "./core/config/ConfigManager";
import { StorageManager } from "./core/storage/StorageManager";

export class Framework {
    static config: ConfigManager;

    static storage: StorageManager;
}

// 引入oops全局变量以方便调试
if (DEBUG) {
    //@ts-ignore
    window.Framework = Framework;
}