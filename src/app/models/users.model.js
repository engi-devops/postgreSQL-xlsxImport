import Sequelize from 'sequelize';
import CryptoJS from "crypto-js";
import JwtTokenGenerator from '../class/Util/JwtTokenGenerator'

const op = Sequelize.Op

module.exports = (sequelize, type) => {
    const Users = sequelize.define('users', {
        id: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        email: type.STRING,
        password: type.STRING,
        image : type.STRING
    }, {
        timestamps: true,
        tableName: 'users'
    })

    Users.signup = async (data, success, error) => {
        try {

            Users.findOne({
                    where: {
                        email: data.email
                    }
                })
                .then(user => {
                    if (user) {
                        return error(Response.sendResponse(status_codes.ALREADY_EXIST, custom_message.errorMessage.userAlreadyExists, [], []))
                    }

                    if (data.password) {
                        // data.password = CryptoJS.SHA512(data.password).toString().toUpperCase();
                        data.password = CryptoJS.AES.encrypt(data.password, 'singh123').toString();

                    }

                Users.create(data)
                    .then(async (user) => {
                            success(Response.sendResponse(status_codes.CREATED, custom_message.infoMessage.saveUser, user, []));
                        })
                        .catch(err => {
                            console.log("error:-", err)
                            error(Response.sendResponse(status_codes.BAD_REQUEST, custom_message.errorMessage.genericError, [], err))
                        })

                }).catch(err => {
                    console.log("error:-", err)
                    error(Response.sendResponse(status_codes.BAD_REQUEST, custom_message.errorMessage.genericError, [], err))
                })
        } catch (err) {
            console.log("error:-", err)
            error(Response.sendResponse(status_codes.INTERNAL_SERVER_ERROR, custom_message.errorMessage.genericError, [], err));
        }
    }

    Users.login = async (data, success, error) => {
        try {
            var pass = data.password
            // return
            Users.findOne({
                    where: {
                        email: data.email
            }}).then(async user => {
                if (user) {
                    // console.log('object :>> ', pass);
                    // console.log('user.dataValues.password :>> ', user.dataValues.password);
                    // return
                    var dataBasePass  = CryptoJS.AES.decrypt(user.dataValues.password, 'singh123');
                    var originalpass = dataBasePass.toString(CryptoJS.enc.Utf8);
                    // console.log('originalpass :>> ', originalpass);
                    // return
                    if (originalpass != pass) {
                       return error(Response.sendResponse(status_codes.NOTFOUND, custom_message.errorMessage.userNotFound, [], []))
                    } 
                        
                        let data = {};
                        data.access_token = await JwtTokenGenerator.createToken(user.id, user.email);
                        
                    data.user = {
                        id : user.id,
                        email: user.email,
                        image: __dirname + '/upload/' + user.image,
                        createdAt: user.createdAt,
                        updatedAt : user.updatedAt
                    };
                    success(Response.sendResponse(status_codes.OK, custom_message.infoMessage.login, data, []));

                    } else {
                        error(Response.sendResponse(status_codes.UNAUTHORISED, custom_message.errorMessage.dataNotFound, [], []))
                    }
                })
                .catch(err => {
                    console.log("error:---", err)
                    error(Response.sendResponse(status_codes.BAD_REQUEST, custom_message.errorMessage.genericError, [], err))
                })
            
        } catch (err) {
            console.log("error:-", err)
            error(Response.sendResponse(status_codes.INTERNAL_SERVER_ERROR, custom_message.errorMessage.genericError, [], err));
        }
    }

    Users.getUsersDetails = async (auth, success, error) => {
        try {
            // console.log('auth :>> ', auth);
            // return
            Users.findOne({
                    where: {
                        email: auth.email,
                    }
                })
                .then(user => {
                    if (user && user != null) {
                        let responce = {
                            userId: user.id
                        }
                        success(Response.sendResponse(status_codes.OK, custom_message.infoMessage.getDetails, responce, []));
                    } else {
                        success(Response.sendResponse(status_codes.NOTFOUND, custom_message.errorMessage.dataNotFound, [], []));
                    }
                })
                .catch(err => {
                    console.log("err:----", err)
                    error(Response.sendResponse(status_codes.BAD_REQUEST, custom_message.errorMessage.genericError, [], err))
                })
        } catch (err) {
            error(Response.sendResponse(status_codes.INTERNAL_SERVER_ERROR, custom_message.errorMessage.genericError, [], err));
        }
    }


    Users.userUpdate = async (data, success, error) => {
        try {
            // console.log('data :>> ', data);
            // return0
            Users.findOne({
                    where: {
                        id: data.userId,
                    },
                    returning: true
                })
                .then(user => {
                    // console.log('user :>> ', user);
                    // return
                    Users.update(data, {
                            where: {
                                id: user.dataValues.id
                            },
                            returning: true
                        })
                        .then((updatedUser) => {
                            // console.log('updatedUser :>> ', updatedUser);
                            let responce = {
                                id: updatedUser[1][0].id,
                                email: updatedUser[1][0].email,
                                image: __dirname + '/upload/' + data.image,
                                createdAt:updatedUser[1][0].createdAt,
                                updatedAt: updatedUser[1][0].updatedAt,
                            }
                            success(Response.sendResponse(status_codes.OK, custom_message.infoMessage.updatedUser, responce, []));
                        })
                        .catch(err => {
                            console.log("err:----------------------", err)
                            error(Response.sendResponse(status_codes.BAD_REQUEST, custom_message.errorMessage.genericError, [], err))
                        })
                })
                .catch(err => {
                    console.log("err:----", err)
                    error(Response.sendResponse(status_codes.BAD_REQUEST, custom_message.errorMessage.genericError, [], err))
                })
        } catch (err) {
            error(Response.sendResponse(status_codes.INTERNAL_SERVER_ERROR, custom_message.errorMessage.genericError, [], err));
        }
    }
    
    return Users;
}