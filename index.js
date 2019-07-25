var fs = require('fs');
var argv = require('yargs').argv;
fileNameStoragePath = 'filenames.json';
var fileNames = [];
var readFileNames = function () {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileNameStoragePath, function (err, data) {
            var data = JSON.parse(data);
            if (err) {
                reject(err);
                return;
            }
            fileNames = data;
            resolve(fileNames);
        });
    });
}

readFileNames()
    .then(function (fileNames) {
        return new Promise(function (resolve, reject) {
            if (fileNames.indexOf(argv.filename) === -1) {
                fs.writeFile(argv.filename, 'You are awesome', function (err) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    fileNames.push(argv.filename);
                    resolve(fileNames);
                    console.log('done');
                });
            } else {
                reject('Please enter a new File Name');
            }
        })
    })
    .then(function (fileNames) {
        fs.writeFile(fileNameStoragePath, JSON.stringify(fileNames), function (err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('done');
        })
    }).catch(function (err) {
        console.log(err);
    });