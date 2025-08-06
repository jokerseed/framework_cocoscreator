import { _decorator, AudioSource } from "cc";

const { ccclass } = _decorator;

@ccclass('AudioMusic')
export class AudioMusic extends AudioSource {
    /** 背景音乐开关 */
    switch: boolean = true;
    /** 背景音乐播放完成回调 */
    onComplete: Function | null = null;
}