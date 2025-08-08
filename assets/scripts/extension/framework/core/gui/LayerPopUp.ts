import { BlockInputEvents, Layers, Node } from "cc";
import { LayerUI } from "./LayerUI";

/* 弹窗层，允许同时弹出多个窗口 */
export class LayerPopUp extends LayerUI {
    /** 触摸事件阻挡 */
    protected black!: BlockInputEvents;
    /** 半透明遮罩资源 */
    protected mask!: Node;

    constructor(name: string) {
        super(name);

        this.layer = Layers.Enum.UI_2D;
        this.on(Node.EventType.CHILD_ADDED, this.onChildAdded, this);
        this.on(Node.EventType.CHILD_REMOVED, this.onChildRemoved, this);
    }

    private onChildAdded(child: Node) {
        if (this.mask) {
            this.mask.setSiblingIndex(this.children.length - 2);
        }
    }

    private onChildRemoved(child: Node) {
        if (this.mask) {
            this.mask.setSiblingIndex(this.children.length - 2);
        }
    }
}