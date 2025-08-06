import { AudioSource, _decorator } from 'cc';
const { ccclass } = _decorator;

/** 游戏音效 */
@ccclass('AudioEffect')
export class AudioEffect extends AudioSource {
    /** 背景音乐播放完成回调 */
    onComplete: Function | null = null;

    /**唯一id */
    private _aid: number = 0;
    set aid(value: number) {
        this._aid = value;
    }
    get aid(): number {
        return this._aid;
    }

    protected start(): void {
        this.node.on(AudioSource.EventType.ENDED, this.onAudioEnded, this);
    }

    private onAudioEnded() {
        this.onComplete && this.onComplete();
    }
}