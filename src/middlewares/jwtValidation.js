import {
    Users
} from '../sequelize'
import config from '../config/config';
import JWT from 'jsonwebtoken'
import Message from '../config/message'

exports.jwtValidation = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).send({
            code: 401,
            message: Message.errorMessage.tokenNotFoundOrExpire,
            data: [],
            err: []
        });
    } else {
        const exe = req.headers.authorization.split(' ');
        // console.log('exe :>> ', exe);
        JWT.verify(exe[1], config.JWTSecret, (err, result) => {
            if (err) {
                // console.log('err :>> ', err);
                res.status(401).send({
                    code: 401,
                    message: Message.errorMessage.tokenNotFoundOrExpire,
                    data: [],
                    err: []
                });
            } else {
                // console.log('result :>> ', result);
                // return
                    Users.getUsersDetails(result,
                        async (success_dat) => {
                        // console.log('success_dat :>> ', success_dat);
                        // return
                        if (success_dat.data.userId) {
                            // console.log('succ');
                            req.body.userId = success_dat.data.userId
                            next();
                        } else {
                            // console.log('not');
                            res.status(404).send({
                                code: 404,
                                message: Message.errorMessage.tokenNotFoundOrExpire,
                                data: [],
                                err: []
                            });
                        }
                    },
                )
            }
        })
        
    }
}