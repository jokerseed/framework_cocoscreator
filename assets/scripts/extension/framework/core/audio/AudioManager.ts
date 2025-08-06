import { AudioClip, Component } from "cc";
import { AudioEffectPool } from "./AudioEffectPool";

export class AudioManager extends Component {
    /** 音效管理对象 */
    effect: AudioEffectPool = new AudioEffectPool();

    /** 本地加载音乐音效的音量、开关配置数据并设置到游戏中 */
    load() {

    }

    /**
     * 播放音效
     * @param url        资源地址
     * @param callback   加载完成回调
     * @param bundleName 资源包名
     */
    playEffect(url: string | AudioClip, bundleName?: string, onPlayComplete?: Function): Promise<number> {
        return this.effect.load(url, bundleName, onPlayComplete);
    }

    /** 回收音效播放器 */
    putEffect(aeid: number) {
        this.effect.put(aeid);
    }
}