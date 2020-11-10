import usersClass from '../class/users';
import Sequelize from 'sequelize';
const op = Sequelize.Op


exports.signup = async (req, res) => {
    try {

        if (typeof req.files !== 'undefined' && req.files.length > 0) {
            req.body.image = req.files;
        }
        // console.log('req.body :>> ', req.body);
        // return
        var users = new usersClass(req.body);
        users.signup((success_data) => {
            res.status(success_data.code).send(success_data);
        }, (error_data) => {
            res.status(error_data.code).send(error_data);
        });
    } catch (err) {
        console.log(" Error : ", err);
        res.status(status_codes.INTERNAL_SERVER_ERROR).send(Response.sendResponse(status_codes.INTERNAL_SERVER_ERROR, custom_message.errorMessage.genericError, [], err));
    }
}

exports.login = async (req, res) => {
    try {
        var users = new usersClass(req.body);
        users.login((success_data) => {
            res.status(success_data.code).send(success_data);
        }, (error_data) => {
            res.status(error_data.code).send(error_data);
        });
    } catch (err) {
        console.log(" Error : ", err);
        res.status(status_codes.INTERNAL_SERVER_ERROR).send(Response.sendResponse(status_codes.INTERNAL_SERVER_ERROR, custom_message.errorMessage.genericError, [], err));
    }
}

exports.userUpdate = async (req, res) => {
    try {

        if (typeof req.files !== 'undefined' && req.files.length > 0) {
            req.body.image = req.files;
        }
        // console.log('req.body :>> ', req.body);
        // return
        var users = new usersClass(req.body);
        users.userUpdate((success_data) => {
            res.status(success_data.code).send(success_data);
        }, (error_data) => {
            res.status(error_data.code).send(error_data);
        });
    } catch (err) {
        console.log(" Error : ", err);
        res.status(status_codes.INTERNAL_SERVER_ERROR).send(Response.sendResponse(status_codes.INTERNAL_SERVER_ERROR, custom_message.errorMessage.genericError, [], err));
    }
}
