import { _decorator, Component, director, game, JsonAsset, Node, profiler, resources } from 'cc';
import { DEBUG } from 'cc/env';
import { Framework } from './extension/framework/Framework';
import { ConfigWebUrl } from './extension/framework/core/config/ConfigWebUrl';
import { ConfigGame } from './extension/framework/core/config/ConfigGame';
import { ConfigManager } from './extension/framework/core/config/ConfigManager';
import { StorageManager } from "./extension/framework/core/storage/StorageManager";
import { StorageSecuritySimple } from './extension/framework/core/storage/StorageSecuritySimple';
import { ResLoader } from './extension/framework/core/loader/ResLoader';
import { AudioManager } from './extension/framework/core/audio/AudioManager';
import { TimerManager } from './extension/framework/core/timer/TimerManager';
import { MessageManager } from './extension/framework/core/event/MessageManager';
import { UIManager } from './extension/framework/core/gui/UIManager';
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
        this.enabled = false;

        this.initModule();
        this.loadConfig();
    }

    private initModule() {
        // 创建持久根节点
        this.persist = new Node("__PersistNode");
        director.addPersistRootNode(this.persist);

        // Web平台查询参数管理
        Framework.config = new ConfigManager();
        //创建的时候会自动初始化weburl透传的参数
        Framework.config.query = new ConfigWebUrl();

        // 资源管理模块
        Framework.res = new ResLoader();

        // 全局消息
        Framework.message = new MessageManager();

        // 创建时间模块
        Framework.timer = this.persist.addComponent(TimerManager)!;

        // 创建游戏界面管理对象
        Framework.gui = new UIManager();
    }

    private loadConfig() {
        //加载初始化配置文件
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
            Framework.audio = this.persist.addComponent(AudioManager)!;
            Framework.audio.load();

            // 设置默认资源包
            Framework.res.defaultBundleName = Framework.config.game.bundleDefault;

            // 游戏界面管理
            Framework.gui.mobileSafeArea = Framework.config.game.mobileSafeArea;
            //@ts-ignore
            Framework.gui.initLayer(this.gui, Framework.config.game.gui);

            // 初始化每秒传输帧数
            game.frameRate = Framework.config.game.frameRate;

            this.enabled = true;

            resources.release(config_name);
        })
    }

    protected start(): void {
        if (DEBUG) profiler.showStats();
    }

    protected update(dt: number): void {

    }
}


