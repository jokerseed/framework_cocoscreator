import { ConfigGame } from "./ConfigGame";
import { ConfigWebUrl } from "./ConfigWebUrl";

export class ConfigManager {
    /** 游戏配置数据，版本号、支持语种等数据 */
    game!: ConfigGame;

    /** 浏览器查询参数 */
    query!: ConfigWebUrl;
}