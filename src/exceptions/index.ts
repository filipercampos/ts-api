import { ForbiddenException } from './forbidden_exception';
import { BadRequestException } from './badRequest_exception';
import { UnauthorizedException } from './unauthorized_exception';
import { UnprocessableEntityException } from './unprocessableEntity_exception';
import { MultipleChoicesException } from './multipleChoices_exception';
import { NotContenException } from './notContent_exception';
import { NotFoundException } from './notFound_exception';
import { InternalErrorException } from './internalError_exception';
import { ConflitctException } from './conflict_exception';
import { HttpStatusException } from './httpStatus_exception';

export default {
    ForbiddenException,
    BadRequestException,
    UnauthorizedException,
    UnprocessableEntityException,
    MultipleChoicesException,
    NotContenException,
    NotFoundException,
    InternalErrorException,
    ConflitctException,
    HttpStatusException
}