import { DEBUG } from "cc/env";
import { ConfigManager } from "./core/config/ConfigManager";
import { StorageManager } from "./core/storage/StorageManager";
import { ResLoader } from "./core/loader/ResLoader";
import { AudioManager } from "./core/audio/AudioManager";

export class Framework {
    /** 游戏配置 */
    static config: ConfigManager;
    /** 本地存储 */
    static storage: StorageManager;
    /** 资源管理 */
    static res: ResLoader;
    /** 游戏音乐管理 */
    static audio: AudioManager;
}

// 引入oops全局变量以方便调试
if (DEBUG) {
    //@ts-ignore
    window.Framework = Framework;
}