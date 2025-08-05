import { NodePool } from "cc";
import { AudioEffect } from "./AudioEffect";

/** 音效池 */
export class AudioEffectPool {
    /** 音效播放器对象池 */
    private pool: NodePool = new NodePool();
    /** 对象池集合 */
    private effects: Map<string, AudioEffect> = new Map();
    /** 用过的音效资源记录 */
    private res: Map<string, string[]> = new Map();

    private _aeId: number = 0;
    /** 获取请求唯一编号 */
    private getAeId() {
        this._aeId++;
        return this._aeId;
    }
}