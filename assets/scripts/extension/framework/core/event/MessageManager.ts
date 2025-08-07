import { log, warn } from "cc";
import { Framework } from "../../Framework";

type EventData = {
    event: string;
    listener: ListenerFunc;
    object: any;
};

/**
 * 全局事件监听方法
 * @param event      事件名
 * @param args       事件参数
 */
export type ListenerFunc = (event: string, ...args: any) => void;

export class MessageManager {
    private events: Map<string, Array<EventData>> = new Map();

    /**
     * 注册全局事件
     * @param event      事件名
     * @param listener   处理事件的侦听器函数
     * @param object     侦听函数绑定的作用域对象
     */
    on(event: string, listener: ListenerFunc, object: object) {
        if (!event || !listener) {
            warn(`注册【${event}】事件的侦听器函数为空`);
            return;
        }

        let eds = this.events.get(event);
        if (eds == null) {
            eds = [];
            this.events.set(event, eds);
        }

        let length = eds.length;
        for (let i = 0; i < length; i++) {
            let bin = eds[i];
            if (bin.listener == listener && bin.object == object) {
                warn(`名为【${event}】的事件重复注册侦听器`);
            }
        }

        let data: EventData = { event: event, listener: listener, object: object };
        eds.push(data);
    }

    /**
     * 监听一次事件，事件响应后，该监听自动移除
     * @param event     事件名
     * @param listener  事件触发回调方法
     * @param object    侦听函数绑定的作用域对象
     */
    once(event: string, listener: ListenerFunc, object: object) {
        let _listener: any = ($event: string, ...$args: any) => {
            this.off(event, _listener, object);
            _listener = null;
            listener.call(object, $event, $args);
        }
        this.on(event, _listener, object);
    }

    /**
     * 移除全局事件
     * @param event     事件名
     * @param listener  处理事件的侦听器函数
     * @param object    侦听函数绑定的作用域对象
     */
    off(event: string, listener: Function, object: object) {
        let eds = this.events.get(event);

        if (!eds) {
            log(`名为【${event}】的事件不存在`);
            return;
        }

        let length = eds.length;
        for (let i = 0; i < length; i++) {
            let bin: EventData = eds[i];
            if (bin.listener == listener && bin.object == object) {
                eds.splice(i, 1);
                break;
            }
        }

        if (eds.length == 0) {
            this.events.delete(event);
        }
    }

    /** 
     * 触发全局事件 
     * @param event      事件名
     * @param args       事件参数
     */
    dispatchEvent(event: string, ...args: any) {
        let list = this.events.get(event);

        if (list != null) {
            let eds: Array<EventData> = list.concat();
            let length = eds.length;
            for (let i = 0; i < length; i++) {
                let eventBin = eds[i];
                eventBin.listener.call(eventBin.object, event, ...args);
            }
        }
    }
}