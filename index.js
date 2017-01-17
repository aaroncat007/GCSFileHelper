var GCEfiles = require('./lib/index.js');
var helper = new GCEfiles();

//Get params
var args = process.argv.slice(2);

if(args.length < 4){
    console.log('args length error');
    process.exit(-1);
}

var projectId = args[0];
var keyFilePath = args[1];
var backetName = args[2];
var targetFile = args[3];

helper.DownloadFiles(projectId,
                    keyFilePath,
                    backetName,
                    targetFile,
                    function(){});