import { assetManager } from "cc";

export class ResLoader {
    /** 全局默认加载的资源包名 */
    defaultBundleName: string = "resources";

    /** 下载时的最大并发数 - 项目设置 -> 项目数据 -> 资源下载并发数，设置默认值；初始值为15 */
    get maxConcurrency() {
        return assetManager.downloader.maxConcurrency;
    }
    set maxConcurrency(value) {
        assetManager.downloader.maxConcurrency = value;
    }

    /** 下载时每帧可以启动的最大请求数 - 默认值为15 */
    get maxRequestsPerFrame() {
        return assetManager.downloader.maxRequestsPerFrame;
    }
    set maxRequestsPerFrame(value) {
        assetManager.downloader.maxRequestsPerFrame = value;
    }

    /** 失败重试次数 - 默认值为0 */
    get maxRetryCount() {
        return assetManager.downloader.maxRetryCount;
    }
    set maxRetryCount(value) {
        assetManager.downloader.maxRetryCount = value;
    }

    /** 重试的间隔时间，单位为毫秒 - 默认值为2000毫秒 */
    get retryInterval() {
        return assetManager.downloader.retryInterval;
    }
    set retryInterval(value) {
        assetManager.downloader.retryInterval = value;
    }
}