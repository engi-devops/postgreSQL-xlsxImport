import jwt from 'jsonwebtoken'
import config from '../../../config/config'

class JwtTokenGenerator {
    static createToken(id, email) {
        var secreteKey = config.JWTSecret;
        return "JWT " + jwt.sign({
            id: id,
            email: email,
        }, secreteKey, {
            expiresIn: config.JWTExpireTime
        });
    }
}
module.exports = JwtTokenGenerator;