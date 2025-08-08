import { __private, Node, Widget } from "cc";

export class LayerUI extends Node {
    /**
    * UI基础层，允许添加多个预制件节点
    * @param name 该层名
    */
    constructor(name: string) {
        super(name);
        const widget: Widget = this.addComponent(Widget);
        widget.isAlignLeft = widget.isAlignRight = widget.isAlignTop = widget.isAlignBottom = true;
        widget.left = widget.right = widget.top = widget.bottom = 0;
        widget.alignMode = Widget.AlignMode.ON_WINDOW_RESIZE;
        widget.enabled = true;
    }
}