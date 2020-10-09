import { InternalErrorException } from "@exceptions/internalError_exception";
import { NotFoundException } from "@exceptions/notFound_exception";
import { UnauthorizedException } from "@exceptions/unauthorized_exception";
import UserModel, { IUser } from "@models/user_model";
import { BaseRepository } from "domain/repositories/core/base_repository";
import { BcryptUtil } from "utils/bcrypt_util";

export class UserRepository extends BaseRepository<IUser>{

    constructor() {
        super(UserModel);
        //enable eager load
        this.populateArray.push('tasks');
    }

    public async authenticate(item: IUser): Promise<IUser> {

        //desestruturação
        const { email, password } = item;

        try {
            let user = await this.model.findOne({ email })
                                       .select('+password');
            if (user != null) {
                if (user.password == password) {
                    //cancel password
                    user.password = undefined;
                    return user;
                }
                const compare = BcryptUtil.compare(password as string, user.password as string);
                if (compare) {
                    //cancel password
                    user.password = undefined;
                    return user;
                } else {
                    throw new UnauthorizedException('Senha incorreta');
                }
            } else {
                throw new NotFoundException('Email não encontrado');
            }

        } catch (error) {
            throw new InternalErrorException(error);
        }
    }
}