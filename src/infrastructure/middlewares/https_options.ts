import fs from 'fs';
import path from 'path';
/**
 * Configuração HTTPS
 * 
 * @returns {{key: Buffer, cert: Buffer}}
 */
function getHttpsOptions(): { key: Buffer, cert: Buffer } {

    const key = path.join(__dirname, '../../../certificates', 'key.pem');
    const cert = path.join(__dirname, '../../../certificates', 'cert.pem');
    const httpsOptions = {
        key: fs.readFileSync(key),
        cert: fs.readFileSync(cert)
    }
    return httpsOptions;
}
const httpsOptions = getHttpsOptions();

export default httpsOptions;