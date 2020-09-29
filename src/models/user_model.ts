import { BuilderModel } from '../helpers/builder_model';
import { IModel } from '../core/imodel';

export interface IUser extends IModel {
    firstName: string,
    lastName: string,
    email: string,
    company: string
    phone: Number,
    created_date: Date,
}

const definitionSchema = {
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    email: {
        type: String
    },
    company: {
        type: String
    },
    phone: {
        type: Number
    },
    created_date: {
        type: Date,
        default: Date.now
    }
};

const model = BuilderModel.getInstance().builder<IUser>('Usuario', definitionSchema);

// Export the model and return your IUser interface
export default model;
