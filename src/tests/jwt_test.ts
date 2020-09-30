import { Auth } from "../infrastructure/security/auth";

const auth = new Auth();
const token = auth.encodeJwt({ 'id': 123456 }, '60h');
console.log(token);

// const validation = auth.verifyJwt(token);
// console.log('Body Token: ');
// console.log(validation);
// const decoded = auth.decodeJwt(token);
// console.log('Token Jwt: ');
// console.log(decoded);
export default token;