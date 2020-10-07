import crypto from 'crypto';

export class CryptoUtil {

    /**
     * 
     * @param size size
     * @param encoding BufferEncoding default = hex
     */
    public static randomString(size: number = 20, encoding: BufferEncoding = 'hex') {
        crypto.randomBytes(size).toString(encoding);
    }
}