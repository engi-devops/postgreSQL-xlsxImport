import multer from 'multer';
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        let path = ''
        if (file.fieldname == 'image') {
            path = "./src/app/models/upload"
        }if (file.fieldname == 'xlsxImport') {
            path = "./src/app/models/upload"
        }
        callback(null, path);
    },
    filename: (req, file, callback) => {
        const exe = file.originalname.split('.');
        // console.log('exe :>> ', exe);
        // return
        const name = path.basename(file.originalname, "." + exe[exe.length - 1]);
        let imageName = Date.now() + '-' + name + '.' + exe[exe.length - 1];
        callback(null, imageName);
    }
});
           
module.exports.userUploads = multer({
    storage:storage
}).array('image');

module.exports.xlsxImportUploads = multer({
    storage:storage
}).array('xlsxImport');