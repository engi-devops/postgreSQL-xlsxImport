import Sequelize from 'sequelize';
import XLSX from 'xlsx'
const op = Sequelize.Op

module.exports = (sequelize, type) => {
    const XlsxImports = sequelize.define('xlsxImports', {
        id: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        age: type.INTEGER,
    }, {
        timestamps: true,
        tableName: 'xlsxImports'
    })

    XlsxImports.xlsxImports = async (data, success, error) => {
        try {
            // console.log('data :>> ', data);
            // console.log('__dirname :>> ', __dirname);
            // return
            var workbook = XLSX.readFile(__dirname + '/upload/' + data.xlsxImport);
            var xlsxSheetAllData = workbook.SheetNames;
            var data = [];

            xlsxSheetAllData.forEach(function (y) {
                var worksheet = workbook.Sheets[y];
                var headers = {};
                for (const z in worksheet) {
                    if (z[0] === '!') continue;
                    var tt = 0;
                    for (var i = 0; i < z.length; i++) {
                        if (!isNaN(z[i])) {
                            tt = i;
                            break;
                        }
                    };
                    var col = z.substring(0, tt);
                    var row = parseInt(z.substring(tt));
                    var value = worksheet[z].v;

                    if (row == 1 && value) {
                        headers[col] = value;
                        continue;
                    }
                    if (!data[row]) data[row] = {};
                    data[row][headers[col]] = value;
                }
                data.shift();
                data.shift();
            });
            // console.log('data :>> ', data);
            // return
            let result = [];
            
            for (let index = 0; index < data.length; index++) {
                
                let insert = {
                    name: data[index].name,
                    age: data[index].age,
                }
                
            await XlsxImports.create(insert).then(async excel => {
                    // console.log('excel :>> ', excel);
                    // console.log('excel.xlsxImports.dataValues.id :>> ', excel.xlsxImports.dataValues.id);
                    // const userdata = JSON.stringify(excel);
                    // console.log('userdata :>> ', userdata);
                    // console.log('excel.dataValues.id :>> ', excel.dataValues.id);
                    // return
                    let userdata = {
                        id: excel.dataValues.id,
                        name: excel.dataValues.name,
                        age: excel.dataValues.age,
                        createdAt: excel.dataValues.createdAt,
                        updatedAt: excel.dataValues.updatedAt
                    }
                    result.push(userdata);
                })

            }
            // console.log('result :>> ', result);
            // return
            success(Response.sendResponse(status_codes.CREATED, custom_message.infoMessage.saveAllxlsxDataInDatabase, result, []));
        } catch (err) {
            console.log("error:-", err)
            error(Response.sendResponse(status_codes.INTERNAL_SERVER_ERROR, custom_message.errorMessage.genericError, [], err));
        }
    }

    return XlsxImports;
}