import {
    XlsxImports
} from '../../sequelize';

class xlsxImports {
    constructor(data) {
        //Attributes
        this.name = data.name != undefined ? data.name : null;
        this.age = data.age != undefined ? data.age : null;
        this.xlsxImport = data.xlsxImport != undefined ? data.xlsxImport : null;

        this.key_array = ["name", "age","xlsxImport"];
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


    async xlsxFileImports(success, error) {
        try {
            var instance = this
            instance.xlsxImport = instance.xlsxImport[0].filename
            // console.log('instance :>> ', instance);

            await XlsxImports.xlsxImports(instance.insertData(instance.key_array),
                async (success_data) => {
                        success(success_data)
                    },
                    (error_data) => {
                        error(error_data)
                    },
            )
        } catch (err) {
            error(
                Response.sendResponse(
                    status_codes.INTERNAL_SERVER_ERROR,
                    custom_message.errorMessage.genericError,
                    [],
                    err,
                ),
            )
        }
    }
}

module.exports = xlsxImports;