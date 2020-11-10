import {
    Users
} from '../../sequelize';


class users {
    constructor(data) {
        //Attributes
        this.email = data.email != undefined ? data.email : null;
        this.password = data.password != undefined ? data.password : null;
        this.image = data.image != undefined ? data.image : null;
        this.userId = data.userId != undefined ? data.userId : null;

        this.key_array = ["email", "password", "image","userId"];

    }

    insertData(key_array) {
        var data = {};
        for (let i = 0; i < key_array.length; i++) {
            if (this[key_array[i]] == null) {
                delete key_array[i];
            } else {
                data[key_array[i]] = this[key_array[i]];
            }
        }
        return data;
    };

    signup(success, error) {
        try {
            var instance = this;
            instance.image = instance.image[0].filename
            // console.log('instance :>> ', instance);
            // return
            Users.signup(instance.insertData(instance.key_array), async (success_data) => {
                success(success_data);
            }, (error_data) => {
                error(error_data);
            });
        } catch (err) {
            error(Response.sendResponse(status_codes.INTERNAL_SERVER_ERROR, custom_message.errorMessage.genericError, [], err));
        }
    };

    login(success, error) {
        try {
            var instance = this;
            // return
            Users.login(instance.insertData(instance.key_array), async (success_data) => {
                success(success_data);
            }, (error_data) => {
                error(error_data);
            });
        } catch (err) {
            error(Response.sendResponse(status_codes.INTERNAL_SERVER_ERROR, custom_message.errorMessage.genericError, [], err));
        }
    };

    userUpdate(success, error) {
        try {
            var instance = this;
            instance.image = instance.image[0].filename
            // return
            Users.userUpdate(instance.insertData(instance.key_array), async (success_data) => {
                success(success_data);
            }, (error_data) => {
                error(error_data);
            });
        } catch (err) {
            error(Response.sendResponse(status_codes.INTERNAL_SERVER_ERROR, custom_message.errorMessage.genericError, [], err));
        }
    };
    
}

module.exports = users;