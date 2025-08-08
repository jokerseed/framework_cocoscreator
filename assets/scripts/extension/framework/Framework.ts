import { DEBUG } from "cc/env";
import { ConfigManager } from "./core/config/ConfigManager";
import { StorageManager } from "./core/storage/StorageManager";
import { ResLoader } from "./core/loader/ResLoader";
import { AudioManager } from "./core/audio/AudioManager";
import { TimerManager } from "./core/timer/TimerManager";
import { MessageManager } from "./core/event/MessageManager";
import { UIManager } from "./core/gui/UIManager";

export class Framework {
    /** 游戏配置 */
    static config: ConfigManager;
    /** 本地存储 */
    static storage: StorageManager;
    /** 资源管理 */
    static res: ResLoader;
    /** 游戏音乐管理 */
    static audio: AudioManager;
    /** 游戏时间管理 */
    static timer: TimerManager;
    /** 全局消息 */
    static message: MessageManager;
    /** 二维界面管理 */
    static gui: UIManager;
}

// 引入oops全局变量以方便调试
if (DEBUG) {
    //@ts-ignore
    window.Framework = Framework;
}