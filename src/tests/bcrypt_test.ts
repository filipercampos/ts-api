import { BcryptUtil } from "utils/bcrypt_util";

const pw = '123456';
const md5_test = BcryptUtil.hash(pw);
const compare_test = BcryptUtil.compare(pw, md5_test);
console.log(compare_test);
console.log(md5_test);