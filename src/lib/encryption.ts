import "server-only";
import crypto from 'crypto';

const ALG = 'aes-256-cbc';

export const symmetricEncrypt = (data: string) => {
    const key = process.env.ENCRYPTION_KEY;
    if(!key) {
        throw new Error("Encryption key not set");
    }

    // encryption stage
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALG, Buffer.from(key, 'hex'), iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

export const symetricDecrypt = (encryptedData: string) => {
    const key = process.env.ENCRYPTION_KEY;
    if(!key) {
        throw new Error("Encryption key not set");
    }

    const parts = encryptedData.split(':');
    const iv = Buffer.from(parts.shift() as string, 'hex');
    const encryptedText = Buffer.from(parts.join(":"), "hex");
    
    const decipher = crypto.createDecipheriv(ALG, Buffer.from(key, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}


