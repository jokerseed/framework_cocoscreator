import { Framework } from "../../Framework";
import { IStorageSecurity } from "./StorageManager";

export class StorageSecuritySimple implements IStorageSecurity {
    private secretkey: string = null!;

    constructor() {
        const key = Framework.config.game.localDataKey;
        const iv = Framework.config.game.localDataIv;
        this.secretkey = key + iv;
    }

    encrypt(str: string): string {
        let er = '';
        for (let i = 0; i < str.length; i++) {
            er += String.fromCharCode(str.charCodeAt(i) ^ this.secretkey.charCodeAt(i % this.secretkey.length));
        }
        return er;
    }

    decrypt(str: string): string {
        let dr = '';
        for (let i = 0; i < str.length; i++) {
            dr += String.fromCharCode(str.charCodeAt(i) ^ this.secretkey.charCodeAt(i % this.secretkey.length));
        }
        return dr;
    }

    encryptKey(str: string): string {
        return this.encrypt(str);
    }

}