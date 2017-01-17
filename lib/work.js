//Define 
var _destPath = 'files/';

var fs = require('fs');
var googleStorage = require('@google-cloud/storage');


/**
 * DOwnload File on Google Cloud Storage
 * @param   {String}    projectId       Google Cloud Storage projectId
 * @param   {String}    keyFilePath     Json Key Path
 * @param   {String}    backetName      Backet Name
 * @param   {String}    targetFile      Target File Path
 * @param   {Function}  callback        Callback Function
 */
module.exports = function (projectId, keyFilePath, backetName, targetFile, callback) {

    var gcs = new googleStorage({
        projectId: projectId,
        keyFilename: keyFilePath
    });

    console.log('Target:' + targetFile);

    //mkdir
    fs.existsSync(_destPath) || fs.mkdirSync(_destPath);

    var myBucket = gcs.bucket(backetName);
    var files = myBucket.getFiles({
        prefix: targetFile
    }, function (err, files) {
        if (!err) {
            var lastRecord;
            files.forEach(function (file) {
                lastRecord = file;
            }, this);

            //show msg
            if (typeof(lastRecord) == 'undefined') {
                console.log('Cannot Found File...');
                return;
            }

            console.log('Found file=' + lastRecord.name);
            var fileName = lastRecord.name.split("/").pop();

            //download file
            lastRecord.download({
                destination: _destPath + fileName
            }, function (err) {
                if (!err) {
                    console.log('Download Success.');
                    callback(fileName);
                }
            });
        }
    });
}