import bcrypt from 'bcrypt';

export class BcryptUtil {

    constructor() { }


    /**
     * Criptografa uma senha
     * 
     * @param password palavra chave
     */
    public static hash(password: string): string {

        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }

    /**
     * Verifica se o password informado pertence ao hash
     * @param data Password (clean)
     * @param encrypted Hash
     */
    public static compare(data: string, encrypted: string): boolean {
        return bcrypt.compareSync(data, encrypted);
    }
}