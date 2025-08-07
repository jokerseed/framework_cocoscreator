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

    /** 是否启用远程资源 */
    get bundleEnable(): string {
        return this._data.bundle.enable;
    }
    /** 远程资源服务器地址 */
    get bundleServer(): string {
        return this._data.bundle.server;
    }
    /** 远程资源名 */
    get bundleDefault(): string {
        return this._data.bundle.default;
    }
    /** 远程所有资源包配置 */
    get bundlePackages(): string {
        return this._data.bundle.packages;
    }

    /** 游戏每秒传输帧数 */
    get frameRate(): number {
        return this._data.config.frameRate;
    }
}