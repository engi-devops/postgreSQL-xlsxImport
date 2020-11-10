import xlsxImportClass from '../class/xlsxImports';
import Sequelize from 'sequelize';
const op = Sequelize.Op


exports.xlsxImport = async (req, res) => {
    try {

        if (typeof req.files !== 'undefined' && req.files.length > 0) {
            req.body.xlsxImport = req.files;
        }
        // console.log('req.body :>> ', req.body);
        // return
        var xlsxImports = new xlsxImportClass(req.body);
        xlsxImports.xlsxFileImports((success_data) => {
            res.status(success_data.code).send(success_data);
        }, (error_data) => {
            res.status(error_data.code).send(error_data);
        });
    } catch (err) {
        console.log(" Error : ", err);
        res.status(status_codes.INTERNAL_SERVER_ERROR).send(Response.sendResponse(status_codes.INTERNAL_SERVER_ERROR, custom_message.errorMessage.genericError, [], err));
    }
}