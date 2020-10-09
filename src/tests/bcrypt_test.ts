import { BcryptUtil } from "utils/bcrypt_util";

const pw = '123456';
const md5_test = BcryptUtil.hash(pw);
const compare_test = BcryptUtil.compare(pw, md5_test);

export default md5_test;