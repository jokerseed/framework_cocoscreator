import { _decorator, Component, director, JsonAsset, Node, profiler, resources } from 'cc';
import { DEBUG } from 'cc/env';
import { Framework } from './extension/framework/Framework';
import { ConfigWebUrl } from './extension/framework/core/config/ConfigWebUrl';
import { ConfigGame } from './extension/framework/core/config/ConfigGame';
import { ConfigManager } from './extension/framework/core/config/ConfigManager';
import { StorageManager } from "./extension/framework/core/storage/StorageManager";
import { StorageSecuritySimple } from './extension/framework/core/storage/StorageSecuritySimple';
import { ResLoader } from './extension/framework/core/loader/ResLoader';
import { AudioManager } from './extension/framework/core/audio/AudioManager';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    /** 游戏层节点 */
    @property({
        type: Node,
        tooltip: "游戏层"
    })
    game: Node = null!;            // 可使用多摄像机自定义二维或三维游戏场景

    /** 界面层节点 */
    @property({
        type: Node,
        tooltip: "界面层"
    })
    gui: Node = null!;

    /** 框架常驻节点 */
    private persist: Node = null!;

    protected onLoad(): void {
        this.initModule();
        this.loadConfig();
    }

    private initModule() {
        // 创建持久根节点
        this.persist = new Node("__PersistNode");
        director.addPersistRootNode(this.persist);

        // Web平台查询参数管理
        Framework.config = new ConfigManager();
        Framework.config.query = new ConfigWebUrl();

        // 资源管理模块
        Framework.res = new ResLoader();
    }

    private loadConfig() {
        const config_name = "config";
        resources.load(config_name, JsonAsset, (err, config) => {
            if (err) {
                this.loadConfig();
                return;
            }

            // 游戏配置文件
            Framework.config.game = new ConfigGame(config);

            // 本地存储模块
            Framework.storage = new StorageManager();
            Framework.storage.init(new StorageSecuritySimple());

            // 创建音频模块
            Framework.audio = this.persist.addComponent(AudioManager);
            Framework.audio.load();

            // 设置默认资源包
            Framework.res.defaultBundleName = Framework.config.game.bundleDefault;
        })
    }

    protected start(): void {
        if (DEBUG) profiler.showStats();
    }

    protected update(dt: number): void {

    }
}


