import { __private, Layers, Node, Widget } from "cc";

export class LayerCustom extends Node {
    /**
    * UI基础层，允许添加多个预制件节点
    * @param name 该层名
    */
    constructor(name: string) {
        super(name);
        this.layer = Layers.Enum.UI_2D;
        const w: Widget = this.addComponent(Widget);
        w.isAlignLeft = w.isAlignRight = w.isAlignTop = w.isAlignBottom = true;
        w.left = w.right = w.top = w.bottom = 0;
        w.alignMode = Widget.AlignMode.ON_WINDOW_RESIZE;
        w.enabled = true;
    }
}