import { Camera, view, screen, log, error, ResolutionPolicy, Node, SafeArea, Layers, Widget, __private } from "cc";
import { LayerUI } from "./LayerUI";
import { LayerPopUp } from "./LayerPopUp";
import { LayerDialog } from "./LayerDialog";
import { LayerNotify } from "./LayerNotify";
import { LayerType, LayerTypeCls } from "./LayerEnum";
import { LayerCustom } from "./LayerCustom";

export class UIManager {
    /** 界面根节点 */
    root!: Node;
    /** 界面摄像机 */
    camera!: Camera;

    /** 窗口宽高比例 */
    windowAspectRatio: number = 0;
    /** 设计宽高比例 */
    designAspectRatio: number = 0;
    /** 是否开启移动设备安全区域适配 */
    mobileSafeArea: boolean = false;

    /** 二维游戏逻辑层 */
    private game!: Node;
    /** 新手引导层 */
    private guide!: Node;
    /** 消息提示控制器，请使用show方法来显示 */
    private notify!: LayerNotify;

    /** 界面层组件集合 */
    private clsLayers: Map<string, any> = new Map();

    constructor() {
        this.clsLayers.set(LayerTypeCls.UI, LayerUI);
        this.clsLayers.set(LayerTypeCls.PopUp, LayerPopUp);
        this.clsLayers.set(LayerTypeCls.Dialog, LayerDialog);
        this.clsLayers.set(LayerTypeCls.Notify, LayerNotify);
        this.clsLayers.set(LayerTypeCls.Node, LayerCustom);
    }

    /**
     * 注册自定义界面层对象
     * @param type  自定义界面层类型
     * @param cls   自定义界面层对象
     */
    registerLayerCls(type: string, cls: any) {
        if (this.clsLayers.has(type)) {
            error("已存在自定义界面层类型", type);
            return;
        }
        this.clsLayers.set(type, cls);
    }

    /**
     * 初始化界面层
     * @param root  界面根节点
     */
    private initLayer(root: Node, config: any) {
        if (config == null) {
            error("请升级到最新版本框架,界面层级管理修改为数据驱动。参考模板项目中的config.json配置文件");
            return;
        }

        this.root = root;
        this.initScreenAdapter();
        this.camera = this.root.getComponentInChildren(Camera)!;

        // 创建界面层
        for (let i = 0; i < config.length; i++) {
            let data = config[i];
            let layer: Node = null!;

            let cls = this.clsLayers.get(data.type);
            if (cls) {
                layer = new cls(data.name);
            }
            else {
                error("未识别的界面层类型", data.type);
                continue;
            }

            root.addChild(layer);
        }
    }

    /** 初始化屏幕适配 */
    private initScreenAdapter() {
        const drs = view.getDesignResolutionSize();
        const ws = screen.windowSize;
        this.windowAspectRatio = ws.width / ws.height;
        this.designAspectRatio = drs.width / drs.height;

        let finalW: number = 0;
        let finalH: number = 0;
        if (this.windowAspectRatio > this.designAspectRatio) {
            finalH = drs.height;
            finalW = finalH * ws.width / ws.height;
            log("适配屏幕高度", "【横屏】");
        }
        else {
            finalW = drs.width;
            finalH = finalW * ws.height / ws.width;
            log("适配屏幕宽度", "【竖屏】");
        }
        view.setDesignResolutionSize(finalW, finalH, ResolutionPolicy.UNKNOWN);

        if (this.mobileSafeArea) {
            this.root.addComponent(SafeArea);
            log("开启移动设备安全区域适配");
        }
    }
}