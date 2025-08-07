import { Component, game } from "cc";
import { Timer } from "./Timer";

export class TimerManager extends Component {
    /** 服务器时间 */
    private date_s: Date = new Date();
    /** 服务器初始时间 */
    private date_s_start: Date = new Date();
    /** 服务器时间后修正时间 */
    private polymeric_s: number = 0;
    /** 客户端时间 */
    private date_c: Date = new Date();

    private times: Timer[] = [];

    protected update(dt: number): void {

    }

    /**
    * 服务器时间与本地时间同步
    * @param value   服务器时间刻度
    */
    setServerTime(value: number): void {
        this.polymeric_s = this.getTime();
        this.date_s_start.setTime(value);
    }

    /** 获取写服务器同步的时间刻度 */
    getServerTime(): number {
        return this.date_s_start.getTime() + this.getTime() - this.polymeric_s;
    }

    /** 获取服务器时间对象 */
    getServerDate(): Date {
        this.date_s.setTime(this.getServerTime());
        return this.date_s;
    }

    /** 获取本地时间对象 */
    getClientDate(): Date {
        this.date_c.setTime(this.getClientTime());
        return this.date_c;
    }

    /** 获取游戏开始到现在逝去的时间 */
    getTime(): number {
        return game.totalTime;
    }

    /** 获取本地时间刻度 */
    getClientTime(): number {
        return Date.now();
    }
}