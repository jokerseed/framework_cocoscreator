import { sys } from "cc";

/**
 * 获取和处理浏览器地址透传参数
 */
export class ConfigWebUrl {
    private _data: any = null;
    /** 浏览器地址栏原始参数 */
    get data(): any {
        return this._data;
    }

    constructor() {
        if (!sys.isBrowser) {
            this._data = {};
            return;
        }

        this._data = this.parseUrl();
    }

    private parseUrl() {
        if (typeof window !== "object") return {};
        if (!window.document) return {};
        let url = window.document.location.href.toString();
        let u = url.split("?");
        if (typeof (u[1]) == "string") {
            u = u[1].split("&");
            let get: any = {};
            for (let i = 0, l = u.length; i < l; ++i) {
                let j = u[i];
                let x = j.indexOf("=");
                if (x < 0) {
                    continue;
                }
                let key = j.substring(0, x);
                let value = j.substring(x + 1);
                get[decodeURIComponent(key)] = value && decodeURIComponent(value);
            }
            return get;
        }
        else {
            return {};
        }
    }
}