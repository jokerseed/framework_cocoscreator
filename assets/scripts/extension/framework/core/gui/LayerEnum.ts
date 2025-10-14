/** 界面层组件类型 */
export enum LayerTypeCls {
    /** 主界面层 */
    UI = "UI",
    /** 弹窗层 */
    PopUp = "PopUp",
    /** 模式窗口层 */
    Dialog = "Dialog",
    /** 消息提示层 */
    Notify = "Notify",
    /** 自定义节点层 */
    Node = "Node"
}

/** 界面层类型 */
export enum LayerType {
    /** 二维游戏层 */
    Game = "LayerGame",
    /** 主界面层 */
    UI = "LayerUI",
    /** 弹窗层 不中断进程的弹窗*/
    PopUp = "LayerPopUp",
    /** 模式窗口层 会中断进程等待用户操作*/
    Dialog = "LayerDialog",
    /** 系统触发模式窗口层 */
    System = "LayerSystem",
    /** 消息提示层 */
    Notify = "LayerNotify",
    /** 新手引导层 */
    Guide = "LayerGuide"
}
