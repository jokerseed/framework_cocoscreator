import { _decorator, AudioClip, AudioSource } from "cc";
import { Framework } from "../../Framework";

const { ccclass } = _decorator;

@ccclass('AudioMusic')
export class AudioMusic extends AudioSource {
    /** 背景音乐开关 */
    switch: boolean = true;
    /** 背景音乐播放完成回调 */
    onComplete: Function | null = null;

    private _progress: number = 0;
    private _isLoading: boolean = false;
    private _nextBundleName: string = null!;   // 下一个音乐资源包
    private _nextUrl: string = null!;          // 下一个播放音乐

    protected start(): void {
        this.node.on(AudioSource.EventType.ENDED, this.onAudioEnded, this);
    }

    private onAudioEnded() {
        this.onComplete && this.onComplete();
    }

    /** 获取音乐播放进度 */
    get progress(): number {
        if (this.duration > 0)
            this._progress = this.currentTime / this.duration;
        return this._progress;
    }

    /**
     * 设置音乐当前播放进度
     * @param value     进度百分比0到1之间
     */
    set progress(value: number) {
        this._progress = value;
        this.currentTime = value * this.duration;
    }

    async load(url: string, callback?: Function, bundleName: string = Framework.res.defaultBundleName) {
        // 下一个加载的背景音乐资源
        if (this._isLoading) {
            this._nextBundleName = bundleName;
            this._nextUrl = url;
            return;
        }

        this._isLoading = true;
        var data: AudioClip = await Framework.res.loadAsync(bundleName, url, AudioClip);
        if (data) {
            this._isLoading = false;

            // 处理等待加载的背景音乐
            if (this._nextUrl != null) {
                // 加载等待播放的背景音乐
                this.load(this._nextUrl, callback, this._nextBundleName);
                this._nextBundleName = this._nextUrl = null!;
            }
            else {
                callback && callback();

                // 正在播放的时候先关闭
                if (this.playing) {
                    this.stop();
                }

                // 删除当前正在播放的音乐
                this.release();

                // 播放背景音乐
                this.clip = data;
                this.play();
            }
        }
    }

    /** 释放当前背景音乐资源 */
    release() {
        if (this.clip) {
            this.stop();
            this.clip.decRef();
            this.clip = null;
        }
    }
}