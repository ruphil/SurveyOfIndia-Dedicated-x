import http from 'http';
import express from 'express';
import multer from 'multer';
import { existsSync } from 'fs';
import { resolve } from 'path';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { rename, unlink } from 'fs';

import { checkUserForValidityNJurisdiction, checkUserForValidityNJurisdictionNAttachment } from './authenticator';
import { addFileRowToDB } from './dbhandlerfiles';

const tempFolder = 'D:/KGDCTEMP/';
const storageFolder = 'D:/KGDCVILLAGES/';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempFolder)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    // limits: { fileSize: 1000000 },
});

const app = express();
app.use(cors());

const server = new http.Server(app);

const uploadAuthentication = (req: any, res: any, next: any) => {
    let searchParams = new URLSearchParams(req._parsedUrl.search);
    // console.log(searchParams);

    checkUserForValidityNJurisdiction(searchParams)
    .then(() => {
        next();
    })
    .catch(() => {
        res.send('Unauthorized Access');
    })
}

const downloadAuthentication = (req: any, res: any, next: any) => {
    let searchParams = new URLSearchParams(req._parsedUrl.search);
    // console.log(searchParams);

    checkUserForValidityNJurisdictionNAttachment(searchParams)
    .then(() => {
        next();
    })
    .catch(() => {
        res.send('Unauthorized Access');
    })
}

app.use('/files', [ downloadAuthentication, express.static(storageFolder) ]);
app.post('/fileupload', [ uploadAuthentication, upload.single('uploadedfile') ], function(req: any, res: any){
    let file = req.file!;
    // console.log(file);
    // console.log(req.body);

    let tempfilepath = resolve(tempFolder, file.originalname);
    // console.log(tempfilepath);

    if(existsSync(tempfilepath)){
        let formData = req.body;
        const { 
            currentdistrict, currenttaluk, currentgp, 
            currentvillage, currentabadiname,
            fileType, description 
        } = formData;

        let modabadi = 'abadi_' + currentabadiname;

        const newFileName = currentdistrict + '_' + currenttaluk + '_' + currentgp + '_'+ currentvillage + '_' + modabadi + '_' + description + '_' + uuidv4();
        const diskidentifier = newFileName.replace(/\W/g, '');
        const storagefilepath = resolve(storageFolder, diskidentifier) + '.' + fileType;

        rename(tempfilepath, storagefilepath, function (err) {
            if(!err){
                // console.log('File Saved Successfully');

                addFileRowToDB(formData, diskidentifier)
                .then(() => {
                    res.send('success');
                })
                .catch(() => {
                    unlink(storagefilepath, ()=>{});
                    res.send('failure');
                })
            } else {
                res.send('failure');
                unlink(tempfilepath, ()=>{});
            }
        });

    } else {
        res.send('failure');
    }
});

app.get('/', function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('File Server Running Fine!');
    res.end();
});

const port = 4010;
server.listen(port, () => {
    console.log(`File Server listening On Port: ${port}`);
});