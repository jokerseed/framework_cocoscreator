/**
 * 整个游戏的配置文件
 */
export class ConfigGame {
    private readonly _data: any = null;
    /** 游戏配置数据 */
    get data(): any {
        return this._data;
    }

    constructor(config: any) {
        this._data = Object.freeze(config.json);
    }

    /** 本地存储内容加密 key */
    get localDataKey(): string {
        return this._data.config.localDataKey;
    }
    /** 本地存储内容加密 iv */
    get localDataIv(): string {
        return this._data.config.localDataIv;
    }
}